import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCartContext, ShoppingCartProvider } from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import './App.css'
import { useContext } from 'react'

const AppRoutes = () => {
  const {
    userLogin
  } = useContext(ShoppingCartContext)

  if (userLogin === false) {
    
    let routes = useRoutes([
      { path: '/', element: <SignIn /> },
      { path: '/clothes', element: <SignIn /> },
      { path: '/electronics', element: <SignIn /> },
      { path: '/furnitures', element: <SignIn /> },
      { path: '/toys', element: <SignIn /> },
      { path: '/others', element: <SignIn /> },
      { path: '/my-account', element: <SignIn /> },
      { path: '/my-order', element: <SignIn /> },
      { path: '/my-orders', element: <SignIn /> },
      { path: '/my-orders/last', element: <SignIn /> },
      { path: '/my-orders/:id', element: <SignIn /> },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/*', element: <NotFound /> },
    ])
    return routes
  } 
  if (userLogin === true) {
    let routes = useRoutes([
      { path: '/', element: <Home /> },
      { path: '/clothes', element: <Home /> },
      { path: '/electronics', element: <Home /> },
      { path: '/furnitures', element: <Home /> },
      { path: '/toys', element: <Home /> },
      { path: '/others', element: <Home /> },
      { path: '/my-account', element: <MyAccount /> },
      { path: '/my-order', element: <MyOrder /> },
      { path: '/my-orders', element: <MyOrders /> },
      { path: '/my-orders/last', element: <MyOrder /> },
      { path: '/my-orders/:id', element: <MyOrder /> },
      { path: '/sign-in', element: <Home /> },
      { path: '/*', element: <NotFound /> },
    ])
    return routes
  }


}

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
