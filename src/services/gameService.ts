export type GameFetchResponse = {
  team_id: number;
  matches_played: number;
  wins: number;
  losses: number;
  goals_for: number;
  goals_against: number;
}[];

export type GameData = {
  team1Name: number | undefined;
  team2Name: number | undefined;
  team1Score: number | undefined;
  team2Score: number | undefined;
};

export const fetchGameForTeam = async (teamID: number) => {
  const res = await fetch(`http://localhost:3005/${teamID}/games`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw Error('Failed to fetch game');
  return (await res.json()) as GameFetchResponse;
};

export const postGame = async (gameData: GameData) => {
  const res = await fetch('http://localhost:3005/games', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(gameData),
  });
  if (!res.ok) throw Error('Failed to fetch game');
  return (await res.json()) as GameFetchResponse;
};
