import React, { useState } from 'react';
import { Plus, X, Share, Edit, Trash } from 'lucide-react';

const FloatingNav = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        console.log(isExpanded);
    }

    return (
        <div className="fixed bottom-8 right-8">
            <div className={`flex flex-col-reverse items-end space-y-4 space-y-reverse transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <button className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
                    <Share size={24} />
                </button>
                <button className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
                    <Edit size={24} />
                </button>
                <button className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors">
                    <Trash size={24} />
                </button>
            </div>
            <div>
                <button
                onClick={toggleExpand}
                className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-lg hover:bg-purple-600 transition-colors"
                > 
                    {isExpanded ? <X size={32} /> : <Plus size={32} />}
                </button>
            </div>
        </div>
    )
}

export default FloatingNav;