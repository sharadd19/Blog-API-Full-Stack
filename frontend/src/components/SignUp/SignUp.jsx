import { useNavigate, Form, Link } from "react-router-dom";
import styles from "../SignUp/SignUp.module.css";
export default function SignUp() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Create your account!</h1>

      <div className={styles.wrapper}>
        <Form method="post">
          <button className={styles.back} onClick={() => navigate(-1)}>
            Back{" "}
          </button>
          <div className={styles.firstName}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" />
          </div>
          <div className={styles.lastName}>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" name="lastName" />
          </div>
          <div className={styles.username}>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" />
          </div>
          <div className={styles.password}>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" />
          </div>
          <div className={styles.confirmPassword}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" name="confirmPassword" />
          </div>
          <button type="submit" disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" ? "Creating Account..." : "Create Account"}
          </button>
        </Form>
        <div className={styles.signup}>
          or
          <Link to="/login"> Login! </Link>
        </div>
      </div>
    </>
  );
}
