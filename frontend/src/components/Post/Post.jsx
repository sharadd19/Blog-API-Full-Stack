export default function Post({ post, isUserLoggedIn }) {
  

  return (
    <>
      <div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <p>{post.date_formatted}</p>
        <p style={{ fontStyle: "italic" }}>
          {isUserLoggedIn ? post.author.username : null}
        </p>
      </div>
    </>
  );
}
