import React from 'react';
import { classNames } from '@/utils/class-names';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  title: string;
};

const InputLabel: React.FC<LabelProps> = ({ title, className, ...props }) => {
  return (
    <label
      className={classNames(
        "block text-sm/6 font-semibold text-gray-900",
        className
      )}
      {...props}
    >
      {title}
    </label>
  );
};

export default InputLabel;
