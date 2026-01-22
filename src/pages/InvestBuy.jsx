import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InvestBuy = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const product = location.state;

  const [shares, setShares] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const priceValue = parseFloat(product.price.replace(/[^0-9.]/g, ""));
  const totalMoney = priceValue * shares;

  const increaseShares = () => {
    if (shares < 10) setShares(shares + 1);
  };

  const decreaseShares = () => {
    if (shares > 1) setShares(shares - 1);
  };

  return (
    <div className="w-full max-w-md mx-auto font-sans min-h-screen bg-gradient-to-b from-yellow-400 to-yellow-100 p-2.5">
      {/* Header */}
      <header className="flex items-center justify-between p-3 mb-4 font-semibold bg-yellow-300 rounded-2xl">
        <button
          className="text-2xl border-none cursor-pointer bg-none"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <h2 className="text-lg font-bold">My Products</h2>
        <div className="w-8"></div>
      </header>

      {/* Product Image */}
      <div className="flex justify-center my-5">
        <img
          src={product.img}
          alt={product.id}
          className="w-56 h-auto shadow-lg rounded-2xl"
        />
      </div>

      {/* Price Details */}
      <div className="bg-yellow-50 p-4.5 rounded-3xl mb-4.5 shadow-md text-sm">
        <p className="my-2">
          Price ={" "}
          <span className="font-semibold text-amber-600">{product.price}</span>
        </p>
        <p className="my-2">
          Buy Share ={" "}
          <span className="font-semibold text-amber-600">{shares}</span>
        </p>
        <p className="my-2">
          Daily Income ={" "}
          <span className="font-semibold text-amber-600">{product.daily}</span>
        </p>

        <div className="flex items-center justify-around my-3">
          <span className="text-xs">Min</span>
          <button
            className="bg-white border border-amber-600 rounded-full py-1.5 px-3.5 text-xl font-bold cursor-pointer text-amber-600 hover:bg-amber-600 hover:text-white transition-colors"
            onClick={decreaseShares}
          >
            -
          </button>
          <span className="font-semibold text-amber-600">{shares}</span>
          <button
            className="bg-white border border-amber-600 rounded-full py-1.5 px-3.5 text-xl font-bold cursor-pointer text-amber-600 hover:bg-amber-600 hover:text-white transition-colors"
            onClick={increaseShares}
          >
            +
          </button>
          <span className="text-xs">Max</span>
        </div>

        <p className="my-2">
          Total Money ={" "}
          <span className="font-semibold text-amber-600">₹{totalMoney}</span>
        </p>
        <button className="w-full py-3 mt-3 text-base font-semibold text-white transition-colors bg-orange-500 border-none rounded-full cursor-pointer hover:bg-orange-600">
          Buy Now
        </button>
      </div>

      {/* Welfare Section */}
      <div className="p-4 mb-4 text-sm border border-yellow-300 shadow-md bg-yellow-50 rounded-3xl">
        <h3 className="mb-2 text-base font-semibold text-gray-800">
          {product.id} Welfare
        </h3>
        <p className="flex justify-between my-1.5">
          <span>Price</span>{" "}
          <span className="font-semibold">{product.price}</span>
        </p>
        <p className="flex justify-between my-1.5">
          <span>Revenue Duration</span>{" "}
          <span className="font-semibold">{product.revenue}</span>
        </p>
        <p className="flex justify-between my-1.5">
          <span>Daily Income</span>{" "}
          <span className="font-semibold">{product.daily}</span>
        </p>
        <p className="flex justify-between my-1.5">
          <span>Need Level</span> <span className="font-semibold">VIP1</span>
        </p>
        <p className="flex justify-between my-1.5">
          <span>Total Income</span>{" "}
          <span className="font-semibold">{product.total}</span>
        </p>
      </div>

      {/* Daily Fund Section */}
      <div className="p-4 text-sm border border-yellow-300 shadow-md bg-yellow-50 rounded-3xl">
        <h3 className="mb-2 text-base font-semibold text-gray-800">
          Daily Fund
        </h3>
        <p className="my-1.5">
          The investment amount of this product is as low as{" "}
          <span className="font-semibold">{product.price}</span>
        </p>
        <p className="my-1.5">
          Period = <span className="font-semibold">{product.revenue}</span>
        </p>
        <p className="my-1.5">
          Total Income Obtained ={" "}
          <span className="font-semibold">{product.total}</span>
        </p>
      </div>
    </div>
  );
};

export default InvestBuy;
