import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import Post from "./components/Post/Post";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import SignUp from "./components/SignUp/SignUp";
import { Link, useLoaderData } from "react-router-dom";
//import { useGlobalContext } from "./contexts/GlobalContext";
function App() {
  //const { loading } = useGlobalContext();

  const data = useLoaderData();
  console.log(data);
  const { user, postList } = data;

  const isUserLoggedIn = user ? true : false;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>BrainBlog</h1>
        </div>
        {isUserLoggedIn ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <div className={styles.links}>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>

      <div className={styles.welcome}>
        {isUserLoggedIn ? <h1>Welcome back {user.username}! </h1> : null}
      </div>

      <div className={styles.postGrid}>
        {postList.length > 0 ? (
          postList.map((post) => (
            <div key={post._id} className={styles.post}>
              <Post post={post} isUserLoggedIn={isUserLoggedIn} />
            </div>
          ))
        ) : (
          <p>No blog posts available.</p>
        )}
      </div>
    </div>
  );
}

export default App;
