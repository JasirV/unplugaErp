import React, { useState } from 'react';

const Header = () => {
  const [formData, setFormData] = useState({
    vrNo: '',
    vrDate: '',
    status: '',
    acName: '',
    acAmt: ''
  });
  const [details, setDetails] = useState([{ itemCode: '', itemName: '', description: '', qty: '', rate: '' }]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...details];
    updatedDetails[index][name] = value;
    setDetails(updatedDetails);
  };

  const addDetailRow = () => {
    setDetails([...details, { itemCode: '', itemName: '', description: '', qty: '', rate: '' }]);
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.vrNo || !/^\d{1,18}$/.test(formData.vrNo)) tempErrors.vrNo = 'VR No is required and must be a number with a maximum of 18 digits';
    if (!formData.vrDate) {
        tempErrors.vrDate = 'VR Date is required.';
      } else {
        const today = new Date().toISOString().split('T')[0]; 
        if (new Date(formData.vrDate) > new Date(today)) {
          tempErrors.vrDate = 'VR Date cannot be in the future.';
        }
      }
    if (!formData.status || formData.status.length !== 1 ) tempErrors.status = 'Status is required';
    if (!formData.acName|| formData.acName.length > 200) tempErrors.acName = 'AC Name is required and must not exceed 200 characters';
    if (!formData.acAmt || !/^\d{1,16}(\.\d{1,2})?$/.test(formData.acAmt)) tempErrors.acAmt = 'AC Amount is required and must be a number with up to 16 digits and 2 decimal places.';
    details.forEach((detail, index) => {
        if (!detail.itemCode || detail.itemCode.length > 20) {
          tempErrors[`itemCode_${index}`] = `Item code at row ${index + 1} is required and must not exceed 20 characters.`;
        }
    
        if (!detail.itemName || detail.itemName.length > 200) {
          tempErrors[`itemName_${index}`] = `Item name at row ${index + 1} is required and must not exceed 200 characters.`;
        }
    
        if (!detail.description || detail.description.length > 3000) {
          tempErrors[`description_${index}`] = `Description at row ${index + 1} is required and must not exceed 3000 characters.`;
        }
    
        if (!detail.qty || !/^\d{1,15}(\.\d{1,3})?$/.test(detail.qty)) {
          tempErrors[`qty_${index}`] = `Quantity at row ${index + 1} is required and must be a number with up to 15 digits and 3 decimal places.`;
        }
    
        if (!detail.rate || !/^\d{1,16}(\.\d{1,2})?$/.test(detail.rate)) {
          tempErrors[`rate_${index}`] = `Rate at row ${index + 1} is required and must be a number with up to 16 digits and 2 decimal places.`;
        }
      });    

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        header_table: {
          vr_no: formData.vrNo,
          vr_date: formData.vrDate,
          ac_name: formData.acName,
          ac_amt: formData.acAmt,
          status: formData.status,
        },
        detail_table: details.map((detail, index) => ({
          vr_no: formData.vrNo,
          sr_no: index + 1, 
          item_code: detail.itemCode,
          item_name: detail.itemName,
          description: detail.description,
          qty: detail.qty,
          rate: detail.rate,
        })),
      };

      try {
        const response = await fetch('YOUR_API_ENDPOINT', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          alert('Form submitted successfully!');
        } else {
          alert('Failed to submit the form.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please fill all required fields.');
    }
  };

  return (
    <div className="w-full p-6">
      {/* Header Section */}
      <div className="bg-gray-100 p-6 mb-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">HEADER</h2>
        <div className="flex justify-between gap-5">
          <div className="flex flex-col w-1/3">
            <label className="mb-2">VR No:</label>
            <input
              type="text"
              name="vrNo"
              value={formData.vrNo}
              onChange={handleInputChange}
              className="border p-2"
            />
            {errors.vrNo && <span className="text-red-600">{errors.vrNo}</span>}
          </div>
          <div className="flex flex-col w-1/3">
            <label className="mb-2">VR Date:</label>
            <input
              type="date"
              name="vrDate"
              value={formData.vrDate}
              onChange={handleInputChange}
              className="border p-2"
            />
            {errors.vrDate && <span className="text-red-600">{errors.vrDate}</span>}
          </div>
          <div className="flex flex-col w-1/3">
            <label className="mb-2">Status:</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="border p-2"
            />
            {errors.status && <span className="text-red-600">{errors.status}</span>}
          </div>
        </div>
        <div className="flex gap-3 mb-6">
          <div className="flex flex-col w-4/6">
            <label className="mb-2">AC Name:</label>
            <input
              type="text"
              name="acName"
              value={formData.acName}
              onChange={handleInputChange}
              className="border p-2"
            />
            {errors.acName && <span className="text-red-600">{errors.acName}</span>}
          </div>
          <div className="flex flex-col w-2/6">
            <label className="mb-2">AC Amount:</label>
            <input
              type="number"
              name="acAmt"
              value={formData.acAmt}
              onChange={handleInputChange}
              className="border p-2 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            {errors.acAmt && <span className="text-red-600">{errors.acAmt}</span>}
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-gray-100 rounded-xl p-6">
        <div>
          <h2 className="text-xl font-bold mb-4">DETAIL</h2>
        </div>
        {details.map((detail, index) => (
          <div key={index} className=" p-4 mb-4 ">
            <div className="flex gap-4">
              <div className="flex flex-col w-1/3">
                <label className="mb-2">Item Code:</label>
                <input
                  type="text"
                  name="itemCode"
                  value={detail.itemCode}
                  onChange={(e) => handleDetailChange(index, e)}
                  className="border p-2"
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label className="mb-2">Item Name:</label>
                <input
                  type="text"
                  name="itemName"
                  value={detail.itemName}
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

        <button
          type="button"
          onClick={addDetailRow}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Item
        </button>

        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded ml-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Header;
