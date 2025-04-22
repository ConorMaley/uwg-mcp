import { z } from "zod";

export const position = z.enum(["QB", "RB", "WR", "TE", "DEF", "K"]);
export const playerZ = {
    playerName: z.string(),
    position,
};
export type Position = z.infer<typeof position>;
export type PlayerZ = z.infer<ReturnType<typeof z.object<typeof playerZ>>>;