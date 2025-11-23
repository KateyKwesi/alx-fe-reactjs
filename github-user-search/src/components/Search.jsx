import { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleSingleUser = async (username) => {
    try {
      const data = await fetchUserData(username);
      setUsers([data]);
      setError("");
      setHasMore(false);
    } catch (err) {
      setUsers([]);
      setError("Looks like we cant find the user");
    }
  };

  const handleAdvancedSearch = async (e, nextPage = 1) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (username && !location && !minRepos) {
        await handleSingleUser(username);
      } else {
        const data = await searchUsers({
          username,
          location,
          minRepos,
          page: nextPage,
        });

        if (data.items.length === 0 && nextPage === 1) {
          setError("Looks like we cant find the user");
        }

        if (nextPage === 1) {
          setUsers(data.items);
        } else {
          setUsers((prev) => [...prev, ...data.items]);
        }

        setHasMore(data.items.length > 0);
        setPage(nextPage);
      }
    } catch (err) {
      setUsers([]);
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Search Form */}
      <form
        className="bg-white shadow-lg rounded-lg p-6 space-y-4"
        onSubmit={handleAdvancedSearch}
      >
        <h2 className="text-xl font-bold mb-2">GitHub User Search</h2>

        <div>
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            placeholder="octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            placeholder="San Francisco"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Minimum Repositories</label>
          <input
            type="number"
            min="0"
            placeholder="10"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="w-full border p-2 rounded"
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
              <p className="text-gray-700">{user.location || "No location"}</p>
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
            onClick={(e) => handleAdvancedSearch(e, page + 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
