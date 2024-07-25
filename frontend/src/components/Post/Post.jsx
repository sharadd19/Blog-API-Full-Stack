import styles from "../Post/Post.module.css"
export default function Post({ post, user, isUserLoggedIn }) {
  let userIsAuthor;
  if (user) {
    userIsAuthor = post.author._id === user._id ? true : false;
  }

  return (
    <>
      <div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <p>{post.date_formatted}</p>
        <p style={{ fontStyle: "italic" }}>
          {isUserLoggedIn ? post.author.username : null}
        </p>
        {userIsAuthor && (
          <div className={styles.buttonGroup}>
            <button>Edit</button> 
            <button>Delete</button>
          </div>
        )}
      </div>
    </>
  );
}
