import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'
import SingleProductScreen from './screens/SingleProductScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route
        path='/singleproduct/:productId'
        element={<SingleProductScreen />}
      />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
