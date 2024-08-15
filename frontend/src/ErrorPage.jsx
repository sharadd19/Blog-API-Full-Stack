import { useRouteError, useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.css";
export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage;
  let errorStatus;

  if (error instanceof Response) {
    errorMessage = error.statusText;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorStatus = "Error";
  } else {
    errorMessage = error.data;
    errorStatus = error.status;
  }
  const navigate = useNavigate();

  return (
    <div id="error-page">
      <h1>Oops! {errorStatus}</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
      <button className={styles.back} onClick={() => navigate(-1)}>
            Back{" "}
          </button>
    </div>
  );
}