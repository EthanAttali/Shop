import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../Components/Home/Home';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';
import NavBar from '../Components/NavBar';
import style from './style.module.scss';
import classnames from 'classnames';
import About from '../Components/About';
import Contact from '../Components/Contact';
import Settings from '../Components/Settings';
import ProductDetail from '../Components/ProductDetail';

const Layout = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/signin' || location.pathname === '/signup'

  return(
    <div className={classnames(!hideNavBar ? style.fullScreen : style.hideNavBar)}>
      {!hideNavBar && <NavBar />}
      <Outlet />
    </div>
  )
}

const MainRouter = () => {
  return (
    <BrowserRouter>
    {/* <Layout> */}
      <Routes>
        <Route path={"/"} element={<Navigate to="/signin" replace={true}/>} />
        <Route element={<Layout />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Home />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path="/about" element={<About/>} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
      </Routes>
    {/* </Layout> */}
    </BrowserRouter>
  );
}
export default MainRouter;