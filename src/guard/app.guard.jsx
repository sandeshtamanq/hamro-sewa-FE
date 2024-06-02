import { useCallback } from "react";
import { useFetchMeQuery } from "../hooks/useUser";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import ScreenSplash from "../components/splash-loader";

export default function AppGuard({ children }) {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const onSuccess = useCallback(
    (data) => {
      dispatch({ type: "LOGIN", payload: data.data });
    },
    [dispatch]
  );
  const onError = useCallback(() => {
    navigate("/");
  }, [navigate]);
  const { isLoading } = useFetchMeQuery(onSuccess, onError);

  if (isLoading)
    return (
      <div>
        <ScreenSplash />
      </div>
    );

  return <>{children}</>;
}
