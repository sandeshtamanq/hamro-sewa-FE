import api from "./api";

export const fetchMe = () => {
  return api.get("users/me");
};

export const fetchUsers = (userType = "") => {
  return api.get(`users/?userType=${userType}`);
};

export const fetchProfessional = () => {
  return api.get("users/professionals");
};

export const updateUser = (userDetail) => {
  return api.patch(`users`, userDetail);
};

export const deleteUser = (id) => {
  return api.delete(`users/${id}`);
};

export const uploadImage = (userDetail) => {
  return api.patch(
    `users/upload/${userDetail.id}`,
    userDetail.profileImageUrl,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
