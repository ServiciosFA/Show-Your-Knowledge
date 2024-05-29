import React, { ReactNode } from 'react';

interface StatusButtonProps {
  number: number;
  item: ReactNode;
  color: string;
  type?: 'tecnologia' | 'participantes' | 'solo' | 'other';
}

const StatusButton: React.FC<StatusButtonProps> = ({ number, color, type = 'other' ,item}) => {
  const className = `size-4 rounded-full flex items-center justify-start bg-${color} ring-1 z-${number * 10} ring-white`;

  const typeClassName = `${type === 'tecnologia' ? 'text-blue-500' : ''}
                          ${type === 'participantes' ? 'text-green-500' : ''}
                          ${type === 'solo' ? 'text-gray-400' : ''}`;

  return (
    <div className={`${className} ${typeClassName}`}>
      {item}
    </div>
  );
};

export default StatusButton;