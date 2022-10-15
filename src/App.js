import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Main from './Layouts/Main';
import Shop from './components/Shop/Shop'
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import { productsAndCartLoader } from './Loaders/productsAndCartLoader';

function App() {

const router = createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children:[
      {
        path:'/',
        loader: () => fetch('products.json'),
        element: <Shop></Shop>
      },
      {
        path:'/shop',
        loader: () => fetch('products.json'),
        element: <Shop></Shop>
      },
      {
        path:'/orders',
        loader: productsAndCartLoader,
        element: <Orders></Orders>
      },
      {
        path:'/inventory',element:<Inventory></Inventory>
      },
      {
        path:'/about',
        element:<About></About>
      }
    ]
  },
 
]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
