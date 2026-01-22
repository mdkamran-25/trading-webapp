import React, { useState, useMemo, useEffect, useRef } from "react";
import { Zap } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import pako from "pako";
import { API_BASE_URL2, BuyProduct, getUserInfo, SECRET_KEY } from "../../api";
import { PageHeader, Card, Text, Button, Badge, Input } from "../../components";

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
    <Card className="bg-white border border-gray-200 shadow-lg">
      <Text variant="sm" className="mb-1 text-gray-500">
        Price
      </Text>
      <Text variant="h2" className="mb-4 text-orange-500">
        ₹{newPrice.toFixed(2)}
      </Text>

      <div className="flex flex-col gap-4 pt-2 mb-6 border-t border-gray-200 md:flex-row">
        <div className="flex-1 pr-4">
          <Text variant="sm" className="mb-1 font-medium text-gray-500">
            Buy Share
          </Text>
          <div className="flex items-center gap-2">
            <Text variant="body" className="text-lg font-bold text-gray-800">
              {shareCount}
            </Text>
            <Badge variant="secondary">{minShare}</Badge>
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
          <Text variant="sm" className="text-gray-500">
            {product.cycleType === "hour" ? "Hourly Income" : "Daily Income"}
          </Text>
          <Text variant="h3" className="text-green-600">
            ₹{totalDailyIncome.toFixed(1)}
          </Text>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 mt-6 md:flex-row md:items-center">
        <div>
          <Text variant="body" className="text-gray-600">
            Total Income
          </Text>
          <Text variant="h2" className="text-gray-800">
            ₹{totalMoney}
          </Text>
        </div>
        <Button
          variant="primary"
          onClick={() => handleBuy(shareCount, product, newPrice)}
          className="w-full px-6 py-3 md:w-auto"
        >
          Buy Now
        </Button>
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
    </Card>
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
    <Card className="bg-white border-r-2 border-t-2 border-b-2 border-r-gray-200 border-t-gray-200 border-b-gray-200 shadow-lg border-l-4 border-l-orange-500">
      <Text variant="h2" className="mb-4 text-gray-800">
        Buy and upgrade vip1
      </Text>
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
    </Card>
  </div>
);

const DetailRow = ({ label, value, valueClassName = "text-gray-700" }) => (
  <div className="flex items-center justify-between text-base">
    <Text variant="body" className="text-gray-600">
      {label}
    </Text>
    <Text variant="body" className={valueClassName}>
      {value}
    </Text>
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
      {/* Header */}
      <PageHeader title="Buy Product" onBack={() => navigate(-1)}>
        <Text variant="sm" className="text-gray-600">
          Balance{" "}
          <Text
            as="span"
            variant="body"
            className="ml-1 font-bold text-gray-800"
          >
            {balance ?? 0}
          </Text>
        </Text>
      </PageHeader>

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

        <Card className="bg-white border border-gray-200 shadow-lg">
          <Text variant="h3" className="mb-3 text-gray-800">
            Explain
          </Text>
          <ol className="space-y-2 text-gray-700 list-decimal list-inside">
            {explanations.map((item, i) => (
              <li key={i} className="text-sm">
                {item}
              </li>
            ))}
          </ol>
        </Card>

        <div className="h-10"></div>
      </main>
    </div>
  );
}
