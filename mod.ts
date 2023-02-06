import ms from "https://esm.sh/ms@2.1.3";
import scoreMessage from "./messages/score.ts";
import scoresaberScores from "./util/monitorSocket.ts";
import { sendMessage } from "./util/sendScoreMessage.ts";
import { top50, updateTop50 } from "./util/top50.ts";

Deno.serve(
  () => {
    return new Response("🇮🇹");
  },
  { port: 8080, hostname: "0.0.0.0" }
);

await updateTop50();
setInterval(updateTop50, ms("30 mins"));

for await (const { leaderboard, score } of scoresaberScores()) {
  if (!score.leaderboardPlayerInfo) continue;
  if (!top50.has(score.leaderboardPlayerInfo.id)) continue;
  if (!leaderboard.ranked) continue;
  console.log(score);
  const message = scoreMessage({ leaderboard, score });
  sendMessage({ message });
}
