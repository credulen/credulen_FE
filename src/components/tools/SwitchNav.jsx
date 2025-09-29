import React from "react";
import PropTypes from "prop-types";

const SwitchNav = ({ checked, onChange, children, ...props }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        {...props}
        aria-label={`Toggle ${children.toLowerCase()} state`}
        aria-checked={checked}
      />
      <div className="w-12 h-7 bg-primary-50 dark:bg-primary-50-dark rounded-full peer-focus:ring-4 peer-focus:ring-primary-500 transition-all duration-300 ease-in-out peer-checked:bg-secondary-500">
        <div className="w-6 h-6 bg-white dark:bg-neutral-800-dark rounded-full shadow-md transform transition-all duration-300 ease-in-out translate-x-1 peer-checked:translate-x-6"></div>
      </div>
      <span className="ml-3 text-sm font-medium text-primary-500 dark:text-primary-500">
        {children}
      </span>
    </label>
  );
};

SwitchNav.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default SwitchNav;
