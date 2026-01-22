import React from "react";
import { Card, Text, Button } from "../atoms";
import { InfoRow } from "../molecules";

/**
 * ProfileCard Organism Component
 * Displays user profile information with edit capability
 *
 * @component
 * @example
 * <ProfileCard
 *   userId="12345"
 *   userInfo={{
 *     username: 'John Doe',
 *     email: 'john@example.com',
 *     phone: '+91 98765 43210'
 *   }}
 *   onEdit={handleEdit}
 *   onCopy={handleCopy}
 * />
 */
const ProfileCard = ({
  userId,
  userInfo = {},
  avatar,
  onEdit,
  onCopy,
  showEditButton = true,
  className = "",
  ...props
}) => {
  return (
    <Card variant="elevated" padding="lg" className={className} {...props}>
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {avatar && (
            <img
              src={avatar}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-4 border-orange-400"
            />
          )}
          <div>
            <Text variant="h4" weight="bold">
              {userInfo.username || "User"}
            </Text>
            <Text variant="caption" color="secondary">
              ID: {userId}
            </Text>
          </div>
        </div>
        {showEditButton && onEdit && (
          <Button variant="secondary" size="sm" onClick={onEdit}>
            Edit
          </Button>
        )}
      </div>

      {/* Profile Info */}
      <div className="space-y-0">
        {Object.entries(userInfo).map(([key, value]) => (
          <InfoRow
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={value}
            copyable={true}
            onCopy={() => onCopy?.(value)}
            border={true}
          />
        ))}
      </div>
    </Card>
  );
};

export default ProfileCard;
