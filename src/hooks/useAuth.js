import { useMutation } from "react-query";
import {
  changePassword,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "../api/auth.api";

export const useLoginMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: login, onError, onSuccess });
};

export const useSignUpMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: register, onError, onSuccess });
};

export const useForgotPasswordMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: forgotPassword, onError, onSuccess });
};

export const useSignOutMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: logout, onError, onSuccess });
};

export const useVerifyEmailMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: verifyEmail, onError, onSuccess });
};

export const useUpdatePasswordMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: changePassword, onError, onSuccess });
};

export const useResetPasswordMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: resetPassword, onError, onSuccess });
};
