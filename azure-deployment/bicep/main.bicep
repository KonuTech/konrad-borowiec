// Azure Container Apps Deployment using Bicep
// Optimized for free tier deployment

@description('Location for all resources')
param location string = resourceGroup().location

@description('Name prefix for all resources')
param namePrefix string = 'konrad-portfolio'

@description('Container image reference')
param containerImage string = 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'

@description('Session secret for the application')
@secure()
param sessionSecret string

@description('Target port for the container')
param targetPort int = 5000

// Variables
var environmentName = '${namePrefix}-env'
var containerAppName = '${namePrefix}-app'
var registryName = replace('${namePrefix}registry', '-', '')
var workspaceName = '${namePrefix}-workspace'

// Log Analytics Workspace (required for Container Apps)
resource workspace 'Microsoft.OperationalInsights/workspaces@2021-06-01' = {
  name: workspaceName
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
  }
}

// Azure Container Registry
resource registry 'Microsoft.ContainerRegistry/registries@2021-09-01' = {
  name: registryName
  location: location
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: true
  }
}

// Container Apps Environment
resource environment 'Microsoft.App/managedEnvironments@2022-03-01' = {
  name: environmentName
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: workspace.properties.customerId
        sharedKey: workspace.listKeys().primarySharedKey
      }
    }
  }
}

// Container App
resource containerApp 'Microsoft.App/containerApps@2022-03-01' = {
  name: containerAppName
  location: location
  properties: {
    managedEnvironmentId: environment.id
    configuration: {
      ingress: {
        external: true
        targetPort: targetPort
        transport: 'http'
        corsPolicy: {
          allowCredentials: true
          allowedOrigins: ['*']
          allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
          allowedHeaders: ['*']
        }
      }
      registries: [
        {
          server: registry.properties.loginServer
          username: registry.listCredentials().username
          passwordSecretRef: 'registry-password'
        }
      ]
      secrets: [
        {
          name: 'session-secret'
          value: sessionSecret
        }
        {
          name: 'registry-password'
          value: registry.listCredentials().passwords[0].value
        }
      ]
    }
    template: {
      containers: [
        {
          name: 'portfolio-app'
          image: containerImage
          resources: {
            cpu: json('0.25')     // Free tier: 0.25 vCPU
            memory: '0.5Gi'       // Free tier: 0.5 GB RAM
          }
          env: [
            {
              name: 'NODE_ENV'
              value: 'production'
            }
            {
              name: 'SESSION_SECRET'
              secretRef: 'session-secret'
            }
          ]
          probes: [
            {
              type: 'Liveness'
              httpGet: {
                path: '/health'
                port: targetPort
              }
              initialDelaySeconds: 30
              periodSeconds: 30
            }
            {
              type: 'Readiness'
              httpGet: {
                path: '/health'
                port: targetPort
              }
              initialDelaySeconds: 10
              periodSeconds: 10
            }
          ]
        }
      ]
      scale: {
        minReplicas: 0          // Can scale to zero (free tier)
        maxReplicas: 10         // Free tier limit
        rules: [
          {
            name: 'http-scaling'
            http: {
              metadata: {
                concurrentRequests: '30'
              }
            }
          }
        ]
      }
    }
  }
}

// Outputs
output containerAppFQDN string = containerApp.properties.configuration.ingress.fqdn
output containerAppUrl string = 'https://${containerApp.properties.configuration.ingress.fqdn}'
output registryLoginServer string = registry.properties.loginServer
output resourceGroupName string = resourceGroup().name
output containerAppName string = containerApp.name