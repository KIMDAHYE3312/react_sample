import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/products/Main';
import Meal from './pages/products/Meal';
import Login from './pages/member/Login';
import Dessert from './pages/products/Dessert';
import Beverage from './pages/products/Beverage';
import Register from './pages/member/Register';
import ProductDetail from './pages/products/ProductDetail';
import Error from './pages/Error';
import Review from './pages/products/Review';
import ReviewDetail from './pages/products/ReviewDetail';
import MyPageLayout from './layouts/MyPageLayout';
import Payment from './pages/member/Payment';
import Profile from './pages/member/Profile';
import Purchase from './pages/purchase/Purchase';
import ProductManagement from './pages/admin/ProductManagement';
import ProductRegistration from './pages/admin/ProductRegistration';
import ProductUpdate from './pages/admin/ProductUpdate';
import Search from './pages/products/Search';


function App() {

  return (
    <BrowserRouter>

      <Routes>

      <Route path="/" element={ <Layout/> }>
          <Route index element={ <Main/> }/>          
          <Route path="search" element={ <Search /> }/>
          <Route path="product/meal" element={ <Meal/> }/>
          <Route path="product/dessert" element={ <Dessert/> }/>
          <Route path="product/beverage" element={ <Beverage/> }/>
          <Route path="product/:productCode" element={<ProductDetail />} />
          <Route path="purchase" element={ <Purchase/> } />
          <Route path="mypage" element={ <MyPageLayout/> } >
            <Route path="payment" element={ <Payment /> } />
            <Route path="profile" element={ <Profile /> } />
          </Route>
          <Route path="review/:productCode" element={ <Review /> } />  
          <Route path="reviewDetail/:reviewCode" element={ <ReviewDetail /> } /> 
          <Route path="product-management" element={ <ProductManagement/> } />
          <Route path="product-registration" element={ <ProductRegistration/> } />
          <Route path="product-update/:productCode" element={ <ProductUpdate/> } />
        </Route>


        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="*" element={ <Error/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
