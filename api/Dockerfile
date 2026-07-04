# Stage 1: Build PHP dependencies
FROM composer:latest AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
# Ensure this install matches what your local dev expects
RUN composer install --no-dev --no-scripts --prefer-dist --optimize-autoloader

# Stage 2: Final Image
# Update this tag from 8.3 to 8.4
FROM php:8.4-fpm-alpine

# Install system dependencies
RUN apk add --no-cache libpng-dev libzip-dev zip unzip git
# Note: In PHP 8.4, the extensions install command remains the same
RUN docker-php-ext-install pdo pdo_mysql gd zip

WORKDIR /var/www

# Copy the application code
COPY . .

# Copy the vendor directory from Stage 1
COPY --from=vendor /app/vendor /var/www/vendor

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]