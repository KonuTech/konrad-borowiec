#!/bin/bash

# Azure Container Apps Deployment using Bicep Template
# Optimized for free tier deployment

set -e

# Configuration variables
SUBSCRIPTION_ID="your-subscription-id"
RESOURCE_GROUP="rg-konrad-portfolio"
LOCATION="eastus"
DEPLOYMENT_NAME="konrad-portfolio-deployment"
SESSION_SECRET=$(openssl rand -base64 32)

echo "🚀 Starting Azure Container Apps deployment with Bicep..."

# Step 1: Login and set subscription
echo "📝 Setting up Azure CLI..."
if ! az account show &>/dev/null; then
    echo "Please login to Azure:"
    az login
fi

az account set --subscription "$SUBSCRIPTION_ID"

# Step 2: Register providers
echo "📦 Registering required providers..."
az provider register --namespace Microsoft.App --wait
az provider register --namespace Microsoft.OperationalInsights --wait

# Step 3: Create resource group
echo "🏗️  Creating resource group..."
az group create \
    --name "$RESOURCE_GROUP" \
    --location "$LOCATION"

# Step 4: Deploy using Bicep template
echo "🚀 Deploying infrastructure with Bicep..."
DEPLOYMENT_OUTPUT=$(az deployment group create \
    --resource-group "$RESOURCE_GROUP" \
    --template-file "azure-deployment/bicep/main.bicep" \
    --parameters sessionSecret="$SESSION_SECRET" \
    --name "$DEPLOYMENT_NAME" \
    --query "properties.outputs" \
    --output json)

# Extract outputs
CONTAINER_APP_URL=$(echo "$DEPLOYMENT_OUTPUT" | jq -r '.containerAppUrl.value')
REGISTRY_SERVER=$(echo "$DEPLOYMENT_OUTPUT" | jq -r '.registryLoginServer.value')
CONTAINER_APP_NAME=$(echo "$DEPLOYMENT_OUTPUT" | jq -r '.containerAppName.value')

echo "✅ Infrastructure deployment complete!"
echo "📱 Application URL: $CONTAINER_APP_URL"
echo "🐳 Registry: $REGISTRY_SERVER"

# Step 5: Build and push the application image
echo "🐳 Building and pushing application image..."
REGISTRY_NAME=$(echo "$REGISTRY_SERVER" | sed 's/.azurecr.io//')

az acr build \
    --registry "$REGISTRY_NAME" \
    --image "konrad-portfolio:latest" \
    --file Dockerfile \
    .

# Step 6: Update Container App with the new image
echo "🔄 Updating Container App with application image..."
az containerapp update \
    --name "$CONTAINER_APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --image "$REGISTRY_SERVER/konrad-portfolio:latest"

echo ""
echo "🌟 Portfolio Application Deployed Successfully!"
echo "📱 Application URL: $CONTAINER_APP_URL"
echo "🔍 Health Check: $CONTAINER_APP_URL/health"
echo "📊 Metrics (Dev): $CONTAINER_APP_URL/api/metrics"
echo ""
echo "🎉 Your optimized portfolio is now live on Azure Container Apps!"