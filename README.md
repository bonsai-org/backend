# Bonsai-Backend

### How to run this application on your machine 

### 1. Install Compose

The easiest way to run this backend on your machine is to use docker compose. The fastest way to get setup with Compose and Docker is by installing [Docker Desktop](https://www.docker.com/products/docker-desktop/) on your machine. Once installed, you should be able to get the application up and running fairly easily. 

###  2. Start the Docker Deamon if it is not already running. 

Open Docker Desktop if not already open/running on your machine.

###  3. Run Dev Server

In one terminal run compose 
```bash
# With live reloading
docker compose watch
# Only dev server 
docker compose up -d 
```

**Or run the nodejs debugger via Compose**

```bash
docker compose -f compose.debug.yaml watch
```

### 4. Listen for live log updates

In another terminal, listen for log updates from the backend container. 

```bash
docker compose logs -f backend
```

Note, if you run compose watch, the server will restart 
with any changes made to source code in the backend. You can instead 
choose to use ```docker compose up -d```, which will just run the dev server 
and won't update due to file changes made in source after the time of the 
initial build. 

## Working Endpoints 

- **POST /api/auth/login**
    - Requires username and password fields in a request body with content type set to application/json
    - Login will return a status code of 200 with two cookies that represent an access token and a refresh token upon
    successfully logging in
    - Login will return a status code of 401 if either the username or password fields are incorrect 
- **POST /api/auth/signup**
    - Requires username, password, confirmPassword, and email fields in a request body with content type set to application/json
    - Signup will return a status code of 200 with two cookies that represent an access token and a refresh token if the user
    was able to successfully sign up with the supplied information
    - Signup will return a status code of 400 if any of the required fields are incorrect 
    - Valid usernames and passwords for the bonsai org must be at least 8 characters and at most 20 characters long, and usernames can only contain alphanumeric characters (a-z, A-Z, 0-9). Passwords can contain any character

# Important Stuff

- The server listens on port 3000 when running locally via docker compose. All api requests that are being made locally to your machine that is running compose can be made via http://localhost:3000.
- All post requests to this server should have their Content-Type headers set to application/json