import React, { useState } from 'react';
import { Plus, X, Share, Edit, Trash, ArrowLeft } from 'lucide-react';

interface FloatingNavProps {
  changeAvatar: (selectedAvatartId: string) => void;
}


const FloatingNav = ( {changeAvatar} : FloatingNavProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<null | number>(null);

  const mainButtons = [
    { icon: Share, color: 'blue', label: 'Share', options: ['Option 1', 'Option 2', 'Option 3'] },
    { icon: Edit, color: 'green', label: 'Edit', options: ['Edit 1', 'Edit 2', 'Edit 3'] },
    { icon: Trash, color: 'red', label: 'Delete', options: ['Delete 1', 'Delete 2', 'Delete 3'] },
  ];
  const avatartsButtons = [
    { icon: Share, label: 'Share', 
      names: ['Eric', 'Susan', 'Tyler'], 
      ids: ['Eric_public_pro2_20230608', 'Susan_public_2_20240328', 'Tyler-incasualsuit-20220721'] },
    { icon: Edit, label: 'Edit', 
      names: ['Eric', 'Susan', 'Tyler'], 
      ids: ['Eric_public_pro2_20230608', 'Susan_public_2_20240328', 'Tyler-incasualsuit-20220721'] },
    { icon: Trash, label: 'Delete', 
      names: ['Eric', 'Susan', 'Tyler'], 
      ids: ['Eric_public_pro2_20230608', 'Susan_public_2_20240328', 'Tyler-incasualsuit-20220721'] },
  ];

  const handleConsole = (data : any) => {
    console.log("========== test data : ", data);
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setActiveSection(null);
  };

  const handleButtonClick = (index: number) => {
    setActiveSection(index);
  };

  const handleBack = () => {
    setActiveSection(null);
  };

  const radius = 80;
  const startAngle = -Math.PI / 4;
  const endAngle = Math.PI / 4;

  return (
    <div className="fixed bottom-20 right-20">
    {/* <div className="fixed bottom-8 right-8"> */}
      <div className="relative w-64 h-64">
        {mainButtons.map((button, index) => {
          const angle = startAngle + (index / (mainButtons.length - 1)) * (endAngle - startAngle);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <button
              key={button.label}
              onClick={() => handleButtonClick(index)}
              className={`absolute w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg`}
              style={{
                transform: `translate(${x}px, ${-y}px) scale(${isExpanded && activeSection === null ? 1 : 0})`,
                opacity: isExpanded && activeSection === null ? 1 : 0,
                transitionDelay: `${index * 50}ms`,
                right: '32px',
                bottom: '32px',
              }}
            >
              <button.icon size={24} />
            </button>
          );
        })}

        {isExpanded && activeSection !== null && (
          <div className="absolute bottom-20 right-0 flex flex-col space-y-2">
            {avatartsButtons[activeSection].names.map((option, index) => (
              <button
                key={index}
                onClick={() => changeAvatar(avatartsButtons[activeSection].ids[index])}
                className={`w-40 h-12 rounded-lg bg-white text-black flex items-center justify-center shadow-lg`}
                style={{
                  transform: `translateX(${isExpanded ? 0 : 100}px)`,
                  opacity: isExpanded ? 1 : 0,
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {option}
              </button>
            ))}
            {/* {mainButtons[activeSection].options.map((option, index) => (
              <button
                key={index}
                className={`w-40 h-12 rounded-lg bg-${mainButtons[activeSection].color}-500 text-white flex items-center justify-center shadow-lg hover:bg-${mainButtons[activeSection].color}-600 transition-all duration-300`}
                style={{
                  transform: `translateX(${isExpanded ? 0 : 100}px)`,
                  opacity: isExpanded ? 1 : 0,
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {option}
              </button>
            ))} */}
            <button
              onClick={handleBack}
              className="w-40 h-12 rounded-lg bg-gray-500 text-white flex items-center justify-center shadow-lg hover:bg-gray-600 transition-all duration-300"
              style={{
                transform: `translateX(${isExpanded ? 0 : 100}px)`,
                opacity: isExpanded ? 1 : 0,
                transitionDelay: `${mainButtons[activeSection].options.length * 50}ms`,
              }}
            >
              <ArrowLeft size={24} className="mr-2" /> Back
            </button>
          </div>
        )}

        <button 
          onClick={toggleExpand} 
          className="absolute right-2 bottom-5 w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-lg hover:bg-purple-600 transition-all duration-300 z-10"
        >
          {isExpanded ? <X size={32} /> : <Plus size={32} />}
        </button>
      </div>
    </div>
  );
};

export default FloatingNav;