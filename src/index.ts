import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { position, playerZ } from "./mongo/types";
import { UWGMongoDBClient } from "./mongo/client";

let mongoClient: UWGMongoDBClient;

// Create an MCP server
const server = new McpServer({
  name: "Underwhelming Gents MCP Server",
  version: "1.0.0"
}, {
    capabilities: {
        tools: {}
    }
});

server.tool(
    "get_players_by_position",
    { position },
    async ({ position }, extra) => {
        const players = await mongoClient.getPlayersByPosition(position);
        const content = players.map(player => ({
            type: "text" as const,
            text: `${player.playerName} - ${player.position}`
        }));
        return { content };
    }
)

server.tool(
    "insert_player", 
    playerZ,
    async ({ playerName, position }) => {
        const response = await mongoClient.insertPlayer({
            playerName,
            position
        });
        return { content: [{ type: 'text', text: `Player inserted! -> ${response.insertedId}`}] };
    }
)

async function connectToMongoDB() {
    if (!process.env.MONGO_URL) {
        throw new Error("MongoDB url missing!");
    }
    mongoClient = new UWGMongoDBClient(process.env.MONGO_URL);
    await mongoClient.connect();
}

(async function run() {
    try {
        // Connect to the database
        await connectToMongoDB();
        // Start the server
        const transport = new StdioServerTransport();
        await server.connect(transport);
    } catch (error) {
        console.error("failed to start server:", error);
    } 
})();
