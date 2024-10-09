import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

export const useDataUploadMuttate = () => {
  const { header } = useSelector((data) => data.form);
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response=await axios.post('http://5.189.180.8:8010/header/multiple', header);
      console.log(response,'response form out ');
      
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ['HederCode'],
      });
    },
  });

  return mutation;
};
