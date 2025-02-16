// src/utils/validation.js
export const validateForm = (formData) => {
    let tempErrors = {};
  
    if (!formData.vrNo || !/^\d{1,18}$/.test(formData.vrNo)) {
      tempErrors.vrNo = 'VR No is required and must be a number with a maximum of 18 digits';
    }
    
    if (!formData.vrDate) {
      tempErrors.vrDate = 'VR Date is required.';
    } else {
      const today = new Date().toISOString().split('T')[0]; 
      if (new Date(formData.vrDate) > new Date(today)) {
        tempErrors.vrDate = 'VR Date cannot be in the future.';
      }
    }
    
    if (!formData.status || formData.status.length !== 1) {
      tempErrors.status = 'Status is required';
    }
    
    if (!formData.acName || formData.acName.length > 200) {
      tempErrors.acName = 'AC Name is required and must not exceed 200 characters';
    }
    
    if (!formData.acAmt || !/^\d{1,16}(\.\d{1,2})?$/.test(formData.acAmt)) {
      tempErrors.acAmt = 'AC Amount is required and must be a number with up to 16 digits and 2 decimal places.';
    }
    return tempErrors;
  };

  export const validateDetails =(formData)=>{
    let tempErrors = {};
      if (!formData.itemCode || formData.itemCode.length > 20) {
        tempErrors[`itemCode_${index}`] = `Item code at row ${index + 1} is required and must not exceed 20 characters.`;
      }
  
      if (!formData.itemName || formData.itemName.length > 200) {
        tempErrors[`itemName_${index}`] = `Item name at row ${index + 1} is required and must not exceed 200 characters.`;
      }
  
      if (!formData.description || formData.description.length > 3000) {
        tempErrors[`description_${index}`] = `Description at row ${index + 1} is required and must not exceed 3000 characters.`;
      }
  
      if (!formData.qty || !/^\d{1,15}(\.\d{1,3})?$/.test(formData.qty)) {
        tempErrors[`qty_${index}`] = `Quantity at row ${index + 1} is required and must be a number with up to 15 digits and 3 decimal places.`;
      }
  
      if (!formData.rate || !/^\d{1,16}(\.\d{1,2})?$/.test(formData.rate)) {
        tempErrors[`rate_${index}`] = `Rate at row ${index + 1} is required and must be a number with up to 16 digits and 2 decimal places.`;
      }
    return tempErrors
  }
  