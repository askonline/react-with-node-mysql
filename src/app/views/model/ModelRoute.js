import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const ModelList = Loadable(lazy(() => import('./ModelList')));
const ModelAdd = Loadable(lazy(() => import('./ModelAdd')));


const productsRoutes = [
  {
    path: '/model/list',
    element: <ModelList />,
  },
  {
    path: '/model/add',
    element: <ModelAdd />,
  },
  {
    path: '/model/edit/:id',
    element: <ModelAdd />,
  },
  
];

export default productsRoutes;
