import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './store/store';
import { store } from './store/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import Layout from './components/Layout.jsx';

// import { ApiProvider } from '@reduxjs/toolkit/dist/query/react/ApiProvider.js';
// import { apiSlice } from './features/api/apiSlice.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApiProvider api={apiSlice}> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <ChakraProvider>
        <RouterProvider router={router}>
          <Layout />
        </RouterProvider>
      </ChakraProvider>
      {/* </PersistGate> */}
      {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>
);
