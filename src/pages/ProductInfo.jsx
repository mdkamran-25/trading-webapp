import React, { useState, useMemo, useEffect, useRef } from "react";
import { ChevronLeft, Zap } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import pako from "pako";
import { API_BASE_URL2, BuyProduct, getUserInfo, SECRET_KEY } from "../api";

const encryptedUser = Cookies.get("tredingWebUser");

// --- Sub-Components ---

// Popup-enabled Buy Card
const BuyCard = ({
  price,
  minShare,
  maxShare,
  dailyIncomePerShare,
  product,
  balance,
  user,
  isdailyClaim,
}) => {
  const isLocked = useRef(false);
  const navigate = useNavigate();
  const [shareCount, setShareCount] = useState(minShare);
  const [popup, setPopup] = useState({
    visible: false,
    success: false,
    message: "",
  });

  const totalIncome = product.cycleValue;
  const totalDailyIncome = shareCount * dailyIncomePerShare;
  const totalMoney = totalDailyIncome * totalIncome;
  const newPrice = price * shareCount;

  const handleBuy = async (shareCount, product, amount) => {
    if (amount > balance) {
      setPopup({
        visible: true,
        success: false,
        message: "❌ Insufficient balance.",
      });
      setTimeout(() => setPopup({ ...popup, visible: false }), 2500);
      return;
    }
    if (product.purchaseType === "One time buy" && shareCount > 1) {
      alert("Product is one time buy, quantity must be 1.");
      return;
    }
    if (isLocked.current) return;
    isLocked.current = true;

    try {
      const res = await BuyProduct({
        userId: user?._id,
        quantity: shareCount,
        product,
        TotalAmount: amount,
      });

      if (res.data.success) {
        setPopup({
          visible: true,
          success: true,
          message: "✅ Purchase successful!",
        });
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } else {
        setPopup({
          visible: true,
          success: false,
          message: res.data.message || "❌ Purchase failed!",
        });
      }
    } catch (err) {
      console.log(err.response.data.message);
      setPopup({
        visible: true,
        success: false,
        message: `❌ ${err.response.data.message ?? "Internal Error"}`,
      });
    } finally {
      setTimeout(() => {
        isLocked.current = false;
      }, 1000);
      setTimeout(() => setPopup({ ...popup, visible: false }), 2500);
    }
  };

  return (
    <div className="p-5 bg-white border border-gray-200 shadow-lg rounded-2xl">
      <h3 className="mb-1 text-sm font-medium text-gray-500">Price</h3>
      <p className="mb-4 text-3xl font-bold text-orange-500">
        ₹{newPrice.toFixed(2)}
      </p>

      <div className="flex flex-col gap-4 pt-2 mb-6 border-t border-gray-200 md:flex-row">
        <div className="flex-1 pr-4">
          <label className="block mb-1 text-sm font-medium text-gray-500">
            Buy Share
          </label>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-800">
              {shareCount}
            </span>
            <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-orange-500 rounded">
              {minShare}
            </span>
          </div>
          <input
            type="range"
            min={minShare}
            max={maxShare}
            value={shareCount}
            onChange={(e) => setShareCount(parseInt(e.target.value))}
            className="w-full h-1 my-2 bg-orange-100 rounded-lg cursor-pointer"
            style={{ accentColor: "#f97316" }}
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>MIN {minShare}</span>
            <span>MAX {maxShare}</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">
            {product.cycleType === "hour" ? "Hourly Income" : "Daily Income"}
          </p>
          <p className="text-xl font-bold text-green-600">
            ₹{totalDailyIncome.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 mt-6 md:flex-row md:items-center">
        <p className="text-lg font-medium text-gray-600">
          Total Income{" "}
          <span className="block text-2xl font-bold text-gray-800 md:inline">
            ₹{totalMoney}
          </span>
        </p>
        <button
          onClick={() => handleBuy(shareCount, product, newPrice)}
          className="w-full px-6 py-3 font-bold text-white transition-colors bg-orange-500 shadow-lg md:w-auto rounded-xl hover:bg-orange-600"
        >
          Buy Now
        </button>
      </div>

      {popup.visible && (
        <div
          className={`fixed top-1/4 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl font-semibold text-center shadow-lg animate-fadeInOut z-50 ${
            popup.success
              ? "bg-green-400 text-green-900"
              : "bg-red-300 text-red-900"
          }`}
        >
          {popup.message}
        </div>
      )}
    </div>
  );
};

// Detailed Info Cards
const DetailCards = ({
  price,
  duration,
  dailyIncome,
  totalIncome,
  needLevel,
  product,
  isdailyClaim,
}) => (
  <div className="space-y-6">
    <div className="p-5 bg-white border border-gray-200 shadow-lg rounded-2xl">
      <h2 className="pl-3 mb-4 text-xl font-bold text-gray-800 border-l-4 border-orange-500">
        Buy and upgrade vip1
      </h2>
      <div className="space-y-3 text-gray-700">
        <DetailRow
          label="Is Daily Claim Product"
          value={isdailyClaim}
          valueClassName="text-green-600 font-bold"
        />
        <DetailRow
          label="Price"
          value={`₹${price.toFixed(2)}`}
          valueClassName="text-orange-500 font-bold"
        />
        <DetailRow
          label="Revenue Duration"
          value={`${duration} Days`}
          valueClassName="text-green-600 font-bold"
        />
        <DetailRow
          label="Daily Income"
          value={`₹${dailyIncome.toFixed(1)}`}
          valueClassName="text-green-600 font-bold"
        />
        <DetailRow
          label="Need Level"
          value={
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 mr-1 text-gray-500" />
              {needLevel}
            </div>
          }
        />
        <DetailRow
          label="Total Income"
          value={`₹${totalIncome.toFixed(1)}`}
          valueClassName="text-gray-800 font-bold text-lg"
        />
      </div>
    </div>
  </div>
);

const DetailRow = ({ label, value, valueClassName = "text-gray-700" }) => (
  <div className="flex items-center justify-between text-base">
    <span className="text-gray-600">{label}</span>
    <span className={valueClassName}>{value}</span>
  </div>
);

// Main Component
export default function ProductInfo() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state;
  const [explanations, setExplanations] = useState([]);
  const [balance, setbalance] = useState(0);
  const [user, setuser] = useState({});
  const dailyIncome =
    product.cycleType === "hour" ? product.hour : product.daily;
  const PRODUCT_MOCK_DATA = {
    price: product.price,
    minShare: 1,
    maxShare: 10,
    dailyIncomePerShare: dailyIncome,
    revenueDurationDays: product.cycleValue,
    productImageUrl: `${API_BASE_URL2}${product.imageUrl}`,
    needLevel: "VIP",
  };

  const totalIncome = useMemo(
    () =>
      PRODUCT_MOCK_DATA.dailyIncomePerShare *
      PRODUCT_MOCK_DATA.revenueDurationDays,
    [],
  );

  const getUserData = async () => {
    if (encryptedUser) {
      const base64 = encryptedUser.replace(/-/g, "+").replace(/_/g, "/");

      // 🔹 3. AES decrypt (gives compressed Base64 string)
      const decryptedBase64 = CryptoJS.AES.decrypt(base64, SECRET_KEY).toString(
        CryptoJS.enc.Utf8,
      );
      if (!decryptedBase64) return null;

      // 🔹 4. Convert Base64 → Uint8Array (binary bytes)
      const binaryString = atob(decryptedBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // 🔹 5. Decompress (restore JSON string)
      const decompressed = pako.inflate(bytes, { to: "string" });
      const data = await JSON.parse(decompressed);
      setuser(data);
      if (data?._id) {
        const res = await getUserInfo(data._id);

        setbalance(res?.data?.users?.balance);
      } else {
        navigate("/login");
      }
    }
  };
  const fetchExplanations = async () => {
    if (product?.productExplanation)
      setExplanations(product.productExplanation);
  };
  useEffect(() => {
    getUserData();
    fetchExplanations();
  }, []);

  return (
    <div className="w-full max-w-md min-h-screen mx-auto overflow-y-auto font-sans bg-gray-50">
      <header className="sticky top-0 z-10 w-full bg-white shadow-md">
        <div className="flex items-center justify-between p-4 mx-auto">
          <ChevronLeft
            className="w-6 h-6 text-gray-800 transition cursor-pointer hover:text-gray-600"
            onClick={() => navigate(-1)}
          />
          <h1 className="flex-1 text-xl font-semibold text-center text-gray-800">
            Buy Product
          </h1>
          <span className="text-sm text-gray-600">
            Balance{" "}
            <h3 className="inline ml-1 font-bold text-gray-800">
              {balance ?? 0}
            </h3>
          </span>
        </div>
      </header>

      <main className="p-4 mx-auto">
        <div className="p-2 mb-6 bg-white shadow-2xl rounded-2xl">
          <img
            src={PRODUCT_MOCK_DATA.productImageUrl}
            alt="item"
            className="object-cover w-full h-auto rounded-xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/300x300/e0f2ff/0369a1?text=Image+Not+Available";
            }}
          />
        </div>

        <div className="mb-6">
          <BuyCard
            price={PRODUCT_MOCK_DATA.price}
            minShare={PRODUCT_MOCK_DATA.minShare}
            maxShare={PRODUCT_MOCK_DATA.maxShare}
            dailyIncomePerShare={PRODUCT_MOCK_DATA.dailyIncomePerShare}
            product={product}
            balance={balance}
            user={user}
            isdailyClaim={product.isdailyClaim}
          />
        </div>

        <DetailCards
          price={PRODUCT_MOCK_DATA.price}
          duration={PRODUCT_MOCK_DATA.revenueDurationDays}
          dailyIncome={PRODUCT_MOCK_DATA.dailyIncomePerShare}
          totalIncome={totalIncome}
          needLevel={PRODUCT_MOCK_DATA.needLevel}
          product={product}
          isdailyClaim={product.isdailyClaim === true ? "Yes" : "No"}
        />

        <div className="p-5 bg-white border border-gray-200 shadow-lg rounded-2xl">
          <h3 className="mb-3 text-lg font-bold text-gray-800">Explain</h3>
          <ol className="space-y-2 text-gray-700 list-decimal list-inside">
            {explanations.map((item, i) => (
              <li key={i} className="text-sm">
                {item}
              </li>
            ))}
          </ol>
        </div>

        <div className="h-10"></div>
      </main>
    </div>
  );
}
