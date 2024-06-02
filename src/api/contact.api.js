import api from "./api";

export const createContact = (contact) => {
  return api.post("contacts", contact);
};

export const fetchContacts = () => {
  return api.get("contacts");
};

export const deleteMessage = (id) => {
  return api.delete(`contacts/${id}`);
};
