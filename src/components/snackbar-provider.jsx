import {
  SnackbarProvider as NotistackProvider,
  closeSnackbar,
} from "notistack";
import { useRef } from "react";
import Iconify from "./iconify";

export default function SnackbarProvider({ children }) {
  const notistackRef = useRef(null);

  return (
    <NotistackProvider
      style={{
        backgroundColor: "white",
        color: "black",
        fontWeight: "bold",
      }}
      ref={notistackRef}
      maxSnack={5}
      preventDuplicate
      autoHideDuration={3000}
      variant="success" // Set default variant
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      iconVariant={{
        info: <Iconify color={"info"} icon="eva:info-fill" width={24} />,
        success: (
          <Iconify
            color={"success"}
            height={30}
            icon="eva:checkmark-circle-2-fill"
            width={24}
          />
        ),
        warning: (
          <Iconify
            color={"warning"}
            icon="eva:alert-triangle-fill"
            width={24}
          />
        ),
        error: <Iconify color={"error"} icon="solar:danger-bold" width={24} />,
      }}
      // with close as default
      action={(snackbarId) => (
        <div onClick={() => closeSnackbar(snackbarId)}>
          <Iconify width={16} icon="mingcute:close-line" />
        </div>
      )}
    >
      {children}
    </NotistackProvider>
  );
}
