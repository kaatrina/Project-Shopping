import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClothingStore } from "./store/Store.jsx";
import { Product } from "./store/Product.jsx";
import { Content } from "./content/Content.jsx";
import { Header } from "./header/Header.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Trash } from "./trash/Trash.jsx";

function Parent() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/store" element={<ClothingStore />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export { Parent };
