import React, { useState } from "react";
import { Card, Button, Text } from "../atoms";
import { FormField } from "../molecules";

/**
 * FormCard Organism Component
 * Reusable form card with title, fields, and submit button
 *
 * @component
 * @example
 * <FormCard
 *   title="Login"
 *   fields={[
 *     { name: 'email', label: 'Email', type: 'email' },
 *     { name: 'password', label: 'Password', type: 'password' }
 *   ]}
 *   onSubmit={handleSubmit}
 *   submitLabel="Sign In"
 * />
 */
const FormCard = ({
  title,
  description,
  fields = [],
  onSubmit,
  submitLabel = "Submit",
  submitVariant = "primary",
  loading = false,
  className = "",
  ...props
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
  );
  const [errors, setErrors] = useState({});

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <Card variant="default" padding="lg" className={className} {...props}>
      {title && (
        <>
          <Text variant="h3" weight="bold" className="mb-1">
            {title}
          </Text>
          {description && (
            <Text variant="body" color="secondary" className="mb-6">
              {description}
            </Text>
          )}
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => (
          <FormField
            key={field.name}
            label={field.label}
            type={field.type || "text"}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={errors[field.name]}
            required={field.required}
            icon={field.icon}
          />
        ))}

        <Button
          type="submit"
          variant={submitVariant}
          fullWidth
          disabled={loading}
          className="mt-6"
        >
          {loading ? "Loading..." : submitLabel}
        </Button>
      </form>
    </Card>
  );
};

export default FormCard;
