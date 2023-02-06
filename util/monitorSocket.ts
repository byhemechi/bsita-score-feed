import type { components as ScoreSaber } from "../types/scoresaber.ts";
interface Message<N, T> {
  commandName: N;
  commandData: T;
}

type ScoreMessage = Message<"score", ScoreSaber["schemas"]["PlayerScore"]>;

export default async function* scoresaberScores() {
  const socket = new WebSocketStream("wss://scoresaber.com/ws");
  const connection = await socket.connection;

  for await (const event of connection.readable) {
    const message = event.toString();
    if (message === "Connected to the ScoreSaber WSS") {
      console.log(message);
      continue;
    }
    const data = JSON.parse(message.toString()) as ScoreMessage;
    yield data.commandData;
  }
}
