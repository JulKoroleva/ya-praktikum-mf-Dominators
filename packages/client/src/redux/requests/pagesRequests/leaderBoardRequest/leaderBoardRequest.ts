import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_LEADERBOARD_URL } from '@/constants/apiUrls';
import {
  ILeaderBoardGetResponse,
  ILeaderBoardGetRequest,
  ILeaderBoardData,
  ILeaderBoardAddRequest,
} from './leaderBoardRequest.interface';

export const fetchLeaderBoard = createAsyncThunk<
  Array<ILeaderBoardGetResponse>,
  ILeaderBoardGetRequest,
  { rejectValue: string }
>(
  'leaderboard/fetchLeaderBoard',
  async ({ ratingFieldName, cursor, limit }, { rejectWithValue }) => {
    const teamName = `dominators`;
    const dataRequest = {
      cursor: cursor || 0,
      limit: limit || 10,
      ratingFieldName,
    };

    try {
      const response = await fetch(`${GET_LEADERBOARD_URL}/${teamName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataRequest),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.reason || 'Unknown error');
      }

      return response.json();
    } catch (error) {
      return rejectWithValue('Network error');
    }
  },
);

export const addLeaderBoardEntry = createAsyncThunk<
  void,
  ILeaderBoardData,
  { rejectValue: string }
>('leaderboard/addLeaderBoardEntry', async (data, { rejectWithValue }) => {
  try {
    const teamName = 'dominators';
    const dataRequest: ILeaderBoardAddRequest = {
      data,
      teamName,
      ratingFieldName: 'scoredominators',
    };

    const response = await fetch(`${GET_LEADERBOARD_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataRequest),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.reason || 'Unknown error');
    }

    return response.json();
  } catch (error) {
    return rejectWithValue('Network error');
  }
});
