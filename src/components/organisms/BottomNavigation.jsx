import React from "react";
import { BottomNavItem } from "../molecules";

/**
 * BottomNavigation Organism Component
 * Complete bottom navigation bar with multiple items
 *
 * @component
 * @example
 * <BottomNavigation
 *   items={[
 *     { icon: Home, label: 'Home', id: 'home' },
 *     { icon: Wallet, label: 'Wallet', id: 'wallet' }
 *   ]}
 *   activeId="home"
 *   onItemClick={(id) => navigate(id)}
 * />
 */
const BottomNavigation = ({
  items = [],
  activeId,
  onItemClick,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40 ${className}`}
      {...props}
    >
      <div className="max-w-md mx-auto px-2 py-2 flex items-center justify-around">
        {items.map((item) => (
          <BottomNavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeId === item.id}
            onClick={() => onItemClick?.(item.id)}
            badge={item.badge}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
