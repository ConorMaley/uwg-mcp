# Underwhelming Gents MCP Server 

An MCP server used to connect and interact with my fantasy football league's resources

- postgres
- mongo
- yahoo fantasy sport api

## How to run locally
```
npm i
npm run build
```

Open `claude_desktop_config.json` file


Add
```
"uwg": {
    "command": "node",
    "args": [
        "<repo location>/dist/index.js"
    ],
    "env": {
        "MONGO_URL": "<REDACTED>"
        ...
    }
}
```

### Troubleshooting
- I needed to give the exact path of the node version (22) I wanted to run inside the claude desktop config file