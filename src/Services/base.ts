import { Config } from "@/Config";
import { getUserInAsyncStorage } from "@/Helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: Config.API_URL, 
  //  prepareHeaders: async (headers, { getState }) => {
  //   // Get the token from your state or any other source
  //   getUserInAsyncStorage().then(user => {
  //     if (user && user.access_token) {
  //       headers.set('Authorization', `Bearer ${user.access_token}`);
  //     }
  //   })
  //   headers.set('Content-Type', 'application/json');
    
  //   return headers;
  // },
});

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }
  return result;
};

export const API = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
