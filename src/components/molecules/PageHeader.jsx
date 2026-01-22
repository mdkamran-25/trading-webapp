import React from "react";
import { Text } from "../atoms";
import { ArrowLeft } from "lucide-react";

/**
 * PageHeader Molecule Component
 * Header with back button, title, and optional action
 *
 * @component
 * @example
 * <PageHeader title="Orders" onBack={() => navigate(-1)} />
 * <PageHeader
 *   title="Profile"
 *   onBack={handleBack}
 *   action={<Button>Edit</Button>}
 * />
 */
const PageHeader = ({
  title,
  onBack,
  action,
  showBackButton = true,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm ${className}`}
      {...props}
    >
      <div className="flex items-center gap-4">
        {showBackButton && onBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Go back"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
        )}
        <Text variant="h3" weight="bold">
          {title}
        </Text>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;
