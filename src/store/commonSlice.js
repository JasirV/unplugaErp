import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState = {
    common: {
        TotalAmount: 0,
        vr_no: 0,
        isOPen:false
    }
};
const commonSlice = createSlice({
    name: 'common', 
    initialState,
    reducers: {
        setTotalAmount: (state, action) => {
            const amount = Number(action.payload) || 0;  
            state.common.TotalAmount += amount;
        },
        setVrNo: (state, action) => {
            console.log(action.payload,'this is our p')
            state.common.vr_no = action.payload; 
        },
        setIsopened:(state,action)=>{
            state.common.isOPen=!state.common.isOPen
        }
    }
});

export const { setTotalAmount, setVrNo,setIsopened } = commonSlice.actions;
export default commonSlice.reducer;
