import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";

function Search() {
  const [searchType, setSearchType] = useState("posts");
  const [query, setQuery] = useState("");
  const [author, setAuthor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Every time the searchType changes results are cleared ie toggling back and forth bewtween search by blog post/comment
  useEffect(() => {
    setResults([]);
    setError(null);
  }, [searchType]);

  //handleSearch function
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();

    if (query) params.append("query", query);
    if (author) params.append("author", author);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    //SearchType is changed when the button is toggled to point to appropriate endpoint
    const endpoint =
      searchType === "posts"
        ? `${API_BASE_URL}/blogPosts/search`
        : `${API_BASE_URL}/comments/search`;

    try {
      const response = await fetch(`${endpoint}?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }

      setResults(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-md p-6 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      {/* Search Type Toggle */}
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="posts"
            checked={searchType === "posts"}
            onChange={() => setSearchType("posts")}
            className="mr-2"
          />
          Blog Posts
        </label>
        <label>
          <input
            type="radio"
            value="comments"
            checked={searchType === "comments"}
            onChange={() => setSearchType("comments")}
            className="mr-2"
          />
          Comments
        </label>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        {/*Search by keyword*/}

        <div>
          <label className="block text-gray-700">Keyword</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or content"
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Author Search */}

        <div>
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Search by author"
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Date Range Search */}

        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex-1 mt-4 sm:mt-0">
            <label className="block text-gray-700">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-oriolesOrange hover:bg-orange-300 text-white font-bold py-2 px-4 rounded w-full sm:w-auto "
        >
          Search
        </button>
      </form>

      {/* Display Results */}
      <div className="mt-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && results.length > 0 && (
          <ul className="space-y-4">
            {results.map((item) =>
              searchType === "posts" ? (
                //If searchType = posts render the blog post results
                <li key={item.id} className="bg-gray-50 p-4 rounded-md shadow">
                  <Link
                    to={`/blog/${item.id}`}
                    className="block hover:bg-orange-300 py-2 px-2 rounded-md"
                  >
                    <h2 className="text-lg sm:text-xl font-bold">
                      {item.title}
                    </h2>
                    <p className="text-lg sm:text-base text-gray-700 mt-2">
                      {item.content.slice(0, 100)}...
                    </p>
                    <p className="text-sm text-gray-500">
                      By {item.author?.username || "Unknown"} on{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                </li>
              ) : (
                //If searchType = comments render the comments results
                <li
                  key={item.id}
                  className="bg-gray-50 p-4 rounded-md shadow hover:bg-gray-100"
                >
                  <p className="text-gray-700">{item.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    By {item.author?.username || "Unknown"} on{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                    <br />
                    On Post:{" "}
                    <Link
                      to={`/blogPosts/${item.post?.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item.post?.title || "Unknown"}
                    </Link>
                  </p>
                </li>
              )
            )}
          </ul>
        )}
        {!loading && !error && results.length === 0 && <p>No results found.</p>}
      </div>
    </div>
  );
}

export default Search;
