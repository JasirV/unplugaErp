import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Home, Users, Package, DollarSign, ShoppingCart, CreditCard, BarChart2, Share2, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ icon: Icon, label, items, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-2">
      <div 
        className="flex items-center justify-between p-2 hover:bg-gray-700 rounded cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
          if (onClick) onClick(label); 
        }}
      >
        <div className="flex items-center">
          <Icon className="mr-2 text-gray-400" size={18} />
          <span>{label}</span>
        </div>
        {items && (isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
      </div>
      {isOpen && items && (
        <div className="ml-6 mt-1">
          {items.map((item, index) => (
            <div key={index} className="p-2 hover:bg-gray-700 rounded cursor-pointer">
              <p onClick={() => onClick(item)}> {item} </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {

  const handleMenuItemClick = (label) => {
    console.log(label, "label");
    switch (label) {
      case 'Home':
        navigate('/home');
        break;
        case 'Sale Invoices':
        navigate('/sale');
      
      default:
        break;
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4 h-screen rounded-tr-xl rounded-br-xl">
      <div className="mb-6 w-full  flex justify-center">
        <h2 className="text-xl font-bold">My Company</h2>
      </div>
      <div className="space-y-2">
        <MenuItem icon={Home} label="Home" onClick={handleMenuItemClick} />
      </div>
    </div>
  );
};

export default Sidebar;
