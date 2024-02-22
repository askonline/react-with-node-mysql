import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const CategoryList = Loadable(lazy(() => import('./CategoryList')));
const AddCategory = Loadable(lazy(() => import('./CategoryAdd')));
const AddSubCategory = Loadable(lazy(() =>import('./AddSubCategory')));
const SubCategoryList = Loadable(lazy(() =>import('./SubCategoryList')));

const CategorysRoutes = [
 
  {
    path: '/category/list',
    element: <CategoryList />,
  },
  {
    path: '/category/add',
    element: <AddCategory />,
  },
  {
    path: '/category/edit/:id',
    element: <AddCategory />,
  },
  {
    path: '/subcategory/list',
    element: <SubCategoryList />,
  },

  {
    path: '/subcategory/add',
    element: <AddSubCategory />,
  },
  {
    path: '/subcategory/edit/:id',
    element: <AddSubCategory />,
  },
  
];

export default CategorysRoutes;
