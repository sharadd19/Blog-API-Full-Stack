import { Form, Link, useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Login</h1>
      <div className={styles.wrapper}>
      <button className={styles.back} onClick={() => navigate(-1)}>Back </button>
        <Form method="post">
          

          <div className={styles.username}>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" />
          </div>
          <div className={styles.password}>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" />
          </div>
          <button type="submit">
            Login
          </button>
        </Form>
        <div className={styles.signup}>
          or
          <Link to="/signup">Create an account!</Link>
        </div>
      </div>
    </>
  );
}
