import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const EventsList = Loadable(lazy(() => import('./EventsList')));
const AddEvents = Loadable(lazy(() => import('./EventsAdd')));

const CategorysRoutes = [
 
  {
    path: '/events/list',
    element: <EventsList />,
  },
  {
    path: '/events/add',
    element: <AddEvents />,
  },
  {
    path: '/events/edit/:id',
    element: <AddEvents />,
  },
 
  
];

export default CategorysRoutes;
