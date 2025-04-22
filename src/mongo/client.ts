import { MongoClient } from "mongodb";
import { PlayerZ, Position } from "./types";

export class UWGMongoDBClient {
  private client: MongoClient;
  private db: string = "uwg";
  private collection: string = "players";

  constructor(connectionString: string) {
    this.client = new MongoClient(connectionString);
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.close();
  }

  // this is kinda crap but whatever
  private getCollection() {
    const db = this.client.db(this.db);
    return db.collection(this.collection);
  }
  
  async insertPlayer({ playerName, position }: PlayerZ) {
    const response = await this.getCollection().insertOne({
      playerName,
      position,
    });
    return response;
  }

  async getPlayersByPosition(position: Position) {
    const players = await this.getCollection().find({ position }).toArray();
    return players;
  }
}