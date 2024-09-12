import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntdApp, ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#010180',
            fontFamily: 'Inter',
          },
          components: {
            Menu: {
              darkItemBg: '#010180',
              darkItemColor: '#FFFFFF',
              // darkItemHoverBg: '#FFFFFF',
              // darkItemHoverColor: '#000000',
              darkItemSelectedBg: '#FFFFFF',
              darkItemSelectedColor: '#7CB9E8 !important',
            },
          },
        }}
      >
        <BrowserRouter>
          <AntdApp>
            <App />
          </AntdApp>
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
