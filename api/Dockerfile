# Stage 1: Build PHP dependencies
FROM composer:latest AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
# Note: Ensure these files exist in your /api folder
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Stage 2: Final Image
FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache libpng-dev libzip-dev zip unzip git
RUN docker-php-ext-install pdo pdo_mysql gd zip

WORKDIR /var/www

# Copy the application code
COPY . .

# Copy the vendor directory from Stage 1
# IMPORTANT: Ensure the path matches exactly.
COPY --from=vendor /app/vendor /var/www/vendor

# Run composer dump-autoload to generate the missing file
RUN composer dump-autoload --optimize

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]