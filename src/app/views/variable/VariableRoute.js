import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const VariableList = Loadable(lazy(() => import('./VariableList')));
const AddVariable = Loadable(lazy(() => import('./VariableAdd')));

const CategorysRoutes = [
 
  {
    path: '/variable/list',
    element: <VariableList />,
  },
  {
    path: '/variable/add',
    element: <AddVariable />,
  },
  {
    path: '/variable/edit/:id',
    element: <AddVariable />,
  },
 
  
];

export default CategorysRoutes;
