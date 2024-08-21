import { Form, useNavigate, useLoaderData, useParams } from "react-router-dom";
import styles from "../Post/PostForm.module.css";
export default function PostForm() {
  const navigate = useNavigate();
  const post = useLoaderData();
  const postDetails = post.post;
  const data  = useParams();
  const postId = data.postId;
  let formTitle 
  
  formTitle = postId ? "Edit Post" : "New Post"
  return (
    <>
      <h1>{formTitle}</h1>
      <div className={styles.wrapper}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          Back{" "}
        </button>
        <Form method="post" action={postId ? `/post/${postId}/edit` :  `/post`}>
          <div className={styles.title}>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" defaultValue={postDetails?.title || ""} />
          </div>
          <div className={styles.description}>
            <label htmlFor="description">Description:</label>
            <textarea name="description" defaultValue={postDetails?.description || ""}/>
          </div>
          <button type="submit">{formTitle}</button>
        </Form>
      </div>
    </>
  );
}
