## Zombie Subgraph

### Local development

#### Note

- Contracts have not been deployed yet. So the contracts should be deployed to Ganache locally before deploy the graph

#### Setup Graph node

- Install Docker/Docker compose

- Clone [`graph-node`](https://github.com/graphprotocol/graph-node)

```bash
git clone https://github.com/graphprotocol/graph-node.git
cd graph-node/docker
```
#### Use docker-compose to run local-node
```
Graph Node:
GraphiQL: http://localhost:8000/
HTTP: http://localhost:8000/subgraphs/name/<subgraph-name>
WebSockets: ws://localhost:8001/subgraphs/name/<subgraph-name>
Admin: http://localhost:8020/
IPFS:
127.0.0.1:5001 or /ip4/127.0.0.1/tcp/5001
Postgres:
postgresql://graph-node:let-me-in@localhost:5432/graph-node
```

#### Create an example subgraph
```
$ graph init --from-example <GITHUB_USERNAME>/<SUBGRAPH_NAME> [<DIRECTORY>]
```

