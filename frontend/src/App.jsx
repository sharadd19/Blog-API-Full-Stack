import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import Post from "./components/Post/Post";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { Link, useLoaderData, redirect } from "react-router-dom";
// import { useGlobalContext } from "./contexts/GlobalContext";
function App() {
  // const { loading } = useGlobalContext();
  const [user, setUser] = useState();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;
  async function getBlogPosts() {
    try {
      setLoading(true);
      const url = `${API}/home`;
      console.log("Fetching from URL:", url);
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          Authorization: token ? token : null,
        },
      });
      console.log("Response status:", response.status);
      return response.json();
    } catch (error) {
      throw new Response("Failed to fetch blog posts", { status: 500 });
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      const url = `${API}/logout`;
      console.log("Fetching from URL:", url);
      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: token ? token : null,
        },
      });
      const data = await response.json();

      if (!data.success) {
        throw new Response(data.message, { status: response.status });
      }

      if (data.success) {
        localStorage.removeItem("token");
        setUser(null);
        redirect("/");
      }
    } catch (error) {
      if (error instanceof Response) {
        throw error; // Re-throw if it's already a Response
      } else {
        // For other errors, create a new Response
        throw new Response(error.message || "An unexpected error occurred", {
          status: 500,
          statusText: "Internal Server Error",
        });
      }
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Loading...</h2>
      </div>
    );
  } else if (blogPosts.length === 0) {
    <div className={styles.noPosts}>
      <h2>There are no blog posts.</h2>
    </div>;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h1>BrainBlog</h1>
          </div>
          {isUserLoggedIn ? (
            <button
              className={styles.logout}
              onClick={() => logout()}
              type="button"
            >
              Logout
            </button>
          ) : (
            <div className={styles.links}>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>

        <div className={styles.welcome}>
          {isUserLoggedIn ? (
            <div>
              <h1>Welcome {user.username}! </h1>
              <Link to="/createPostForm"> Create Post</Link>
            </div>
          ) : null}
        </div>

        <div className={styles.postGrid}>
          {blogPosts.map((post) => (
            <div key={post._id} className={styles.post}>
              <Post post={post} user={user} isUserLoggedIn={isUserLoggedIn} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
