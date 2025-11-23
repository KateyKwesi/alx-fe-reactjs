import { useState } from "react";
import { searchUsers } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleSearch = async (e, nextPage = 1) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await searchUsers({
        username,
        location,
        minRepos,
        page: nextPage,
      });

      if (nextPage === 1) {
        setUsers(data.items);
      } else {
        setUsers((prev) => [...prev, ...data.items]);
      }

      setHasMore(data.items.length > 0);
      setPage(nextPage);
    } catch (err) {
      console.log(err);
      setError("Error fetching results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <form
        className="bg-white shadow-lg rounded-lg p-6 space-y-4"
        onSubmit={(e) => handleSearch(e)}
      >
        <h2 className="text-xl font-bold mb-2">Advanced GitHub User Search</h2>

        <div>
          <label className="block font-medium mb-1">Username</label>
          <input
            className="w-full border p-2 rounded"
            type="text"
            placeholder="octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            className="w-full border p-2 rounded"
            type="text"
            placeholder="San Francisco"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Minimum Repositories</label>
          <input
            className="w-full border p-2 rounded"
            type="number"
            min="0"
            placeholder="10"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="mt-6 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center bg-white shadow p-4 rounded-lg"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {hasMore && !loading && (
        <div className="text-center mt-4">
          <button
            onClick={(e) => handleSearch(e, page + 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
