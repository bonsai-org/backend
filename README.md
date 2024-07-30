# Bonsai-Backend

### How to run this application on your machine 

1. Fork this repository and clone the application onto your machine.

2. Install and run MongoDB locally on your machine. You can find directions on how to install MongoDB Community Server for your particular machine [here](https://www.mongodb.com/docs/manual/installation/). 

3. Install dependencies 

```bash
npm install 
```

4. Create a .env file in the root of the project directory and add the following variables. 

<i>Note that this bare bones setup is to simply get us up and running and that more secure secret sharing will be used in the future.</i>

```bash
# This is the default MongoDB Community Server URL followed by a database called bonsai-dev-database. 
MONGO_DB_STRING="mongodb://localhost:27017/bonsai-dev-database" 
PORT=3000
NODE_ENV="dev"
```

5. Start the application
```bash
npm run dev
```


## Henry Todo 

- [ ] Implement Login
- [ ] Implement Auth/JWTs 
- [ ] Add comments to code 
- [ ] Clean up stuff