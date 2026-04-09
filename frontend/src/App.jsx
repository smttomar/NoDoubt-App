import { useEffect, useState, useRef } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const WS_URL = import.meta.env.VITE_WS_URL;

function App() {
    const [posts, setPosts] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const wsRef = useRef(null);
    const debounceRef = useRef(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL);
            setPosts(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
        wsRef.current = new WebSocket(WS_URL);

        wsRef.current.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        return () => {
            if (wsRef.current) wsRef.current.close();
        };
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(async () => {
            if (!value.trim()) {
                fetchPosts();
                return;
            }

            setLoading(true);

            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(value);
                wsRef.current.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        setPosts(data);
                    } catch (err) {
                        console.error("Parsing error:", err);
                    } finally {
                        setLoading(false);
                    }
                };
            }
        }, 400);
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    NoDoubt App
                </h1>
                <p className="text-gray-500 mt-2">
                    Real-time search using WebSocket
                </p>
            </div>
            <div className="max-w-4xl mx-auto mb-6">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={query}
                    onChange={handleSearch}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 
                     focus:outline-none shadow-sm"
                />
            </div>
            <div className="max-w-4xl mx-auto">
                {loading ? (
                    <div className="text-center text-gray-500 animate-pulse">
                        Loading posts...
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No posts found!
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                className="bg-white p-5 rounded-2xl shadow 
                           hover:shadow-lg transition duration-200"
                            >
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    {post.title}
                                </h2>

                                <p className="text-gray-600 text-sm">
                                    {post.body}
                                </p>

                                <p className="mt-2 text-right">
                                    <span className="text-gray-400 text-xs">
                                        {post.createdAt
                                            ? new Date(
                                                  post.createdAt,
                                              ).toLocaleString()
                                            : ""}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
