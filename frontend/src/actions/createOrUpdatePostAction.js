import { redirect, useParams } from "react-router-dom";

export default async function createOrUpdatePostAction({ request, params }) {
  const API = import.meta.env.VITE_API;
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const token = localStorage.getItem("token");
  debugger;
  const { postId } = params;
  const verb = postId ? "PUT" : "POST"
  const url = postId ? `${API}/post/${postId}` : `${API}/post/` 
  try {
   debugger;
    const response = await fetch(url, {
      method: verb,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : null
      },
      body: JSON.stringify({
        title: title,
        description: description,
       
      }),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Response(data.message, { status: response.status });
    }
    
    else {
      
      // Navigate to dashboard after successful post creation.
      return redirect("/");
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
  }
}
