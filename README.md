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
