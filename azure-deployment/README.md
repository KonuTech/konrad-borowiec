# Azure Container Apps Deployment Guide

This directory contains everything needed to deploy Konrad's optimized portfolio application to Azure Container Apps using the **Free Tier**.

## 🎯 Free Tier Specifications

- **CPU**: 0.25 vCPU per container
- **Memory**: 0.5 GB RAM per container
- **Scaling**: 0-10 replicas (can scale to zero)
- **Monthly Allowance**: 2 million requests, 400,000 GB-s execution time
- **Cost**: **FREE** within limits

## 📁 Deployment Files

### Core Deployment
- `deploy.sh` - Complete deployment script with Azure CLI
- `deploy-bicep.sh` - Infrastructure as Code deployment using Bicep
- `containerapp.yaml` - Kubernetes-style Container App configuration

### Infrastructure as Code
- `bicep/main.bicep` - Bicep template for complete infrastructure
- Includes: Container Registry, Log Analytics, Container App Environment

## 🚀 Quick Deployment Methods

### Method 1: One-Click Deployment Script

```bash
# Clone the repository and navigate to deployment folder
cd azure-deployment

# Make script executable
chmod +x deploy.sh

# Update configuration in deploy.sh:
# - SUBSCRIPTION_ID
# - RESOURCE_GROUP
# - REGISTRY_NAME (must be globally unique)

# Run deployment
./deploy.sh
```

### Method 2: Bicep Infrastructure as Code

```bash
# Make script executable
chmod +x deploy-bicep.sh

# Update configuration variables in deploy-bicep.sh
# Run deployment
./deploy-bicep.sh
```

### Method 3: Manual Azure CLI Commands

```bash
# 1. Create resource group
az group create --name rg-konrad-portfolio --location eastus

# 2. Create Container Registry
az acr create --resource-group rg-konrad-portfolio --name yourregistryname --sku Basic --admin-enabled true

# 3. Build and push image
az acr build --registry yourregistryname --image konrad-portfolio:latest --file ../Dockerfile ..

# 4. Create Container Apps environment
az containerapp env create --name env-konrad-portfolio --resource-group rg-konrad-portfolio --location eastus

# 5. Deploy Container App
az containerapp create \
  --name konrad-portfolio \
  --resource-group rg-konrad-portfolio \
  --environment env-konrad-portfolio \
  --image yourregistryname.azurecr.io/konrad-portfolio:latest \
  --target-port 5000 \
  --ingress external \
  --cpu 0.25 \
  --memory 0.5Gi \
  --min-replicas 0 \
  --max-replicas 10
```

## ⚙️ Configuration Requirements

### Before Deployment
1. **Azure Subscription**: Active Azure subscription
2. **Azure CLI**: Install and login (`az login`)
3. **Unique Registry Name**: Update registry name in scripts (must be globally unique)
4. **Session Secret**: Automatically generated or provide your own

### Environment Variables
- `NODE_ENV=production` (automatically set)
- `SESSION_SECRET` (automatically generated)

## 🏗️ Architecture Components

### Created Resources
- **Resource Group**: `rg-konrad-portfolio`
- **Container Registry**: `yourregistryname.azurecr.io`
- **Log Analytics Workspace**: For monitoring and logs
- **Container Apps Environment**: Managed Kubernetes environment
- **Container App**: Your portfolio application

### Application Features
- **Health Checks**: `/health` endpoint for container health
- **Monitoring**: Built-in Azure Monitor integration
- **Auto-scaling**: Based on HTTP requests (0-10 replicas)
- **HTTPS**: Automatic SSL certificate
- **Custom Domain**: Can be added after deployment

## 📊 Monitoring & Management

### Built-in Monitoring
- **Health Endpoint**: `https://your-app.azurecontainerapps.io/health`
- **Application Insights**: Automatic integration
- **Container Logs**: Available in Azure Portal
- **Metrics Dashboard**: CPU, memory, requests in Azure Portal

### Development Tools
- **Metrics Endpoint**: `https://your-app.azurecontainerapps.io/api/metrics` (dev only)
- **Log Streaming**: `az containerapp logs show --name konrad-portfolio --resource-group rg-konrad-portfolio --follow`

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)
```bash
# Add custom domain
az containerapp hostname add \
  --hostname yourdomain.com \
  --name konrad-portfolio \
  --resource-group rg-konrad-portfolio
```

### Scaling Configuration
```bash
# Update scaling rules
az containerapp update \
  --name konrad-portfolio \
  --resource-group rg-konrad-portfolio \
  --min-replicas 1 \
  --max-replicas 5
```

### Environment Variables
```bash
# Update environment variables
az containerapp update \
  --name konrad-portfolio \
  --resource-group rg-konrad-portfolio \
  --set-env-vars "NEW_VARIABLE=value"
```

## 🐳 Application Optimizations

Your deployed application includes:

### Performance Features
- **Multi-level Caching**: API responses cached with TTL
- **Image Optimization**: Dynamic image resizing and format conversion
- **CDN-Ready**: Optimized static asset serving
- **Compression**: HTTP response compression

### Security Features
- **Rate Limiting**: Protection against abuse
- **Security Headers**: CSP, XSS protection, HSTS
- **Request Validation**: Malicious pattern detection
- **Session Management**: Secure session handling

### Production Features
- **Health Checks**: Container health monitoring
- **Graceful Shutdown**: Proper signal handling
- **Error Handling**: Comprehensive error management
- **Metrics Collection**: Performance and usage analytics

## 💰 Cost Management

### Free Tier Monitoring
- Monitor usage in Azure Portal
- Set up billing alerts
- Track monthly consumption

### Optimization Tips
- **Scale to Zero**: Reduces costs when not in use
- **Efficient Caching**: Reduces compute time
- **Image Optimization**: Reduces bandwidth costs
- **Container Efficiency**: Optimized Docker image

## 🔍 Troubleshooting

### Common Issues
1. **Registry Name Conflicts**: Ensure globally unique registry name
2. **Subscription Limits**: Check Azure subscription limits
3. **Resource Quotas**: Verify Container Apps quota in region
4. **Image Build Failures**: Check Dockerfile and build context

### Debug Commands
```bash
# Check container app status
az containerapp show --name konrad-portfolio --resource-group rg-konrad-portfolio

# View logs
az containerapp logs show --name konrad-portfolio --resource-group rg-konrad-portfolio --follow

# Check revisions
az containerapp revision list --name konrad-portfolio --resource-group rg-konrad-portfolio
```

## 🎉 Success Indicators

After successful deployment, you should see:
- ✅ Application accessible via HTTPS URL
- ✅ Health check responding at `/health`
- ✅ All images loading correctly
- ✅ Contact form working
- ✅ Performance metrics available
- ✅ Scaling working (check with load)

## 📞 Support Resources

- [Azure Container Apps Documentation](https://docs.microsoft.com/azure/container-apps/)
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/)
- [Container Apps Pricing](https://azure.microsoft.com/pricing/details/container-apps/)
- [Free Tier Limits](https://azure.microsoft.com/free/)