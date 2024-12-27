export interface ILeaderBoardData {
  id: number;
  username: string;
  scoredominators: number;
  avatar?: string;
}

export interface ILeaderBoardGetResponse {
  data: ILeaderBoardData;
}

export interface ILeaderBoardGetRequest {
  ratingFieldName: string;
  cursor: number;
  limit: number;
}

export interface ILeaderBoardAddRequest {
  data: ILeaderBoardData;
  ratingFieldName?: string;
  teamName: string;
}
