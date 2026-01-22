import React from "react";
import { Card, Button, Text } from "../atoms";
import { X } from "lucide-react";

/**
 * ModalDialog Organism Component
 * Reusable modal/dialog component with header, content, and actions
 *
 * @component
 * @example
 * <ModalDialog
 *   isOpen={true}
 *   title="Confirm Action"
 *   onClose={handleClose}
 *   actions={[
 *     { label: 'Cancel', onClick: handleClose },
 *     { label: 'Confirm', onClick: handleConfirm, variant: 'primary' }
 *   ]}
 * >
 *   Are you sure?
 * </ModalDialog>
 */
const ModalDialog = ({
  isOpen = false,
  title,
  children,
  onClose,
  actions = [],
  size = "md",
  className = "",
  ...props
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      {...props}
    >
      <Card
        variant="elevated"
        padding="lg"
        className={`w-full ${sizes[size]} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Text variant="h3" weight="bold">
            {title}
          </Text>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition"
            aria-label="Close modal"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          {typeof children === "string" ? (
            <Text variant="body" color="secondary">
              {children}
            </Text>
          ) : (
            children
          )}
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex gap-3 justify-end">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "secondary"}
                size={action.size || "md"}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ModalDialog;
