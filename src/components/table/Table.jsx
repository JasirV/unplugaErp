import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Table() {
  const [tableData, setTableData] = useState([]);
  const [isOpen,setIsOpen]=useState(false)
  const [total, setTotal] = useState(0);
  const { header } = useSelector((state) => state.form);

  useEffect(() => {
    if (header?.detail_table?.length>0) {
        setTableData(header.detail_table);
        setIsOpen(true)
        const totalAmount = tableData.reduce((acc, c) => acc + (c.rate * c.qty), 0);
      setTotal(totalAmount.toFixed(2));
    }
  }, [header]);
  console.log(total);
  
  return (
    <>
    {isOpen&&(
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Item Details</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Sr No</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Item Code</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-700">Item Name</th>
              <th className="p-2 text-right text-sm font-semibold text-gray-700">Quantity</th>
              <th className="p-2 text-right text-sm font-semibold text-gray-700">Rate</th>
              <th className="p-2 text-right text-sm font-semibold text-gray-700">Amount</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-2 text-sm text-gray-700">{item.sr_no}</td>
                <td className="p-2 text-sm text-gray-700">{item.itemCode}</td>
                <td className="p-2 text-sm text-gray-700">{item?.itemName}</td>
                <td className="p-2 text-sm text-right text-gray-700">{item?.qty}</td>
                <td className="p-2 text-sm text-right text-gray-700">{item?.rate}</td>
                <td className="p-2 text-sm text-right text-gray-700">{item?.rate*item.qty}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 font-bold flex w-full justify-end">
        <span>Total Amount: </span>
        <span>₹{total}</span>
      </div>
    </div>
)}
</>
  );
}

export default Table;
