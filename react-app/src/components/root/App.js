import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import DashBoard from "./DashBoard";
import { Routes, Route } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import NotPage from "../common/NotPage";
import Home from "../home/Home";
import ProductList from "../products/ProductList";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
function App() {

  return (
    <>
      <Navi />
      <Container>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<CartDetail />} />
          <Route exact path="/products" element={<DashBoard />} />
          <Route exact path="/productList" element={<ProductList />} />
          <Route exact path="/saveproduct" element={<AddOrUpdateProduct />} />
          <Route exact path="/saveproduct/:productId" element={<AddOrUpdateProduct />} />
          <Route path="*" element={<NotPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
