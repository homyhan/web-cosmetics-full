import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, json } from 'react-router-dom';
import RouterComponent from './HOCs/RouterComponent';
import Home from './feature/booking/Home';
import HomeAdmin from './feature/admin/HomeAdmin';
import CategoryAdmin from './feature/admin/CategoryAdmin';
import FormCategory from './feature/admin/FormCategory';
import EditCateAdmin from './feature/admin/EditCateAdmin';
import FormAddProduct from './feature/admin/FormAddProduct';
import FormEditProduct from './feature/admin/FormEditProduct';
import BannerAdmin from './feature/admin/BannerAdmin';
import EditBannerAdmin from './feature/admin/EditBannerAdmin';
import NewBannerAdmin from './feature/admin/NewBannerAdmin';
import Login from './feature/auth/Login';
import DisplayUserAdmin from './feature/admin/DisplayUserAdmin';
import EditStatusUserAdmin from './feature/admin/EditStatusUserAdmin';
import EditInfoUserAdmin from './feature/admin/EditInfoUserAdmin';
import NewUserForAdmin from './feature/admin/NewUserForAdmin';
import Cart from './feature/booking/Cart';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './feature/auth/thunk';
import ProductDetail from './feature/booking/ProductDetail';
import ProfileUser from './feature/booking/ProfileUser';
import DetailOrder from './feature/booking/DetailOrder';

function App() {
 
    const dispatch = useDispatch();
  useEffect(()=>{
     const email=localStorage?.getItem("emailCosmetics");
    const password=localStorage?.getItem("passcosmetics");
    if(email&&password){
      dispatch(login({email, password}))
    }

  },[dispatch])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RouterComponent Component={Home}></RouterComponent>}></Route>
        <Route path='/admin' element={<RouterComponent Component={HomeAdmin}></RouterComponent>}></Route>
        <Route path='/admin/category' element={<RouterComponent Component={CategoryAdmin}></RouterComponent>}></Route>
        <Route path='/admin/add-category' element={<RouterComponent Component={FormCategory}></RouterComponent>}></Route>
        <Route path='/admin/add-product' element={<RouterComponent Component={FormAddProduct}></RouterComponent>}></Route>
        <Route path='/admin/edit-category/:id' element={<RouterComponent Component={EditCateAdmin}></RouterComponent>}></Route>
        <Route path='/admin/edit-product/:id' element={<RouterComponent Component={FormEditProduct}></RouterComponent>}></Route>
        <Route path='/admin/banner' element={<RouterComponent Component={BannerAdmin}></RouterComponent>}></Route>
        <Route path='/admin/edit-banner/:id' element={<RouterComponent Component={EditBannerAdmin}></RouterComponent>}></Route>
        <Route path='/admin/add-banner' element={<RouterComponent Component={NewBannerAdmin}></RouterComponent>}></Route>
        <Route path='/login' element={<RouterComponent Component={Login}></RouterComponent>}></Route>
        <Route path='/admin/user' element={<RouterComponent Component={DisplayUserAdmin}></RouterComponent>}></Route>
        <Route path='/admin/edit-status/:id' element={<RouterComponent Component={EditStatusUserAdmin}></RouterComponent>}></Route>
        <Route path='/admin/edit-info-user/:id' element={<RouterComponent Component={EditInfoUserAdmin}></RouterComponent>}></Route>
        <Route path='/admin/add-user' element={<RouterComponent Component={NewUserForAdmin}></RouterComponent>}></Route>
        <Route path='/cart' element={<RouterComponent Component={Cart}></RouterComponent>}></Route>
        <Route path='/product-detail/:id' element={<RouterComponent Component={ProductDetail}></RouterComponent>}></Route>
        <Route path='/user/profile' element={<RouterComponent Component={ProfileUser}></RouterComponent>}></Route>
        <Route path='/user/detail-order/:id' element={<RouterComponent Component={DetailOrder}></RouterComponent>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
