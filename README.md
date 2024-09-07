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

#### POST /api/auth/login

- Requires username and password fields in a request body 
- Login will return two cookies that represent an access token and a refresh token upon successfully logging in

#### POST /api/auth/signup

- Requires *username*, *password*, *confirmPassword*, and *email* fields in a request body with content type set to application/json
    - Valid usernames for the bonsai org must be at least 8 characters and at most 20 characters long, and can only contain alphanumeric characters (a-z, A-Z, 0-9). 
    - Passwords for the bonsai org can contain any characters
    - Emails must be any valid email address 
- Signup will return two cookies that represent an access token and a refresh token if the user
was able to successfully sign up with the supplied information
    
    **Example client payload to /api/auth/signup**

    ```javascript
    // Use javascript's fetch to query signup 
    async function querySignup() {
        let response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'henryjacobs',
                password: 'password',
                confirmPassword: 'password',
                email: 'henryjacobs@fun.com'
            })
        })
        return response
    }
    ```

    **Signup EXPECTED RESPONSES**

    - 200 Ok - Successful sign up 
    - 400 Bad Request - Client has supplied invalid format input 
    - 409 Conflict - Client has supplied a username or email that conflicts with an existing user

#### GET /api/auth

- This is a get request that the client can make when the user first visits the application to determine if they have valid credentials. 
- In order for this endpoint to work, the client must include cookies in the get request. 
- If the client sends valid cookies, the endpoint will return a status of 200, with a json payload { loggedIn: true }. If the client supplies invalid credentials, it will receive a 401 status (unauthorized) and will be redirected to /login. 

# Important Stuff

- The server listens on port 3000 when running locally via docker compose. All api requests that are being made locally to your machine that is running compose can be made via http://localhost:3000.
- All post requests to this server should have their Content-Type headers set to application/json

## To Do 
- [ ] Write endpoints to create, read, and update bonsai
    - [ ] How do you upload, edit, and delete bonsai images? 
- [ ] Refactor test suite to be less bloated and repetitive
- [ ] Write tests for launch application controller
    - [ ] Sketch out the general flow of the request response cycle of the client first visting the site, 
    being authenticated, and requesting some data. 
- [ ] Documentation
- [ ] Hosting  