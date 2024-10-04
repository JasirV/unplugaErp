import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Details = () => {
  const { header }= useSelector((state) => state.form);

  const [open, setIsOpen] = useState(false);
  // console.log(header.vr_no);
  console.log(header);
  
  useEffect(() => {
    if (header.header_table?.vr_no) {
      console.log("success");
      
      setIsOpen(true);
    } else {
      console.log("errrr");
      setIsOpen(false);
    }
  }, [header]); 

  return (
    <div>
      {open && (
        <div className="bg-gray-100 rounded-xl p-6">
        <div>
          <h2 className="text-xl font-bold mb-4">DETAIL</h2>
        </div>
          <div  className=" p-4 mb-4 ">
            <div className="flex gap-4">
              <div className="flex flex-col w-1/3">
                <label className="mb-2">Item Code:</label>
                <input
                  type="text"
                  name="itemCode"
                  onChange={(e) => handleDetailChange(index, e)}
                  className="border p-2"
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label className="mb-2">Item Name:</label>
                <input
                  type="text"
                  name="itemName"
                  onChange={(e) => handleDetailChange(index, e)}
                  className="border p-2"
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label className="mb-2">Description:</label>
                <input
                  type="text"
                  name="description"
                  onChange={(e) => handleDetailChange(index, e)}
                  className="border p-2"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="flex flex-col w-1/2">
                <label className="mb-2">Quantity:</label>
                <input
                  type="number"
                  name="qty"
                  onChange={(e) => handleDetailChange(index, e)}
                  className="border p-2 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="mb-2">Rate:</label>
                <input
                  type="number"
                  name="rate"
                  onChange={(e) => handleDetailChange(index, e)}
                  className="border p-2 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>
      </div>
      )}
    </div>
  );
};

export default Details;
