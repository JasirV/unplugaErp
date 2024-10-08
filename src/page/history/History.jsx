import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/saidbar/Saidbar';
import { useHeder } from '../../hooks/itemcodehook';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const History = () => {
  const { data } = useHeder();
  const [visibleData, setVisibleData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 20;

  const loadMoreItems = () => {
    if (visibleData.length >= data.length) {
      setHasMore(false);
      return;
    }
    const newItems = data?.slice(visibleData.length, visibleData.length + itemsPerPage);
    setVisibleData(prev => [...prev, ...newItems]);
  };

  useEffect(() => {
    loadMoreItems();
  }, []);

  const handleScroll = () => {
    if (!hasMore) return;
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      loadMoreItems();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleData, hasMore]);

  // Function to handle PDF download for a specific row
  const handleDownload = (item) => {
    const doc = new jsPDF();
    doc.text(`Invoice for ${item.ac_name}`, 20, 10);
    doc.autoTable({
      startY: 20,
      head: [['Field', 'Value']],
      body: [
        ['Account Amount', item.ac_amt],
        ['Account Name', item.ac_name],
        ['Status', item.status],
        ['Voucher Date', new Date(item.vr_date).toLocaleDateString()],
        ['Voucher Number', item.vr_no],
      ],
    });
    doc.save(`invoice_${item.vr_no}.pdf`);
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      <div>
        <Sidebar />
      </div>
      <div className="ml-4 w-full overflow-auto">
        <h2 className="text-2xl font-semibold mb-4">History</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Voucher No</th>
              <th className="px-4 py-2">Account Name</th>
              <th className="px-4 py-2">Account Amount</th>
              <th className="px-4 py-2">Voucher Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{item.vr_no}</td>
                <td className="px-4 py-2">{item.ac_name}</td>
                <td className="px-4 py-2">{item.ac_amt}</td>
                <td className="px-4 py-2">{new Date(item.vr_date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{item.status}</td>
                <td className="px-4 py-2">
                  <button className="bg-blue-500 text-white px-2 py-1 mr-2 rounded" onClick={() => alert(`Viewing details of voucher ${item.vr_no}`)}>
                    View
                  </button>
                  <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleDownload(item)}>
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!hasMore && <p className="mt-4 text-center">No more items to load</p>}
      </div>
    </div>
  );
};

export default History;
