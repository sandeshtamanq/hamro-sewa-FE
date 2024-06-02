import { useMutation, useQuery } from "react-query";
import {
  createContact,
  deleteMessage,
  fetchContacts,
} from "../api/contact.api";

export const useFetchContactQuery = () => {
  return useQuery("contacts", fetchContacts, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useCreateContactMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: createContact, onError, onSuccess });
};

export const useDeleteMessageMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: deleteMessage, onError, onSuccess });
};
