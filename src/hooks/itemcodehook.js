import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setVrNo } from "../store/commonSlice";

export const useHeder =()=>{
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ['HederCode'],
    queryFn: async () => {
      const response = await axios.get('http://5.189.180.8:8010/header');
      const vrNo = response.data.length; 
      console.log(vrNo, 'this length');
      dispatch(setVrNo(vrNo));
      return response.data;
    },
    onError: (error) => {
      console.error('Error fetching header data:', error);
    },
    refetchOnWindowFocus: false, 
  });
};

export const useItems =()=>{
  return useQuery({
    queryKey:["ItemsCode"],
    queryFn:async()=>{
      const response= await axios.get('http://5.189.180.8:8010/item')
      return response
    }
  })
}