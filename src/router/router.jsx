import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import App from '../App';
import About from '../pages/About';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'todos',
        element: <App />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);
