import React from "react";

export const AlertDescription = ({ children }) => (
  <div className="text-sm">{children}</div>
);

export const Alert = ({ children, variant = "default" }) => {
  const baseClasses = "p-4 rounded-lg border";
  const variantClasses = {
    default: "bg-blue-100 border-blue-300 text-blue-800",
    destructive: "bg-red-100 border-red-300 text-red-800",
    success: "bg-green-100 border-green-300 text-green-800",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};

// Usage example:
const AlertExample = () => (
  <Alert variant="default">
    <AlertDescription>This is an alert message.</AlertDescription>
  </Alert>
);

export default AlertExample;
