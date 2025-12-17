import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductsDetails.jsx";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
