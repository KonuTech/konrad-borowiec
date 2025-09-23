#!/bin/bash

# Azure Container Apps Deployment Script for Konrad Portfolio
# This script deploys the optimized portfolio application to Azure Container Apps Free Tier

set -e

# Configuration variables (Update these with your values)
SUBSCRIPTION_ID="your-subscription-id"
RESOURCE_GROUP="rg-konrad-portfolio"
LOCATION="eastus"  # Free tier available regions
ENVIRONMENT_NAME="env-konrad-portfolio"
CONTAINER_APP_NAME="konrad-portfolio"
REGISTRY_NAME="acrkonradportfolio"  # Must be globally unique
IMAGE_NAME="konrad-portfolio"
SESSION_SECRET=$(openssl rand -base64 32)

echo "🚀 Starting Azure Container Apps deployment..."

# Step 1: Login to Azure (if not already logged in)
echo "📝 Checking Azure login status..."
if ! az account show &>/dev/null; then
    echo "Please login to Azure:"
    az login
fi

# Step 2: Set subscription
echo "🔧 Setting subscription: $SUBSCRIPTION_ID"
az account set --subscription "$SUBSCRIPTION_ID"

# Step 3: Register required providers
echo "📦 Registering required Azure providers..."
az provider register --namespace Microsoft.App --wait
az provider register --namespace Microsoft.OperationalInsights --wait

# Step 4: Create resource group
echo "🏗️  Creating resource group: $RESOURCE_GROUP"
az group create \
    --name "$RESOURCE_GROUP" \
    --location "$LOCATION"

# Step 5: Create Azure Container Registry (ACR)
echo "📁 Creating Azure Container Registry: $REGISTRY_NAME"
az acr create \
    --resource-group "$RESOURCE_GROUP" \
    --name "$REGISTRY_NAME" \
    --sku Basic \
    --admin-enabled true \
    --location "$LOCATION"

# Step 6: Build and push Docker image to ACR
echo "🐳 Building and pushing Docker image..."
az acr build \
    --registry "$REGISTRY_NAME" \
    --image "$IMAGE_NAME:latest" \
    --file Dockerfile \
    .

# Step 7: Get ACR credentials
echo "🔐 Retrieving ACR credentials..."
ACR_USERNAME=$(az acr credential show --name "$REGISTRY_NAME" --query "username" -o tsv)
ACR_PASSWORD=$(az acr credential show --name "$REGISTRY_NAME" --query "passwords[0].value" -o tsv)

# Step 8: Create Container Apps environment
echo "🌐 Creating Container Apps environment: $ENVIRONMENT_NAME"
az containerapp env create \
    --name "$ENVIRONMENT_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --location "$LOCATION"

# Step 9: Deploy Container App
echo "🚀 Deploying Container App: $CONTAINER_APP_NAME"
az containerapp create \
    --name "$CONTAINER_APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --environment "$ENVIRONMENT_NAME" \
    --image "$REGISTRY_NAME.azurecr.io/$IMAGE_NAME:latest" \
    --registry-server "$REGISTRY_NAME.azurecr.io" \
    --registry-username "$ACR_USERNAME" \
    --registry-password "$ACR_PASSWORD" \
    --target-port 5000 \
    --ingress external \
    --cpu 0.25 \
    --memory 0.5Gi \
    --min-replicas 0 \
    --max-replicas 10 \
    --env-vars "NODE_ENV=production" "SESSION_SECRET=$SESSION_SECRET"

# Step 10: Configure health probes
echo "🏥 Configuring health probes..."
az containerapp update \
    --name "$CONTAINER_APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --set-env-vars "NODE_ENV=production" "SESSION_SECRET=$SESSION_SECRET"

# Get the application URL
echo "✅ Deployment complete!"
APP_URL=$(az containerapp show \
    --name "$CONTAINER_APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --query "properties.configuration.ingress.fqdn" -o tsv)

echo ""
echo "🌟 Portfolio Application Deployed Successfully!"
echo "📱 Application URL: https://$APP_URL"
echo "🔍 Health Check: https://$APP_URL/health"
echo "📊 Metrics (Dev): https://$APP_URL/api/metrics"
echo ""
echo "📋 Deployment Summary:"
echo "   Resource Group: $RESOURCE_GROUP"
echo "   Container App: $CONTAINER_APP_NAME"
echo "   Registry: $REGISTRY_NAME.azurecr.io"
echo "   Environment: $ENVIRONMENT_NAME"
echo "   CPU: 0.25 vCPU (Free Tier)"
echo "   Memory: 0.5 GB (Free Tier)"
echo "   Scaling: 0-10 replicas"
echo ""
echo "🎉 Your optimized portfolio is now live on Azure Container Apps!"

# Optional: Open the application in browser
if command -v xdg-open &> /dev/null; then
    echo "🌐 Opening application in browser..."
    xdg-open "https://$APP_URL"
elif command -v open &> /dev/null; then
    echo "🌐 Opening application in browser..."
    open "https://$APP_URL"
fi