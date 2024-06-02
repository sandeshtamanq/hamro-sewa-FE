import api from "./api";

export const fetchServices = () => {
  return api.get("products");
};

export function addService(productDetail) {
  return api.post("products", productDetail, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function updateService(productDetail) {
  return api.patch(`products/${productDetail.id}`, productDetail.formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function deleteService(id) {
  return api.delete(`products/${id}`);
}

export function getServiceDetail(id) {
  return api.get(`products/${id}`);
}
