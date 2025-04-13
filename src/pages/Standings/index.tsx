import * as React from 'react';
import styles from '@/pages/Standings/Standings.module.scss';
import { fetchGameForTeam, postGame, type GameFetchResponse } from '@/services/gameService';

export const Standings = () => {
  const [teamData, setTeamData] = React.useState<GameFetchResponse | undefined>();
  const [team1Name, setTeam1Name] = React.useState<number | undefined>(undefined);
  const [team2Name, setTeam2Name] = React.useState<number | undefined>(undefined);
  const [team1Score, setTeam1Score] = React.useState<number | undefined>(undefined);
  const [team2Score, setTeam2Score] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    fetchGameForTeam(2).then(setTeamData);
  }, []);

  return (
    <div className={styles.Standings}>
      <div className={styles.season}>
        Season<br></br>{' '}
        <select className={styles.seasonSelect}>
          <option value="2023Fall">2023 Fall</option>
          <option value="2022Spring">2022 Spring</option>
          <option value="2022Fall">2022 Fall</option>
          <option value="2021Spring">2021 Spring</option>
          <option value="2021Fall">2021 Fall</option>{' '}
        </select>{' '}
      </div>
      <div className={styles.league}>
        <table>
          <thead>
            <tr>
              <th>Club</th>
              <th>MP</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Pts</th>
              <th>Last 5</th>
            </tr>
          </thead>
          <tbody>
            {teamData?.map(team => (
              <tr>
                <td>{team.team_id}</td>
                <td>{team.matches_played}</td>
                <td>{team.wins}</td>
                <td>{team.matches_played - team.wins - team.losses}</td>
                <td>{team.losses}</td>
                <td>{team.goals_for}</td>
                <td>{team.goals_against}</td>
                <td>{team.goals_for - team.goals_against}</td>
                <td>{team.wins * 5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1 style={{ margin: 0 }}>Input New Game</h1>
      <h3>
        Input Team 1 ID <input value={team1Name} onChange={e => setTeam1Name(+e.target.value)} />
        Input Team 2 ID <input value={team2Name} onChange={e => setTeam2Name(+e.target.value)} />
        Input Team 1 Score <input value={team1Score} onChange={e => setTeam1Score(+e.target.value)} />
        Input Team 2 Score <input value={team2Score} onChange={e => setTeam2Score(+e.target.value)} />
        <br />
        <button onClick={() => postGame({ team1Name, team1Score, team2Name, team2Score })}>Submit</button>
      </h3>
    </div>
  );
};
