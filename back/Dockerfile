FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk update && apk add --no-cache \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libxml2-dev \
    zip \
    unzip \
    postgresql-dev \
    oniguruma-dev \
    # Tesseract OCR (Alpine packages)
    tesseract-ocr \
    tesseract-ocr-data-eng \
    leptonica-dev \
    # Build tools (optional)
    make \
    g++

# Configure and install GD with JPEG & Freetype support
RUN docker-php-ext-configure gd --with-jpeg --with-freetype
RUN docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY custom.ini /usr/local/etc/php/conf.d/custom.ini

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader --no-interaction

# Create Laravel directory structure
RUN mkdir -p storage/app/public \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/testing \
    storage/framework/views \
    storage/logs \
    bootstrap/cache

# Copy project files 
COPY . .

# Generate optimized autoloader
RUN composer dump-autoload --optimize

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

# Verify Tesseract installation
RUN tesseract --version

# Expose port
EXPOSE 8000

# Start Laravel development server
CMD php artisan serve --host=0.0.0.0 --port=8000