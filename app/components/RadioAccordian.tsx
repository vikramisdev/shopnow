import React, { ReactNode } from "react";

interface RadioAccordianProps {
  name: string;
  isOpen: boolean;
  title?: string;
  children?: ReactNode;
  className?: string;
  onSelect: () => void;
}

const RadioAccordian: React.FC<RadioAccordianProps> = ({
  title = "Details",
  isOpen,
  children,
  className,
  onSelect,
}) => {
  return (
    <div className={`radio-accordian ${className}`}>
      <div
        className="flex shadow-sm justify-between py-2 cursor-pointer"
        onClick={onSelect}
      >
        <div className="flex gap-x-4 items-center">
          <input
            checked={isOpen}
            className="h-5 w-5 rounded-full"
            type="radio"
            name="radio"
            readOnly
          />
          <h1 className="select-none text-xl font-semibold">{title}</h1>
        </div>
      </div>

      <div
        className={`radio-content px-2 overflow-hidden transition-all ${
          isOpen ? "h-fit duration-100 py-4" : "h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default RadioAccordian;
