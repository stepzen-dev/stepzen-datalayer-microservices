# StepZen Data Layer For Microservices Example

An example showing how to build a GraphQL data layer for your microservices with StepZen.

## Getting started

Before you're able to try out this example, you need to make sure that StepZen is installed on your local machine and that you're logged in. You can find how to do this in the [Getting Started with StepZen](https://stepzen.com/docs/quick-start) guide.

After cloning this repository, you need to run the following command to start this example:

```
yarn start
```

This starts three different microservices and an HTTPS-tunnel with [localtunnel](https://www.npmjs.com/package/localtunnel) for each of these microservices. The tunnels will be logged in your terminal, and the hostnames must be added to `config.yaml` for all three microservices. In example:

```bash
Posts service is running on https://black-mouse-61.loca.lt
Users service is running on https://empty-robin-94.loca.lt
Auth service is running on https://smart-bird-79.loca.lt
```

It needs to be added as `smart-bird-79.loca.lt` to the configuration as:

```yaml
## config.yaml

configurationset:
  - configuration:
      name: auth_service
      client_id: test
      client_secret: test123
      hostname: 'smart-bird-79.loca.lt'
  - configuration:
      name: posts_service
      hostname: 'black-mouse-61.loca.lt'
  - configuration:
      name: users_service
      hostname: 'empty-robin-94.loca.lt'
```

Once you've added the hostnames to the configuration, you can start the data layer by running:

```
stepzen start
```

This will make a GraphQL API available at [http://localhost:5000/api/datalayer](http://localhost:5000/api/datalayer) with the GraphiQL Playground.

## Sending requests

This project is using [My JSON Server](https://my-json-server.typicode.com/) to create a free REST API for all the three microservices, based on the contents of `db.json` in this repository. These microservices are available through the local tunnels or via `localhost`:

- Authentication service: `http://localhost:3001`
- Users service: `http://localhost:3002`
- Posts service: `http://localhost:3003`

All the microservices have a GraphQL schema which is configured in the `index.graphql` files in every service directory. You can query these schemas at [http://localhost:5000/api/datalayer](http://localhost:5000/api/datalayer) with the GraphiQL Playground.

## Questions

Do you have any questions on this integration, or do you want to check out other integrations you can make with [StepZen](https://stepzen.com/? Have a look at the website or join the [Discord channel](https://discord.com/channels/768229795544170506) for support.

