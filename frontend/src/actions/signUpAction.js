import { redirect } from "react-router-dom";

export default async function signUpAction({ request }) {
  const API = import.meta.env.VITE_API;
  const formData = await request.formData();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword")

  try {
    debugger;
    const url = `${API}/signup`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        confirmPassword: confirmPassword
      }),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Response(data.message, { status: response.status });
    }
    // Assuming the backend sends a token on successful login
    if (data.token) {
      localStorage.setItem("token", data.token);
      // You might also want to store user data if the backend provides it
      // localStorage.setItem('user', JSON.stringify(data.user));

      // Navigate to dashboard after successful login
      return redirect("/");
    } else {
      // If the response doesn't contain a token, it might be an unexpected response
      throw new Response("Login failed: No token received", {
        status: 401,
        statusText: "Unauthorized",
      });
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
