# rails_chakra_docker

this is a simple admin aboard for your start with ruby on rails, docker, database is postgresql, start building fast.
At this init project is use front-end and back-end separation

# Documentation

 ## backed
1. [**ruby on rails**](https://rubyonrails.org/), Excited to release rails7 in 2021, and this project uses some of his new features, 
for example, tailwind and esbuild of the view layer.
2. [** docker **](https://www.docker.com/), started learning to use docker through this tutorial, the database I used is postgresql, 
and I didn't use Graphql, but use RESTful api. build a development environment with Docker Compose, see details docker-compose.yml. improve file sync performance with docker-sync.

## fronted
1. javascript framework[** React **](https://reactjs.org/),a JavaScript library for building user interfaces.
2. UI [** chakra **](https://chakra-ui.com/), Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.

# Usage

```
$ git clone 
$ cd rails_chakra_docker
```
then start docker, Usually run docker desktop app

then 

```
$ docker-compose down -v
$ docker-compose up --build -d
```
then 

```
$ docker-compose run app ./bin/dev
```


 
