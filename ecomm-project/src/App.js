import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { IntlProvider } from "react-intl";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import AddProduct from "./pages/AddProduct/AddProduct";
import SignUp from "./pages/SignUp/SignUp";
import Product from "./components/Product/Product";
import PrivacyPolicy from "./pages/Policies/PrivacyPolicy";
import Refund from "./pages/Policies/Refund";
import Cookies from "./pages/Policies/Cookies";
import Terms from "./pages/Policies/Terms";
import NotFound from "./pages/404/404";
import { CartProvider } from "../src/components/Cart/CartContext";
import Cart from "./components/Cart/Cart";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LOCALES } from "./locales/locales";
import { messages } from "./locales/messages";

function App() {
  //locales
  const [currentLocale, setCurrentLocale] = useState(getInitialLocal());

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    });

    return () => unsubscribe();
  }, [auth]);

  const handleChange = (e) => {
    setCurrentLocale(e.target.value);
    // storing locale in the localstorage
    localStorage.setItem("locale", e.target.value);
  };

  function getInitialLocal() {
    // getting stored items
    const savedLocale = localStorage.getItem("locale");
    return savedLocale || LOCALES.ENGLISH;
  }

  return (
    <IntlProvider
      locale={currentLocale}
      messages={messages[currentLocale]}
      defaultLocale={LOCALES.ENGLISH}
    >
      <CartProvider>
        <Router>
          <div className="App">
            <Header currentLocale={currentLocale} handleChange={handleChange} />
            {loading ? (
              <div className="loader-container">
                <div className="wrapper">
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="shadow"></div>
                  <div className="shadow"></div>
                  <div className="shadow"></div>
                </div>
              </div>
            ) : (
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/products" element={<Product />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/refund-policy" element={<Refund />} />
                <Route path="/cookies-policy" element={<Cookies />} />
                <Route path="/terms-conditions" element={<Terms />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/addProduct/:id" element={<AddProduct />} />
                <Route
                  path="/cart"
                  element={<Cart currentUser={currentUser} />}
                />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            )}
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </IntlProvider>
  );
}

export default App;
