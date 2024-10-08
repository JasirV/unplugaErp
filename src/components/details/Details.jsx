import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDetailItem } from '../../store/formSlice';
import { useItems } from '../../hooks/itemcodehook';

const Details = () => {
  const { header } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const {data,isLoading,error} =useItems() 
  // console.log(data)
  const [open, setIsOpen] = useState(false);
  const [itemsList,setItemsList]=useState(data?.data)
  const [details, setDetails] = useState([{
    vr_no: header.header_table?.vr_no || '',
    sr_no: header.detail_table?.length || 1,
    itemCode: '',
    itemName: '',
    description: '',
    qty: '',
    rate: '',
    detail_table: []
  }]);
  
  // Handle input changes in the form
  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...details];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [name]: value,
    };
    setDetails(updatedDetails);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload ={details}
    console.log(header,"ad");
    
    console.log("Payload ready for submission:", details);
    dispatch(addDetailItem(details));  
  };
  const handleItemSelect = (index, e) => {
    const selectedItem = itemsList.find(item => item.item_code === e.target.value);
    console.log('res',selectedItem)
    const updatedDetails = [...details];
    updatedDetails[index] = {
      ...updatedDetails[index],
      itemCode: selectedItem?.item_code || '',
      itemName: selectedItem?.item_name || '',
    };
    setDetails(updatedDetails);
  };

  useEffect(() => {
    if (header?.detail_table?.length>0) {
      console.log("Header present, showing details section.");
      setIsOpen(false);
    }else if(header.header_table?.vr_no){
      console.log('this false messge');
      setIsOpen(true)
    } else {
      console.log("No header present, hiding details section.");
      setIsOpen(false);
    }
  }, [header]);

  if(isLoading){
    return <h1>Loading</h1>
  }
  return (
    <div>
      {open && (
        <div className="bg-gray-100 rounded-xl p-6">
          <div>
            <h2 className="text-xl font-bold mb-4">DETAIL</h2>
          </div>

          {details?.map((detail, index) => (
            <div key={index} className="p-4 mb-4">
              <div className="flex gap-4">
                <div className="flex flex-col w-1/3">
                  <label className="mb-2">Item Code:</label>
                  <select
                name="itemCode"
                value={detail.itemCode}
                onChange={(e) => handleItemSelect(index, e)}
                className="border p-2"
              >
                <option value="">Select Item Code</option>
                {itemsList?.map((item) => (
                  <option key={item.item_code} value={item.item_code}>
                    {item.item_code}
                  </option>
                ))}
              </select>
                </div>
                <div className="flex flex-col w-1/3">
                  <label className="mb-2">Item Name:</label>
                  <input
                    type="text"
                    name="itemName"
                    value={detail.itemName}
                    disabled  
                    onChange={(e) => handleDetailChange(index, e)}
                    className="border p-2"
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label className="mb-2">Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={detail.description}
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
                    value={detail.qty}
                    onChange={(e) => handleDetailChange(index, e)}
                    className="border p-2 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="mb-2">Rate:</label>
                  <input
                    type="number"
                    name="rate"
                    value={detail.rate}
                    onChange={(e) => handleDetailChange(index, e)}
                    className="border p-2 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>
          ))}

          <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white p-2 rounded">
            Submit Details
          </button>
        </div>
      )}
    </div>
  );
};

export default Details;
