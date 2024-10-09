import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsopened } from '../../store/commonSlice';
import { resetForm } from '../../store/formSlice';
import { useDataUploadMuttate } from '../../hooks/useUpdateData';

const Buttons = () => {
  const dispatch = useDispatch();
  const open = useSelector((data) => data.common.common.isOPen);
  const { header } = useSelector((data) => data.form);
  console.log(header?.header_table?.vr_no, 'sffrty');
  const { mutate, isLoading, isSuccess, isError } = useDataUploadMuttate();

  const handleUploadClick = () => {
    console.log('hai');
    mutate();
  };
  if(isSuccess){
    console.log('success');
    
  }
  if(isError){
    console.log('error');
    
  }
  return (
    <div className="flex w-full justify-center gap-4 ">
      {header?.header_table?.vr_no && (
        <>
          {!open && (
            <button
              onClick={() => dispatch(setIsopened())}
              className="flex flex-row items-center rounded-xl bg-gradient-to-br from-purple-400 to-purple-300 px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-brand-500/50"
              data-ripple-light
            >
              <svg
                className="mr-2 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                height="16"
                width="16"
              >
                <path d="M16.6 4.6c-.5 0-.9.2-1.2.5-.2-.6-.7-1.1-1.3-1.3-.3-.1-.7-.1-1 0-.6-.5-1.4-.5-2 0-.3.1-.6.3-.8.5-.2-.1-.5-.2-.8-.2-1.1 0-2 .9-2 2 0 .3.1.6.2.8-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1h12.4c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1zm-1.5 7.5H5.4c-.2 0-.4.2-.4.4s.2.4.4.4h10.7c.2 0 .4-.2.4-.4s-.2-.4-.4-.4zM5 18c-.6 0-1.1-.4-1.4-.9-.3-.6-.3-1.3 0-1.9.3-.6.8-1 1.4-1s1.1.4 1.4 1c.3.6.3 1.3 0 1.9-.3.5-.8.9-1.4.9zm10 0c-.6 0-1.1-.4-1.4-.9-.3-.6-.3-1.3 0-1.9.3-.6.8-1 1.4-1s1.1.4 1.4 1c.3.6.3 1.3 0 1.9-.3.5-.8.9-1.4.9z" />
              </svg>
              Add New
            </button>
          )}

          <button
            onClick={() => dispatch(resetForm())}
            className="linear flex flex-row items-center rounded-xl bg-red-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
            data-ripple-light
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1zm-4 4h10"
              />
            </svg>
            Delete
          </button>

          <button
            onClick={() => {
              handleUploadClick();
            }}
            className="linear flex flex-row items-center rounded-xl bg-green-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200"
            data-ripple-light
          >
            <svg
              className="mr-2 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              height="16"
              width="16"
            >
              <path d="M7.979 14.771Q7.792 14.771 7.615 14.698Q7.438 14.625 7.271 14.458L3.75 10.938Q3.458 10.646 3.469 10.219Q3.479 9.792 3.771 9.5Q4.062 9.208 4.49 9.208Q4.917 9.208 5.188 9.5L8.021 12.333L14.833 5.521Q15.104 5.229 15.521 5.229Q15.938 5.229 16.229 5.521Q16.5 5.812 16.5 6.219Q16.5 6.625 16.229 6.917L8.688 14.458Q8.521 14.625 8.344 14.698Q8.167 14.771 7.979 14.771Z" />
            </svg>
            Save all
          </button>
        </>
      )}
    </div>
  );
};

export default Buttons;
