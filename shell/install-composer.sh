#!/bin/bash
# This script installs Composer globally in the Docker container.
# 1. Input the Docker Service Name - default is 'wordpress'
read -p "Enter the Docker Container Service Name (default: wordpress): " SERVICE_NAME
SERVICE_NAME=${SERVICE_NAME:-wordpress}
# 2. Check if the service is running
if docker compose ps | grep -q "$SERVICE_NAME"; then
    echo "Service '$SERVICE_NAME' is running."
else
    echo "Service '$SERVICE_NAME' is not running. Please start the service first."
    exit 1
fi
# 3. Check if Composer is already installed
if docker compose exec "$SERVICE_NAME" composer --version &>/dev/null; then
    echo "Composer is already installed in the '$SERVICE_NAME' container."
    exit 0
else
    echo "Installing Composer in the '$SERVICE_NAME' container..."
fi
# 4. Install Composer
docker compose exec "$SERVICE_NAME" bash -c "php -r \"copy('https://getcomposer.org/installer', 'composer-setup.php');\""
docker compose exec "$SERVICE_NAME" bash -c "php composer-setup.php --install-dir=/usr/local/bin --filename=composer;"
docker compose exec "$SERVICE_NAME" bash -c "php -r \"unlink('composer-setup.php');\""
# 5. Verify Composer installation
if docker compose exec "$SERVICE_NAME" composer --version &>/dev/null; then
    echo "Composer has been successfully installed in the '$SERVICE_NAME' container."
else
    echo "Failed to install Composer in the '$SERVICE_NAME' container."
    exit 1
fi
