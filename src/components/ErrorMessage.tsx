import React from 'react'

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  return (
    <p className={`text-xs font-medium text-red-500 dark:text-red-400  ${className}`}>
      {message}
    </p>
  )
}

export { ErrorMessage }
