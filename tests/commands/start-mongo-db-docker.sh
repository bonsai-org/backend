#!/usr/bin/env bash

# docker pull mongodb/mongodb-community-server:latest
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest

# 1071  docker run --name mongo-container --network my-network -p 27017:27017 -d mongodb/mongodb-community-server:latest\n
# 1072  docker build -t bonsai-backend .
# 1074  docker run --name bonsai-backend --network my-network -p 3000:3000 -d bonsai-backend
# 1079  docker run --name bonsai-backend --network my-network -p 3000:3000 bonsai-backend