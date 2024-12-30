import { GET_SERVICE_ID } from '@/constants/apiUrls';
import { BASE_HEADERS } from '@/constants/apiHeaders';
import { IGetServiceIdResponse, IGetServiceIdRequest } from './OAuthApi.interface';

class OAuthApi {
  static async getServiceId({ redirect_uri }: IGetServiceIdRequest) {
    try {
      const response = await fetch(`${GET_SERVICE_ID}?redirect_uri=${redirect_uri}`, {
        method: 'GET',
        headers: {
          ...BASE_HEADERS,
        },
        credentials: 'include',
      });

      const data: IGetServiceIdResponse = await response.json();
      return data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}

export default OAuthApi;
