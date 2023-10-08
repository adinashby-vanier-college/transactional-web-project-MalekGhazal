import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Product from "./components/Product/Product";
import PrivacyPolicy from "./pages/Policies/PrivacyPolicy";
import Refund from "./pages/Policies/Refund";
import Cookies from "./pages/Policies/Cookies";
import Terms from "./pages/Policies/Terms";
import NotFound from "./pages/404/404";
import { CartProvider } from "../src/components/Cart/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<Product />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<Refund />} />
            <Route path="/cookies-policy" element={<Cookies />} />
            <Route path="/terms-conditions" element={<Terms />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
