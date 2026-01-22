import React, { useState } from "react";
import { Card, Text } from "../atoms";
import { TabButton } from "../molecules";

/**
 * TabsNavigation Organism Component
 * Tab switcher with content areas
 *
 * @component
 * @example
 * <TabsNavigation
 *   tabs={[
 *     { id: 'tab1', label: 'Active', icon: CheckIcon },
 *     { id: 'tab2', label: 'Pending', icon: ClockIcon }
 *   ]}
 *   defaultActiveId="tab1"
 *   onTabChange={(id) => console.log(id)}
 * >
 *   {activeTab === 'tab1' && <div>Content 1</div>}
 *   {activeTab === 'tab2' && <div>Content 2</div>}
 * </TabsNavigation>
 */
const TabsNavigation = ({
  tabs = [],
  defaultActiveId,
  onTabChange,
  children,
  orientation = "horizontal",
  className = "",
  ...props
}) => {
  const [activeId, setActiveId] = useState(defaultActiveId || tabs[0]?.id);

  const handleTabClick = (id) => {
    setActiveId(id);
    onTabChange?.(id);
  };

  const tabContainerClass =
    orientation === "vertical" ? "flex-col" : "flex-row";

  return (
    <div className={`flex ${tabContainerClass} gap-3 ${className}`} {...props}>
      {/* Tab Buttons */}
      <div
        className={`flex gap-2 ${orientation === "vertical" ? "flex-col" : "flex-row overflow-x-auto pb-2"}`}
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            label={tab.label}
            icon={tab.icon}
            isActive={activeId === tab.id}
            onClick={() => handleTabClick(tab.id)}
            disabled={tab.disabled}
          />
        ))}
      </div>

      {/* Tab Content */}
      {children && (
        <div className="w-full">
          {typeof children === "function" ? children(activeId) : children}
        </div>
      )}
    </div>
  );
};

export default TabsNavigation;
