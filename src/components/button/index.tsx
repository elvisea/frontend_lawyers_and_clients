import React from 'react';
import { classNames } from '@/utils/class-names';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

const Button: React.FC<ButtonProps> = ({ title, className, ...props }) => {
  return (
    <button
      className={classNames(
        "block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        className
      )}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
