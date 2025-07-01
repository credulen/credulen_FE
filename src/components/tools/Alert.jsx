import React from "react";

export const AlertDescription = ({ children, className = "" }) => (
  <div className={`text-sm ${className}`}>{children}</div>
);

export const Alert = ({ children, variant = "default", className = "" }) => {
  const baseClasses = "p-4 rounded-lg border flex items-center gap-2";
  const variantClasses = {
    default: "bg-blue-100 border-blue-300 text-blue-800",
    destructive: "bg-red-100 border-red-300 text-red-800",
    success: "bg-green-100 border-green-300 text-green-800",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};
