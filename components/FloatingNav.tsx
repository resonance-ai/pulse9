import React, { useState } from 'react';
import { Plus, X, Share, Edit, Trash } from 'lucide-react';


const FloatingNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const subButtons = [
    { icon: Share, color: 'blue', label: 'Share' },
    { icon: Edit, color: 'green', label: 'Edit' },
    { icon: Trash, color: 'red', label: 'Delete' },
  ];

  const radius = 80; // Distance from center to sub-buttons
  const startAngle = -Math.PI / 4; // Start from top-right
  const endAngle = Math.PI / 4; // End at bottom-right

  return (
    <div className="fixed bottom-8 right-8">
      <div className="relative w-64 h-64"> {/* Increased size to accommodate sub-buttons */}
        {subButtons.map((button, index) => {
          const angle = startAngle + (index / (subButtons.length - 1)) * (endAngle - startAngle);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <button
              key={button.label}
              className={`absolute w-12 h-12 rounded-full bg-${button.color}-500 text-white flex items-center justify-center shadow-lg hover:bg-${button.color}-600 transition-all duration-300`}
              style={{
                transform: `translate(${x}px, ${-y}px) scale(${isExpanded ? 1 : 0})`,
                opacity: isExpanded ? 1 : 0,
                transitionDelay: `${index * 50}ms`,
                right: '32px', // Adjust based on main button size
                bottom: '32px', // Adjust based on main button size
              }}
            >
              <button.icon size={24} />
            </button>
          );
        })}
        <button 
          onClick={toggleExpand} 
          className="absolute right-0 bottom-0 w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-lg hover:bg-purple-600 transition-colors z-10"
        >
          {isExpanded ? <X size={32} /> : <Plus size={32} />}
        </button>
      </div>
    </div>
  );
};

export default FloatingNav;