IMAGE_NAME := zero-config-ts-node-app
CONTAINER_NAME := zero-config-ts-node-app

all: clean build run

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run --name $(CONTAINER_NAME) -p 3000:3000 $(IMAGE_NAME)

clean:
	docker ps -aq | xargs docker stop | xargs docker rm
	docker images -q $(CONTAINER_NAME) | xargs docker rmi