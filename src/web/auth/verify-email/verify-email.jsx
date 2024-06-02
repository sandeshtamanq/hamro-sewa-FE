import { useNavigate, useSearchParams } from "react-router-dom";
import ScreenSplash from "../../../components/splash-loader";
import { useVerifyEmailMutation } from "../../../hooks/useAuth";
import { useCallback, useEffect } from "react";
import { useSnackbar } from "notistack";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(
    (data) => {
      if (data.status === 201) {
        ("here");
        enqueueSnackbar("Email verified successfully!");
        navigate("/login");
      }
    },
    [enqueueSnackbar, navigate]
  );
  const onError = useCallback(
    (data) => {
      if (data?.response?.status === 400) {
        if (Array.isArray(data?.response?.data?.message)) {
          data.response.data.message;
          enqueueSnackbar(data.response.data.message[0], {
            variant: "error",
          });
        } else {
          enqueueSnackbar(data?.response?.data?.message, { variant: "error" });
        }
      }
    },
    [enqueueSnackbar]
  );

  const { mutate: verifyEmailMutation } = useVerifyEmailMutation(
    onSuccess,
    onError
  );

  useEffect(() => {
    const token = searchParams.get("token");
    verifyEmailMutation(token);
  }, [searchParams, verifyEmailMutation]);
  return <ScreenSplash />;
}
