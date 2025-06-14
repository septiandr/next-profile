import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className = '',
  fullWidth = true,
  ...props
}) => {
  const baseStyles = 'px-3 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500';
  const widthClass = fullWidth ? 'w-full' : '';
  const textAreaClasses = `${baseStyles} ${widthClass} ${className}`;

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
      <textarea className={textAreaClasses} {...props} />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default TextArea; 