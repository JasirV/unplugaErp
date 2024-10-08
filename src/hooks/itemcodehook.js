import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import axios from "axios";

export const useHeder =()=>{
    return useQuery({
        queryKey:['HederCode'],
        queryFn:async()=>{
          const response =await axios.get('http://5.189.180.8:8010/header');
          return response.data
        }
      })
}

export const useItems =()=>{
  return useQuery({
    queryKey:["ItemsCode"],
    queryFn:async()=>{
      const response= await axios.get('http://5.189.180.8:8010/item')
      return response
    }
  })
}