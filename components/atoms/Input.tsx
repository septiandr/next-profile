import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  fullWidth = true,
  ...props
}) => {
  const baseStyles = 'px-3 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500';
  const widthClass = fullWidth ? 'w-full' : '';
  const inputClasses = `${baseStyles} ${widthClass} ${className}`;

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm sm:text-base font-medium text-gray-200 mb-1"
        >
          {label}
        </label>
      )}
      <input className={inputClasses} {...props} />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input; 