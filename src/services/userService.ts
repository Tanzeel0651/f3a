export type GameFetchResponse = {
  game_id: number;
  team_1_score: number;
  team_2_score: number;
  team_1_id: number;
  team_2_id: number;
};

export type GameData = {
  team1Name: number | undefined;
  team2Name: number | undefined;
  team1Score: number | undefined;
  team2Score: number | undefined;
};

export const fetchUser = async () => {
  const res = await fetch('http://localhost:3005/games', {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw Error('Failed to fetch game');
  return (await res.json()) as GameFetchResponse;
};

export const postUser = async (gameData: GameData) => {
  const res = await fetch('http://localhost:3005/games', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(gameData),
  });
  if (!res.ok) throw Error('Failed to fetch game');
  return (await res.json()) as GameFetchResponse;
};
