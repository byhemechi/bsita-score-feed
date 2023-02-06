import type { components as ScoreSaber } from "../types/scoresaber.ts";
import type { DiscordMessage } from "https://deno.land/x/discordeno@18.0.1/types/discord.ts";
import difficultyColour from "./colours.ts";

const scoreMessage = ({
  leaderboard,
  score,
}: ScoreSaber["schemas"]["PlayerScore"]): Partial<DiscordMessage> => {
  const fields = [
    {
      name: `${leaderboard.songAuthorName} - ${leaderboard.songName} ${leaderboard.songSubName}`,
      value: [
        `**Accuracy**: ${(
          ((score.modifiedScore ?? 0) / leaderboard.maxScore) *
          100
        ).toFixed(2)}%`,
        `**Rank**: #${score.rank}`,
        `**PP**: ${score.pp.toLocaleString("it")}`,
        `**Time Set**: <t:${new Date(score.timeSet).getTime() / 1000}>`,
      ].join("\n"),
    },
  ];
  return {
    embeds: [
      {
        title: `${score.leaderboardPlayerInfo?.name} set a ranked score`,

        image: { url: leaderboard.coverImage },
        url: `https://scoresaber.com/leaderboard/${leaderboard.id}?countries=it`,
        thumbnail: {
          url:
            score.leaderboardPlayerInfo?.profilePicture ??
            "https://cdn.scoresaber.com/avatars/oculus.png",
        },
        timestamp: score.timeSet,
        fields,
        color: difficultyColour(leaderboard.difficulty.difficultyRaw),
      },
    ],
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 5,
            url: `https://scoresaber.com/u/${score.leaderboardPlayerInfo?.id}`,
            label: "Player Profile",
          },
          {
            type: 2,
            style: 5,
            url: `https://scoresaber.com/leaderboard/${leaderboard.id}?countries=IT`,
            label: "Full Leaderboard",
          },
        ],
      },
    ],
  };
};

export default scoreMessage;
