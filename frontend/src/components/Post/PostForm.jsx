import { Form, Link, useNavigate } from "react-router-dom";
import styles from "../Post/PostForm.module.css";
export default function PostForm() {
  const navigate = useNavigate();
  return (
    <>
      <h1>New Post</h1>
      <div className={styles.wrapper}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          Back{" "}
        </button>
        <Form method="post">
          <div className={styles.title}>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" />
          </div>
          <div className={styles.description}>
            <label htmlFor="description">Description:</label>
            <textarea name="description" />
          </div>
          <button type="submit">Create Post</button>
        </Form>
      </div>
    </>
  );
}
