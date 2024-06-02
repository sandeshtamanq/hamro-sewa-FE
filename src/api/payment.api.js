import api from "./api";

export const confirmPayment = (pidx) => {
  return api.post("payments/validate", { pidx });
};

export const fetchPayment = () => {
  return api.get("payments");
};

export const deletePayment = (id) => {
  return api.delete(`payments/${id}`);
};
