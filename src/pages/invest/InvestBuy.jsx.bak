import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageHeader, Card, Text, Button } from "../../components";

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
      <PageHeader title="My Products" onBack={() => navigate(-1)} />

      {/* Product Image */}
      <div className="flex justify-center my-5">
        <img
          src={product.img}
          alt={product.id}
          className="w-56 h-auto shadow-lg rounded-2xl"
        />
      </div>

      {/* Price Details */}
      <Card className="mb-4.5 text-sm">
        <Text variant="body" className="my-2">
          Price ={" "}
          <span className="font-semibold text-amber-600">{product.price}</span>
        </Text>
        <Text variant="body" className="my-2">
          Buy Share ={" "}
          <span className="font-semibold text-amber-600">{shares}</span>
        </Text>
        <Text variant="body" className="my-2">
          Daily Income ={" "}
          <span className="font-semibold text-amber-600">{product.daily}</span>
        </Text>

        <div className="flex items-center justify-around my-3">
          <span className="text-xs">Min</span>
          <Button
            variant="secondary"
            onClick={decreaseShares}
            className="rounded-full py-1.5 px-3.5 text-xl"
          >
            -
          </Button>
          <span className="font-semibold text-amber-600">{shares}</span>
          <Button
            variant="secondary"
            onClick={increaseShares}
            className="rounded-full py-1.5 px-3.5 text-xl"
          >
            +
          </Button>
          <span className="text-xs">Max</span>
        </div>

        <Text variant="body" className="my-2">
          Total Money ={" "}
          <span className="font-semibold text-amber-600">₹{totalMoney}</span>
        </Text>
        <Button variant="primary" className="w-full mt-3">
          Buy Now
        </Button>
      </Card>

      {/* Welfare Section */}
      <Card className="mb-4 text-sm">
        <Text variant="h3" className="mb-2 text-gray-800">
          {product.id} Welfare
        </Text>
        <div className="flex justify-between my-1.5">
          <span>Price</span>
          <Text variant="sm" className="font-semibold">
            {product.price}
          </Text>
        </div>
        <div className="flex justify-between my-1.5">
          <span>Revenue Duration</span>
          <Text variant="sm" className="font-semibold">
            {product.revenue}
          </Text>
        </div>
        <div className="flex justify-between my-1.5">
          <span>Daily Income</span>
          <Text variant="sm" className="font-semibold">
            {product.daily}
          </Text>
        </div>
        <div className="flex justify-between my-1.5">
          <span>Need Level</span>
          <Text variant="sm" className="font-semibold">
            VIP1
          </Text>
        </div>
        <div className="flex justify-between my-1.5">
          <span>Total Income</span>
          <Text variant="sm" className="font-semibold">
            {product.total}
          </Text>
        </div>
      </Card>

      {/* Daily Fund Section */}
      <Card className="text-sm">
        <Text variant="h3" className="mb-2 text-gray-800">
          Daily Fund
        </Text>
        <Text variant="sm" className="my-1.5">
          The investment amount of this product is as low as{" "}
          <span className="font-semibold">{product.price}</span>
        </Text>
        <Text variant="sm" className="my-1.5">
          Period = <span className="font-semibold">{product.revenue}</span>
        </Text>
        <Text variant="sm" className="my-1.5">
          Total Income Obtained ={" "}
          <span className="font-semibold">{product.total}</span>
        </Text>
      </Card>
    </div>
  );
};

export default InvestBuy;
