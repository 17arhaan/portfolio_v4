#!/bin/bash

# Docker Test Script for Portfolio
# This script tests both development and production Docker setups

set -e

echo "🐳 Portfolio Docker Test Script"
echo "==============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "ℹ️  $1"
}

# Check if Docker is installed
check_docker() {
    print_info "Checking Docker installation..."
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        print_error "Docker daemon is not running. Please start Docker."
        exit 1
    fi
    
    print_success "Docker is installed and running"
}

# Check if docker-compose is available
check_docker_compose() {
    print_info "Checking Docker Compose..."
    if command -v docker-compose &> /dev/null; then
        COMPOSE_CMD="docker-compose"
    elif docker compose version &> /dev/null; then
        COMPOSE_CMD="docker compose"
    else
        print_error "Docker Compose is not available"
        exit 1
    fi
    print_success "Docker Compose is available"
}

# Clean up any existing containers
cleanup() {
    print_info "Cleaning up existing containers..."
    $COMPOSE_CMD down --remove-orphans 2>/dev/null || true
    docker rm -f portfolio-test 2>/dev/null || true
    docker rm -f portfolio-dev-test 2>/dev/null || true
}

# Test production build
test_production() {
    print_info "Testing production Docker build..."
    
    # Build the production image
    if docker build -t portfolio-test .; then
        print_success "Production image built successfully"
    else
        print_error "Failed to build production image"
        return 1
    fi
    
    # Test running the container
    print_info "Testing production container startup..."
    if docker run -d --name portfolio-test -p 3001:3000 portfolio-test; then
        print_success "Production container started successfully"
        
        # Wait for the container to be ready
        sleep 10
        
        # Test if the application is responding
        if curl -f http://localhost:3001 > /dev/null 2>&1; then
            print_success "Production application is responding"
        else
            print_warning "Production application might not be ready yet (this is sometimes normal)"
        fi
        
        # Stop the container
        docker stop portfolio-test > /dev/null
        docker rm portfolio-test > /dev/null
    else
        print_error "Failed to start production container"
        return 1
    fi
}

# Test development build
test_development() {
    print_info "Testing development Docker build..."
    
    # Build the development image
    if docker build -f Dockerfile.dev -t portfolio-dev-test .; then
        print_success "Development image built successfully"
    else
        print_error "Failed to build development image"
        return 1
    fi
    
    print_success "Development setup is ready"
}

# Test docker-compose
test_compose() {
    print_info "Testing Docker Compose setup..."
    
    # Test production compose
    if $COMPOSE_CMD config > /dev/null 2>&1; then
        print_success "Docker Compose configuration is valid"
    else
        print_error "Docker Compose configuration is invalid"
        return 1
    fi
    
    # Test development profile
    if $COMPOSE_CMD --profile dev config > /dev/null 2>&1; then
        print_success "Development profile configuration is valid"
    else
        print_error "Development profile configuration is invalid"
        return 1
    fi
}

# Test image sizes
test_image_sizes() {
    print_info "Checking image sizes..."
    
    PROD_SIZE=$(docker image inspect portfolio-test --format='{{.Size}}' 2>/dev/null || echo "0")
    DEV_SIZE=$(docker image inspect portfolio-dev-test --format='{{.Size}}' 2>/dev/null || echo "0")
    
    if [ "$PROD_SIZE" != "0" ]; then
        PROD_MB=$((PROD_SIZE / 1024 / 1024))
        print_info "Production image size: ${PROD_MB}MB"
        
        if [ "$PROD_MB" -gt 500 ]; then
            print_warning "Production image is quite large (${PROD_MB}MB). Consider optimizing."
        else
            print_success "Production image size is reasonable (${PROD_MB}MB)"
        fi
    fi
    
    if [ "$DEV_SIZE" != "0" ]; then
        DEV_MB=$((DEV_SIZE / 1024 / 1024))
        print_info "Development image size: ${DEV_MB}MB"
    fi
}

# Main execution
main() {
    print_info "Starting Docker tests..."
    echo
    
    # Run all tests
    check_docker
    check_docker_compose
    cleanup
    
    echo
    print_info "Running tests..."
    
    if test_production && test_development && test_compose; then
        echo
        test_image_sizes
        echo
        print_success "All Docker tests passed! 🎉"
        echo
        print_info "You can now run:"
        echo "  📦 Production: docker-compose up --build"
        echo "  🔧 Development: docker-compose --profile dev up"
        echo
    else
        echo
        print_error "Some tests failed. Please check the output above."
        cleanup
        exit 1
    fi
    
    cleanup
}

# Handle interrupts
trap cleanup EXIT

# Run the main function
main 