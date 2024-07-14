import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import Post from "./components/Post/Post";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import SignUp from "./components/SignUp/SignUp";
import { Link } from "react-router-dom";

function App() {
  const [user, setUser] = useState();
  const [blogPosts, setBlogPosts] = useState([]);

  const API = import.meta.env.VITE_API;

  async function getBlogPosts() {
    try {
      const url = `${API}/api/home`;
      console.log("Fetching from URL:", url);
      const response = await fetch(url, { mode: "cors" });
      console.log("Response status:", response.status);
      const text = await response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    getBlogPosts().then((data) => {
      const user = data.user;
      const postList = data.postList;
      setUser(user);
      setBlogPosts(postList);
    });
  }, []);

  const isUserLoggedIn = user ? true : false;

  console.log(user);
  console.log(blogPosts);
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
        {isUserLoggedIn ? <h1>Welcome back {user}! </h1> : null}
      </div>

      <div className={styles.postGrid}>
        {blogPosts.map((post) => (
          <div key={post._id} className={styles.post}>
            <Post post={post} isUserLoggedIn={isUserLoggedIn} />
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default App;
