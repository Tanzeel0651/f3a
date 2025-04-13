import { createServer, type Registry, Response as MockResponse, type Server } from 'miragejs';
import type { AnyFactories, AnyModels } from 'miragejs/-types';
import type { GameFetchResponse } from '@/services/gameService';

let testServer: Server<Registry<AnyModels, AnyFactories>> | undefined;

export const createMockServer = () => {
  if (testServer !== undefined) testServer.shutdown();
  return (testServer = createServer({
    environment: import.meta.env.MODE,
    routes() {
      this.get(
        'http://localhost:3005/games',
        () =>
          new MockResponse(200, {}, [
            {
              team_id: 0,
              matches_played: 1,
              wins: 2,
              losses: 3,
              goals_for: 4,
              goals_against: 5,
            },
          ] as GameFetchResponse)
      );
    },
  }));
};
