import api from "./api";

export function login(loginCredential) {
  return api.post("auth/login", loginCredential);
}

export function register(userCredential) {
  return api.post("auth/sign-up", userCredential);
}

export function logout() {
  return api.post("auth/sign-out");
}

export function forgotPassword(email) {
  return api.post(
    "auth/forgot-password",
    { email },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

export function verifyEmail(token) {
  return api.post(
    `auth/verify-email`,
    { token },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

export function changePassword(passwordInfo) {
  return api.patch("auth/change-password", passwordInfo);
}

export function resetPassword(passwordInfo) {
  return api.patch("auth/reset-password", passwordInfo);
}
