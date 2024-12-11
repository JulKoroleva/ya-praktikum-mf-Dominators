import { AuthenticationState } from '../reducers/pageReducers/authenticationReducer/authenticationReducer';
import { GlobalState } from '../reducers/globalReducers/globalReducer';

export interface IStore {
  authentication: AuthenticationState;
  global: GlobalState;
}
