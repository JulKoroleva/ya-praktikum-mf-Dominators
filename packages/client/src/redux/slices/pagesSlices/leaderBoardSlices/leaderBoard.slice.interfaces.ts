import { ILeaderBoardGetResponse } from '@/redux/requests/pagesRequests/leaderBoardRequest/leaderBoardRequest.interface';

export interface LeaderBoardState {
  data: Array<ILeaderBoardGetResponse>;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
