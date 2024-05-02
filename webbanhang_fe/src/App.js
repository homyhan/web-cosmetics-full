import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RouterComponent from './HOCs/RouterComponent';
import Home from './feature/booking/Home';
import HomeAdmin from './feature/admin/HomeAdmin';
import CategoryAdmin from './feature/admin/CategoryAdmin';
import FormCategory from './feature/admin/FormCategory';
import EditCateAdmin from './feature/admin/EditCateAdmin';
import FormAddProduct from './feature/admin/FormAddProduct';
import FormEditProduct from './feature/admin/FormEditProduct';

function App() {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
