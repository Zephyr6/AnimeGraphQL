# AnimeGraphQL

An Anime GraphQL server with MongoDB caching, all in Docker.

## Getting Started

### Prerequisites

If you don't have the following installed, click on the links to download and install.

* [Docker](https://www.docker.com/community-edition/)
* [Nodejs](https://nodejs.org/en/download/)

## Quick Start

These instructions will get the server up and running ASAP. Once you have the Prerequisites installed, follow these instructions.

Start off by opening a terminal window in the project's root folder.

Build the docker containers.

```
docker-compose build
```

Start and attach the built containers in Detached mode (-d).

```
docker-compose up -d
```

### Using GraphiQL

You should be able to navigate to [localhost:3001/graphiql](http://localhost:3001/graphiql) to make queries into graphql. Try copying and pasting the following into the query box on the left side and clicking on the play button.

```
query{
  anime(id:33206) {
    title
    title_japanese
    aired {
      from
      to
    }
    episode
    opening_theme{
      track
      by
    }
  }
}
```

Try the following query to search by name.

```
query{
   search(name:"kobabyashi"){
     id
     name
   }
 }
```

### Viewing the API logs

You can use the following command to view the API logs in real time.

```
docker-compose logs -f --tail=20 api
```

### Viewing the Docker Containers

You can view a list of your docker containers and their statuses using the following command.

```
docker-compose ps
```
