# Campaign Management Application

## Application Overview

This full-stack application is designed to manage marketing campaigns. The key features include:

- **Create Campaign**: Create a campaign and store them in the database.
- **List Campaigns**: Retrieve and display all marketing campaigns in an organized manner.
- **Update Running Status of the Campaign**: Run or stop the campaign with toggle.
- **Show Campaign Details**: Show campaign detail page by campaign id
- **Search and Filter**: Search campaigns by title and landing page url and filter by campaign running status in the campaign list page.

# How it works?
You can watch the quick demo!


## Technologies Used
### Backend
- **Python**
- **Flask**
- **Pytest**
- **SQLite**
- **Docker**

### Frontend
- **React & Vite**
- **TypeScript**
- **Bootstrap 5**
- **Docker**

### Infrastructure
- **Render (https://render.com)**

## Setup

### Quick Start with Docker

###### Requirements

- Docker
- Docker Compose

1. Clone the repository:
    ```sh
    git clone https://github.com/ilaydadastan/adcash-campaign-management.git
    cd adcash-campaign-management
    ```

2. Start the Docker containers:

   This command will:
   - Build the Docker images for the backend and frontend. 
   - Start the containers and link them together. 
   - Run the containers in detached mode (in the background).

    ```sh
    docker compose up -d --build
    ```
   If the above docker command does not work you can try this
    ```sh
    docker-compose up -d --build
    ```
   To verify that the containers are running properly, use the following command below and, you will see that two containers are running.
   ```sh
    docker ps
    ```

3. Open the frontend application in your browser:
    ```
    http://localhost:8080
    ```
The React frontend communicates with the Flask backend API and provides the user interface.

4. Access the backend API at:
    ```
    http://localhost:5001/api
    ```
The Flask backend handles API requests and connects to the SQLite database.


### Usage

- Manage campaigns by creating, viewing, listing, and updating running status.



### Run without Docker
#### Backend

###### Requirements
- Python
- Pip

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Create and activate a virtual environment:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use .\venv\Scripts\activate
    ```

3. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

4. Run the database migrations:

   If you are creating the db for the first time, run the following command to initialize it.

    ```sh
    flask db init
    ```

   If you have any changes to the db model in your code, run the following command to create a migration.

    ```sh
    flask db migrate
    ```
   
   If you want to apply the created migrations to your db, run the following command.

   ```sh
   flask db upgrade
    ```

5. Start the backend application:
    ```sh
    python run.py
    ```

6. Access the backend API at:
    ```
    http://localhost:5001/api
    ```

#### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install the required packages:
    ```sh
    npm install
    ```

3. Start the frontend application:
    ```sh
    npm run dev
    ```

4. Access the frontend application at:
    ```
    http://localhost:8080
    ```

### Run Backend Tests
The tests are written with Pytest and are located in the `tests` directory in the backend. It is run with the following command in the backend directory.
   ```sh
      pytest
   ```

### Backend Configurations

- There are three profiles: development, production, and testing. 
- Database URLs are set based on profile specific configuration. 
- To prevent CORS issues, allowed origins for the production and development profiles have been added to the `ALLOWED_ORIGINS` variable in `config.py`. 
- The debug setting can be changed per profile using the `DEBUG` variable.

### Frontend Configurations

- There are two environment files: `.env.development` and `.env.production`, corresponding to the development and production environments.
- The `.env.development` file sets the local URLs for both the client and server. 
- To use mock data created for testing instead of requests from the backend, you can use the `VITE_USE_MOCK_API` environment variable based on the profile.

### Application Deployment

- The application has been deployed on the Render (https://render.com
) cloud platform and is accessible globally through public domains.

Backend Public URL: https://flask-backend-g4e0.onrender.com/api/campaigns
Frontend Public URL: https://react-frontend-hl44.onrender.com

These instructions should help you set up and run the project from start to finish. If you need further assistance or information, please let me know.
