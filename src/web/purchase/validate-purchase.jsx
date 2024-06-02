import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ScreenSplash from "../../components/splash-loader";
import { useConfirmPaymentMutation } from "../../hooks/usePayment";
import { useSnackbar } from "notistack";

export default function ValidatePurchase() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pidx = searchParams.get("pidx");

  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(() => {
    enqueueSnackbar("Payment successful", { variant: "success" });

    navigate("/dashboard/book-services");
  }, [enqueueSnackbar, navigate]);

  const onError = useCallback(
    (error) => {
      enqueueSnackbar(
        Array.isArray(error?.response?.data?.message)
          ? error?.response?.data?.message[0]
          : error?.response?.data?.message,
        { variant: "error" }
      );
      navigate("/dashboard/profile");
    },
    [enqueueSnackbar, navigate]
  );

  const { mutate: confirmPaymentMutation } = useConfirmPaymentMutation(
    onSuccess,
    onError
  );

  useEffect(() => {
    confirmPaymentMutation(pidx);
  }, [pidx, confirmPaymentMutation]);
  return (
    <div>
      <ScreenSplash />
    </div>
  );
}
