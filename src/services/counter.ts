import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CounterList, LogList, QueryParams } from '../types';

const API_URL = process.env.REACT_APP_API_URL!;
const API_KEY = process.env.REACT_APP_API_KEY!;

export const counterApi = createApi({
  reducerPath: 'counterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('x-api-key', API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCounterByName: builder.query<CounterList[], QueryParams>({
      query: (params) => `counter?userId=${params.name}&timestamp=${params.timestamp}`,
    }),
    getTotalTimeByName: builder.query<LogList[], QueryParams>({
      query: (params) => `log?userId=${params.name}&timestamp=${params.timestamp}`,
    }),
  }),
});

export const { useGetCounterByNameQuery, useGetTotalTimeByNameQuery } = counterApi;
