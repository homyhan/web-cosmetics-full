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
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfile, getUserByEmail, login } from './feature/auth/thunk';
import ProductDetail from './feature/booking/ProductDetail';
import ProfileUser from './feature/booking/ProfileUser';
import DetailOrder from './feature/booking/DetailOrder';
import Role from './feature/admin/Role';
import FormAddRole from './feature/admin/FormAddRole';
import FormEditRole from './feature/admin/FormEditRole';
import Checkout from './feature/booking/Checkout';
import OrdersAdmin from './feature/admin/OrdersAdmin';
import DetailOrderAdmin from './feature/admin/DetailOrderAdmin';

function App() {
 
    const dispatch = useDispatch();    
    const [password, setPassword] = useState('');
    const [email, setEmail]= useState('');
      
    const fetchUser = async(email)=>{
      if(email){
        const res = await dispatch(getUserByEmail(email));
        return res?.data;
      }
      return null
    }

  const getPass =async()=>{
    const email=localStorage?.getItem("emailCosmetics");
    const user = await fetchUser(email);
    const pass = user?.password;
    setPassword(pass);
    setEmail(email);
  }

  useEffect(()=>{
   getPass();
   if(email){
     dispatch(fetchProfile({email, password}));
   }
 },[dispatch, password])

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RouterComponent Component={Home}></RouterComponent>}></Route>
        <Route path='/admin' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={HomeAdmin}></RouterComponent>}></Route>
        <Route path='/admin/category' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={CategoryAdmin}></RouterComponent>}></Route>
        <Route path='/admin/add-category' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={FormCategory}></RouterComponent>}></Route>
        <Route path='/admin/add-product' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={FormAddProduct}></RouterComponent>}></Route>
        <Route path='/admin/edit-category/:id' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={EditCateAdmin}></RouterComponent>}></Route>
        <Route path='/admin/edit-product/:id' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={FormEditProduct}></RouterComponent>}></Route>
        <Route path='/admin/banner' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={BannerAdmin}></RouterComponent>}></Route>
        <Route path='/admin/edit-banner/:id' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={EditBannerAdmin}></RouterComponent>}></Route>
        <Route path='/admin/add-banner' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={NewBannerAdmin}></RouterComponent>}></Route>
        <Route path='/login' element={<RouterComponent Component={Login}></RouterComponent>}></Route>
        <Route path='/admin/user' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={DisplayUserAdmin}></RouterComponent>}></Route>
        <Route path='/admin/edit-status/:id' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={EditStatusUserAdmin}></RouterComponent>}></Route>
        <Route path='/admin/edit-info-user/:id' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={EditInfoUserAdmin}></RouterComponent>}></Route>
        <Route path='/admin/add-user' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={NewUserForAdmin}></RouterComponent>}></Route>
        <Route path='/cart' element={<RouterComponent Component={Cart}></RouterComponent>}></Route>
        <Route path='/product-detail/:id' element={<RouterComponent Component={ProductDetail}></RouterComponent>}></Route>
        <Route path='/user/profile' element={<RouterComponent Component={ProfileUser}></RouterComponent>}></Route>
        <Route path='/user/detail-order/:id' element={<RouterComponent Component={DetailOrder}></RouterComponent>}></Route>
        <Route path='/admin/role' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={Role}></RouterComponent>}></Route>
        <Route path='/admin/add-role' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={FormAddRole}></RouterComponent>}></Route>
        <Route path='/admin/edit-role/:id' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={FormEditRole}></RouterComponent>}></Route>
        <Route path='/user/checkout/:id' element={<RouterComponent Component={Checkout}></RouterComponent>}></Route>
        <Route path='/admin/orders' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={OrdersAdmin}></RouterComponent>}></Route>
        <Route path='/admin/order-detail/:orderId' element={<RouterComponent isAdmin={true} redirectPath="/login" Component={DetailOrderAdmin}></RouterComponent>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
