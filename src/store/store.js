import { configureStore } from '@reduxjs/toolkit'
import formReducer from './formSlice'
import common from './commonSlice'
const store = configureStore({
    reducer: {
      form: formReducer,
      common:common
    }
  });
  
  export default store;