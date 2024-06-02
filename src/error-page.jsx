import { useRouteError } from "react-router-dom";
import PageNotFound from "./components/page-not-found";

export default function ErrorPage() {
  const error = useRouteError();

  if (error.status === 404) return <PageNotFound />;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
