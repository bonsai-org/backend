# Bonsai-Backend

### How to run this application on your machine 

### 1. Install Compose

The easiest way to run this backend on your machine is to use docker compose. The fastest way to get setup with Compose and Docker is by installing [Docker Desktop](https://www.docker.com/products/docker-desktop/) on your machine. Once installed, you should be able to get the application up and running fairly easily. 

###  2. Start the Docker Deamon if it is not already running. 

Open Docker Desktop if not already open/running on your machine.

###  3. Run Dev Server

In one terminal run compose 
```bash
# With logs
docker compose watch
# Without logs
docker compose watch -d 
```

### 4. **Listen for live log updates**

In another terminal, listen for log updates from the backend container. 

```bash
docker compose logs -f backend
```

Note, if you run compose watch, the server will restart 
with any changes made to source code in the backend. You can instead 
choose to use ```docker compose up -d```, which will just run the dev server 
and won't update due to file changes made in source after the time of the 
initial build. 


# Important Stuff


- The server listens on port 3000. All api requests that are being made locally to this 
machine can be accessed via http://localhost:3000.


<!-- 

## Henry Todo 

- [ ] Implement Login
- [ ] Implement Auth/JWTs 
- [ ] Add comments to code 
- [ ] Clean up stuff
- [ ] Extract logic of formulating client responses into one or more standardized formats  -->