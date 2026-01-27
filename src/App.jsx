import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages - Auth
import Splash from "./pages/auth/Splash";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ChangePassword from "./pages/auth/ChangePassword";
import TradePassword from "./pages/auth/TradePassword";
import Password from "./pages/auth/ForgotPassword";

// Account
import Account from "./pages/account/Account";
import Info from "./pages/account/Info";
import About from "./pages/account/About";

// Orders
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orders/OrderDetails";
import RechargeHistory from "./pages/orders/RechargeHistory";
import WithdrawalHistory from "./pages/orders/withdrawHistory";

// Invest
import Invest from "./pages/invest/Invest";
import InvestBuy from "./pages/invest/InvestBuy";
import VIP from "./pages/invest/VIP";
import ProductInfo from "./pages/invest/ProductInfo";

// Support
import HelpCenter from "./pages/support/HelpCenter";

// System
import HomePage from "./pages/system/Home";
import Recharge from "./pages/system/Recharge";
import Withdraw from "./pages/system/Withdraw";
import Teams from "./pages/system/Teams";
import Teamtwolevel from "./pages/system/Teamtwolevel";
import Bill from "./pages/system/Bill";
import Notice from "./pages/system/Notice";
import LuckyDraw from "./pages/system/LuckyDraw";
import Pay from "./pages/system/pay";

import { productGet } from "./api";
import "./App.css";
function App() {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productGet();

        if (!res.status === 200) return;

        const selectedItem = await res.json();
        setproducts(selectedItem.products);
      } catch (e) {}
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/RechargeHistory" element={<RechargeHistory />} />
        <Route path="/WithdrawHistory" element={<WithdrawalHistory />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teamonelevel" element={<Teamtwolevel />} />
        <Route path="/teamtwolevel" element={<Teamtwolevel />} />
        <Route path="/teamthreelevel" element={<Teamtwolevel />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/account" element={<Account />} />
        <Route path="/vip" element={<VIP />} />
        <Route path="/bankcard" element={<Withdraw />} />
        <Route path="/about" element={<About />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/bill" element={<Bill />} />

        <Route path="/notice" element={<Notice />} />
        <Route path="/helpcenter" element={<HelpCenter />} />
        <Route path="/info" element={<Info />} />
        <Route path="/tradepassword" element={<TradePassword />} />
        <Route path="/password" element={<Password />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />

        <Route path="/invest" element={<Invest products={products} />} />
        <Route path="/ProductInfo" element={<ProductInfo />} />
        <Route path="/luckydraw" element={<LuckyDraw />} />
        <Route path="/investbuy/:id" element={<InvestBuy />} />

        {/* Shared Order Details Page */}
        <Route path="/orderdetails" element={<OrderDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
