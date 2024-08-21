export default async function postFormLoader({ params }) {
  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");
  const { postId } = params; // We check to see if we're creating a post or editing a post
  try {
    if (postId) {
      //Editing a post
      const url = `${API}/post/${postId}`;
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          Authorization: token ? token : null,
        },
      });

      const data = await response.json();
      return data;
    }
    return {}; //Creating a post
  } catch (error) {
    throw new Response("Failed to fetch post", { status: 500 });
  }
}
