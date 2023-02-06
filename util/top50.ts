import type { components as ScoreSaber } from "../types/scoresaber.ts";
export let top50: Map<string, ScoreSaber["schemas"]["Player"]> = new Map();

export const updateTop50 = async () => {
  console.log("Updating top 50");
  const res = await fetch("https://scoresaber.com/api/players?countries=IT");
  const { players } =
    (await res.json()) as ScoreSaber["schemas"]["PlayerCollection"];

  top50 = new Map(players.map((player) => [player.id, player]));
};
