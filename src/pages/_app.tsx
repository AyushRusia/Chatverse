import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import Head from 'next/head';

import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
function MyApp({ Component, pageProps }: AppProps) {
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: twentyFourHoursInMs,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Chatverse</title>
            <meta name='description' content='Generated by create next app' />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
