import React from 'react';

type ButtonProps = {
    onClick: () => void;
    isActive: boolean;
    path: string;
    children: React.ReactNode;
  };
  
  const Button: React.FC<ButtonProps> = ({ onClick, isActive, children }) => {
    const buttonClasses = isActive
      ? 'bg-amber-300'
      : 'bg-stone-300';
  
    return (
      <button
        onClick={onClick}
        className={`px-20 py-4 my-8 text-black text-4xl font-bold ${buttonClasses} border-4 border-black hover:bg-amber-300`}
      >
        {children}
      </button>
    );
  };

export default Button;
