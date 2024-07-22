import { useGlobalContext } from "../contexts/GlobalContext";

export default async function homeLoader() {
    const API = import.meta.env.VITE_API;
    const token = localStorage.getItem("token");
    const { setLoadingState } = useGlobalContext();

    try {
      setLoadingState(true)
      const url = `${API}/home`;
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          Authorization: token ? token : null,
        },
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Response("Failed to fetch blog posts", { status: 500 });
    }
    finally {
     setLoadingState(false)
    }
  }