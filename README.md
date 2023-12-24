# Asignment

This project demonstrates a full-stack application integrating a Node.js backend, a Python proxy script, and a Django web frontend.

## Components

1. **Node API (`node-api`)**: Provides CRUD APIs for a basic user model with just `name` and `email` attributes. Runs on port 3000.
2. **Proxy Script (`proxy.py`)**: A simple Python proxy to redirect requests to the Node API. Any request sent to port 5000 (proxy) will be redirected to port 3000 (Node API).
3. **Django Web Application (`django-web`)**: A basic Django web application with a `Product` model (having `name` and `price` attributes) registered in Django admin, allowing CRUD operations via the Django admin interface. It also includes a template `/product/fetch-user/` that fetches user data from the Node API via the proxy on port 5000.

## Getting Started

Follow the steps below to set up and run each component of the project.

### Node API Setup

In the `node-api` directory:

```bash
cd node-api
npm install
npm run migrate:dev
npm run seed
npm run start
```

## Python Proxy Script

Open a new terminal for this:

```bash
python ./proxy.py
```

### Django Web Application Setup

Open a new terminal for this. Install Poetry if it's not already installed.

In the django-web directory:

```
cd django-web
poetry install
poetry shell
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

```

# Testing Fetch User Functionality

To test the fetch user functionality on the Django web app, navigate to localhost:8000/product/fetch-user/.

# Project Overview

## Node Component

1. The Node API follows a modular structure, with potential for adding more modules like auth, product, etc., each in its respective directory.
2. Currently, the Node API only implements a basic CRUD for a User module. It lacks advanced features like authentication, authorization, email handling, and error-handling.

## Proxy Component

1. Initially, a micro-framework like Flask or FastAPI was considered for the proxy, but to keep it simple and dependency-free, pure Python was used.

## Django Web Component

1. Poetry is used for package management. Ensure Poetry is installed on your system to use this component.
2. The Django project is set up using basic CLI commands.
3. The Product component leverages Django's capabilities in building models and registering them in the admin. CRUD operations are managed by Django for each declared model.
4. A key feature is a basic web template that uses fetch API to communicate with the Node API through the Python proxy on port 5000. This template allows for fetching, adding, updating, and deleting users. However, as this is a basic implementation, it does not handle certain edge cases, such as failing Node's validation checks during update or create operations.
