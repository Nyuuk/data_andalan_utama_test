# Use an official PHP runtime as a parent image
FROM php:latest

# Set the working directory in the container
WORKDIR /var/www/html

# Copy the current directory contents into the container
COPY . .
COPY .env.docker .env

# Install any needed packages specified in requirements.txt
RUN apt-get update && \
    apt-get install -y \
    git \
    unzip
#    apt-get install -y \
#    nodejs \
#    npm

# Set environment variables
ENV DB_CONNECTION=mysql
ENV DB_HOST=database
ENV DB_PORT=3306
ENV DB_DATABASE=laravel
ENV DB_USERNAME=laraveluser
ENV DB_PASSWORD=laravelpassword

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Run Composer to install dependencies
RUN composer install && \
    docker-php-ext-install pdo mysqli pdo_mysql && \
    docker-php-ext-enable pdo mysqli pdo_mysql && \
#    npm install && \
    php artisan key:generate


# Run app.php when the container launches
CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
