export default async function postLoader({params}) {
    const API = import.meta.env.VITE_API;
    const token = localStorage.getItem("token")
    debugger
    try {
        const url = `${API}/post/${params.postId}` 
        const response = await fetch(url, {
            mode:"cors",
            headers: {
                Authorization: token ? token : null,
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Response("Failed to fetch post", {status: 500})
    }
}