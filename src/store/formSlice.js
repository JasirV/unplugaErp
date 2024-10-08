import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  header: {
  }
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setHeader: (state, action) => {
      state.header = {...action.payload};
    },
    addDetailItem: (state, action) => {
      console.log(state)
      state.header.detail_table.push(...action.payload);
    },
    updateDetailItem: (state, action) => {
      const { index, updatedItem } = action.payload; 
      state.header.detail_table[index] = { ...state.detail_table[index], ...updatedItem };
    },
    deleteDetailItem: (state, action) => {
      const index = action.payload; 
      state.header.detail_table.splice(index, 1); 
    },
    resetForm: (state) => {
      state.header = initialState.header;
      state.detail_table = [];
    },
  },
});

export const { setHeader, addDetailItem, updateDetailItem, deleteDetailItem, resetForm } = formSlice.actions;
export default formSlice.reducer;
