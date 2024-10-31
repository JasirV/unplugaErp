import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDetailItem } from "../../store/formSlice";
import { useItems } from "../../hooks/itemcodehook";
import { setIsopened, setTotalAmount } from "../../store/commonSlice";

const Details = () => {
  const { header } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const { data, isLoading, error } = useItems();

  const open = useSelector((data) => data.common.common.isOPen);
  console.log(open, "isOPen");

  const [itemsList, setItemsList] = useState([]);
  const [details, setDetails] = useState([
    {
      vr_no: header.header_table?.vr_no*12 || 22,
      sr_no: header.detail_table?.length || 1,
      itemCode: "",
      itemName: "",
      description: "",
      qty: "",
      rate: "",
    },
  ]);

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
  const handleSubmit = (e) => {
    e.preventDefault();

    const { qty, rate } = details[0];
    const validQty = Number(qty) || 0;
    const validRate = Number(rate) || 0;

    if (validQty && validRate) {
      // Dispatch to add details and set total amount
      dispatch(addDetailItem(details));
      dispatch(setTotalAmount(validQty * validRate));
      dispatch(setIsopened());
      setDetails([
        {
          vr_no: header.header_table?.vr_no || "",
          sr_no: details.length + 1,
          itemCode: "",
          itemName: "",
          description: "",
          qty: "",
          rate: "",
        },
      ]);
    } else {
      alert("Please enter valid numbers for Quantity and Rate.");
    }
  };

  const handleItemSelect = (index, e) => {
    const selectedItem = itemsList.find(
      (item) => item.item_code === e.target.value
    );

    const updatedDetails = [...details];
    updatedDetails[index] = {
      ...updatedDetails[index],
      itemCode: selectedItem?.item_code || "",
      itemName: selectedItem?.item_name || "",
    };
    setDetails(updatedDetails);
  };

  // Update itemsList when data is fetched
  useEffect(() => {
    if (data && data.data) {
      setItemsList(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="mt-12">
      {open && (
        <div className="bg-gray-100 rounded-xl p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">DETAIL</h2>
            <button onClick={()=>dispatch(setIsopened())}
              className="linear flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:active:bg-gray-500"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {details.map((detail, index) => (
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
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Submit Details
          </button>
        </div>
      )}
    </div>
  );
};

export default Details;
