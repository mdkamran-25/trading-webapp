import React, { useState } from "react";
import {
  Button,
  Card,
  Text,
  FormField,
  MetricRow,
  StatCard,
  PageHeader,
  BottomNavigation,
  FormCard,
} from "@/components";
import {
  Home,
  Wallet,
  Settings,
  TrendingUp,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

/**
 * Example: LoginPage refactored with Atomic Components
 *
 * This demonstrates how to use the new atomic design components
 * instead of writing inline Tailwind classes everywhere.
 *
 * Before: Inline JSX + CSS classNames
 * After: Reusable atomic components + composition
 */
const LoginPageExample = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (formData) => {
    setLoading(true);
    console.log("Form data:", formData);
    // Handle login logic here
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <FormCard
        title="Welcome Back"
        description="Sign in to your account to continue"
        fields={[
          {
            name: "email",
            label: "Email Address",
            type: "email",
            placeholder: "Enter your email",
            required: true,
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
            required: true,
          },
        ]}
        submitLabel="Sign In"
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

/**
 * Example: DashboardPage refactored with Atomic Components
 *
 * Uses multiple component types:
 * - Atoms: Text, Button, Card
 * - Molecules: PageHeader, StatCard, MetricRow
 * - Organisms: BottomNavigation
 */
const DashboardPageExample = () => {
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "wallet", icon: Wallet, label: "Wallet", badge: 3 },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <PageHeader
        title="Dashboard"
        showBackButton={false}
        action={<Button size="sm">Profile</Button>}
        className="mb-4"
      />

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Balance Card */}
        <Card variant="gradient">
          <Text variant="h3" weight="bold" className="mb-2">
            Your Balance
          </Text>
          <Text variant="h1" weight="bold" color="primary" className="mb-4">
            ₹5,000.00
          </Text>
          <Button fullWidth>Add Money</Button>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={TrendingUp}
            label="Total Buy"
            value="₹50,000"
            variant="orange"
          />
          <StatCard
            icon={DollarSign}
            label="Earnings"
            value="₹5,000"
            variant="green"
          />
        </div>

        {/* Financial Summary */}
        <Card>
          <Text variant="h4" weight="bold" className="mb-4">
            Financial Summary
          </Text>
          <div className="space-y-0">
            <MetricRow
              label="Pending Income"
              value="₹1,000"
              icon={DollarSign}
            />
            <MetricRow
              label="Total Orders"
              value="15"
              icon={ShoppingCart}
              border={false}
            />
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button variant="primary" fullWidth>
            Invest Now
          </Button>
          <Button variant="secondary" fullWidth>
            View History
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        items={navItems}
        activeId={activeTab}
        onItemClick={(id) => setActiveTab(id)}
      />
    </div>
  );
};

/**
 * Example: FormPage refactored with Atomic Components
 */
const FormPageExample = () => {
  const handleSubmit = (formData) => {
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <PageHeader
        title="Deposit Money"
        onBack={() => window.history.back()}
        className="mb-6"
      />

      <FormCard
        title="Enter Amount"
        description="Choose an amount to add to your wallet"
        fields={[
          {
            name: "amount",
            label: "Amount",
            type: "number",
            placeholder: "₹ 0.00",
            required: true,
          },
          {
            name: "method",
            label: "Payment Method",
            type: "text",
            placeholder: "Select method",
            required: true,
          },
        ]}
        submitLabel="Proceed to Payment"
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export { LoginPageExample, DashboardPageExample, FormPageExample };
