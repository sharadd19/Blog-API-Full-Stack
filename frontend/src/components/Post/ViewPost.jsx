import { Link, useLoaderData, useNavigate } from "react-router-dom";
import styles from "../Post/ViewPost.module.css";
export default function ViewPost() {
  const navigate = useNavigate();

  const data = useLoaderData();
  const post = data.post;
  const user = data.user;
debugger
  let userIsAuthor;
  if (user) {
    userIsAuthor = post.author._id === user._id ? true : false;
  }
  return (
    <div className={styles.wrapper}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        Back{" "}
      </button>
      {userIsAuthor && (( // We need to check that there is a user, and that the user is the author of the post
                  <div className={styles.buttonGroup}>
                    <Link>Edit</Link>
                    <button>Delete</button>
                  </div>
                ))}
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>{post.date_formatted}</p>
      <p>{post.author.username}</p>
    </div>
  );
}
