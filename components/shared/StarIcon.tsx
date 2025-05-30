import React from 'react';

const StarIcon: React.FC<{ filled: boolean; className?: string }> = ({ filled, className = "w-4 h-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={`${className} inline-block ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
  >
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.382c-.836.067-1.171 1.025-.53 1.604l3.632 3.29-1.176 4.673c-.201.794.713 1.439 1.445.995L10 15.508l4.024 2.42c.732.444 1.646-.201 1.445-.995l-1.176-4.673 3.632-3.29c.64-.579.306-1.537-.53-1.604l-4.753-.382-1.83-4.401z" clipRule="evenodd" />
  </svg>
);

export default StarIcon;