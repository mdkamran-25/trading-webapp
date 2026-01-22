import React from "react";
import { Card, Text } from "../atoms";
import { MetricRow } from "../molecules";

/**
 * DataTable Organism Component
 * Displays list of rows with consistent styling
 *
 * @component
 * @example
 * <DataTable
 *   rows={[
 *     { label: 'Total Balance', value: '₹5000' },
 *     { label: 'Pending', value: '₹100' }
 *   ]}
 *   title="Financial Summary"
 * />
 */
const DataTable = ({
  rows = [],
  title,
  icon: HeaderIcon,
  className = "",
  onRowClick,
  ...props
}) => {
  return (
    <Card variant="default" padding="lg" className={className} {...props}>
      {title && (
        <>
          <div className="flex items-center gap-2 mb-4">
            {HeaderIcon && <HeaderIcon size={24} className="text-orange-500" />}
            <Text variant="h4" weight="bold">
              {title}
            </Text>
          </div>
        </>
      )}

      <div className="space-y-0">
        {rows.map((row, index) => (
          <MetricRow
            key={index}
            label={row.label}
            value={row.value}
            icon={row.icon}
            highlight={row.highlight}
            border={index !== rows.length - 1}
            onClick={() => onRowClick?.(row, index)}
          />
        ))}
      </div>
    </Card>
  );
};

export default DataTable;
