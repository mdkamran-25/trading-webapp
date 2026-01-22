import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Text, PageHeader } from "../components";

const AboutPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "About Realstate Property Investment",
      content: (
        <>
          <Text variant="body" className="mb-3">
            Realstate Property Investment is India's largest online marketplace
            for all types of properties — from residential and commercial spaces
            to large buildings and even shares in factories. Headquartered in
            Mumbai, our platform offers attractive prices and reliable
            investment options across India.
          </Text>
          <Text variant="body">
            In less than three years, Realstate Property Investment has helped
            over 100,000 individuals own profitable properties at prices many
            times higher than their share value.
          </Text>
        </>
      ),
    },
    {
      title: "Our Mission",
      content: (
        <Text variant="body">
          To make buying and selling properties effortless by providing a
          secure, transparent, and nationwide property investment platform. We
          aim to empower investors to access legitimate, verified property
          opportunities through a simple and trusted system.
        </Text>
      ),
    },
    {
      title: "Our Vision",
      content: (
        <>
          <Text variant="body" className="mb-3">
            To become India's most trusted and comprehensive marketplace for
            real estate investments, uniting the unorganized market of
            non-performing and distressed assets under one digital roof.
          </Text>
          <Text variant="h4" weight="semibold" className="mt-4 mb-2">
            Core Values
          </Text>
          <Text variant="body">
            Transparency, trust, growth, and customer-first approach drive
            everything we do — ensuring fair deals, verified listings, and
            secure transactions.
          </Text>
        </>
      ),
    },
    {
      title: "Our Network",
      content: (
        <>
          <Text variant="body" className="mb-4">
            Our extensive property network spans cities across India, enabling
            you to choose properties by city or by auctioning banks. Whether
            you're buying or selling, Realstate Property Investment ensures
            seamless, verified, and profitable transactions.
          </Text>
          <img
            src="/logo.jpg"
            alt="Logo"
            className="object-cover w-1/5 rounded-lg shadow-md"
          />
        </>
      ),
    },
    {
      title: "Founded",
      content: (
        <>
          <Text variant="body" className="mb-3">
            Realstate Property Investment was founded in 2022.
          </Text>
          <Text variant="body">
            To buy or sell properties, please visit the Invest page. Thank you
            for trusting us!
          </Text>
        </>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen p-4 bg-gradient-to-r from-amber-100 to-yellow-300">
      <PageHeader
        title="About Us"
        onBack={() => navigate(-1)}
        showBackButton={true}
      />

      {/* Content Area */}
      <div className="w-full max-w-4xl pb-8 mx-auto mt-6">
        {sections.map((section, index) => (
          <Card
            key={index}
            variant="default"
            padding="lg"
            className="mb-6 transition-shadow shadow-lg hover:shadow-xl"
          >
            <Text
              variant="h3"
              weight="bold"
              color="primary"
              className="mb-3 text-orange-700"
            >
              {section.title}
            </Text>
            <div className="space-y-4 text-gray-700">{section.content}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
