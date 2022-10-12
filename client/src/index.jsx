import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </Provider>
);


