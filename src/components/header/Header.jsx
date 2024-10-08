import React, { useState } from "react";
import { validateForm } from "../../utils/validation";
import { useDispatch } from "react-redux";
import { setHeader } from "../../store/formSlice";
import { useHeder } from "../../hooks/itemcodehook";

const Header = () => {
  const dispatch = useDispatch();
 const {data,isLoading,error} =useHeder() 
 const [accno,setAccno]=useState(data?.length)
  const [isOpen, setIsOpen] = useState(true);
  
  const [formData, setFormData] = useState({
    vrNo: accno,
    vrDate: "",
    status: "",
    acName: "",
    acAmt: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  if(isLoading){
    return <h1>Lodaign...</h1>
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      const payload = {
        header_table: {
          vr_no: formData.vrNo,
          vr_date: formData.vrDate,
          ac_name: formData.acName,
          ac_amt: formData.acAmt,
          status: formData.status,
        },
        detail_table: [],
      };

      console.log("Payload ready for submission:", payload);
      dispatch(setHeader(payload));
      setIsOpen(false);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="w-full p-6">
      <form className="bg-gray-100 p-6 mb-6 rounded-xl" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">HEADER</h2>
        <div className="flex justify-between gap-5">
          <div className="flex flex-col w-1/3">
            <label className="mb-2">VR No:</label>
            <input
              type="text"
              name="vrNo"
              value={formData.vrNo}
              disabled  
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
            {errors.vrDate && (
              <span className="text-red-600">{errors.vrDate}</span>
            )}
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
            {errors.status && (
              <span className="text-red-600">{errors.status}</span>
            )}
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
            {errors.acName && (
              <span className="text-red-600">{errors.acName}</span>
            )}
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
            {errors.acAmt && (
              <span className="text-red-600">{errors.acAmt}</span>
            )}
          </div>
        </div>
        {isOpen && (
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default Header;
