import { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // Assuming you're using Lucide for icons

const AddRecipeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-center"
      >
        <ChevronDown /> {/* Your icon here */}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
          <ul className="py-1">
            <li>
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Option 1
              </button>
            </li>
            <li>
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Option 2
              </button>
            </li>
            <li>
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Option 3
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddRecipeButton;
