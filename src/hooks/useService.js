import { useMutation, useQuery } from "react-query";
import {
  addService,
  deleteService,
  fetchServices,
  getServiceDetail,
  updateService,
} from "../api/service.api";

export const useFetchServiceQuery = () => {
  return useQuery("services", fetchServices, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useAddServiceMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: addService, onError, onSuccess });
};

export const useUpdateServiceMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: updateService, onError, onSuccess });
};

export const useDeleteServiceMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: deleteService, onError, onSuccess });
};

export const useGetServiceDetailMutation = (id) => {
  return useQuery(["services", id], () => getServiceDetail(id), {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
