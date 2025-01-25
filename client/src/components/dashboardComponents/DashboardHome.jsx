import { useContext } from "react";
import AuthContext from "../../utils/AuthContext";
import { Link } from "react-router-dom";
import UserRecentActivity from "./UserRecentActivity";

// eslint-disable-next-line react/prop-types
function DashboardHome() {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8 bg-gray-100 h-full">
      <div className="bg-white shadow-lg rounded-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-gray-600">
          Here’s a summary of your recent activity and what’s happening in the
          community.
        </p>
      </div>

      {/* Show blog creation option for writers and admins */}
      {(user?.role === "admin" || user?.role === "writer") && (
        <div className="bg-white shadow-lg rounded-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Create a New Blog Post</h2>
          <Link to="/create-blog" className="text-blue-600 hover:underline">
            Create Blog Post
          </Link>
        </div>
      )}

      {/* Admin-only options */}
      {user?.role === "admin" && (
        <div className="bg-white shadow-lg rounded-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Admin Actions</h2>
          <Link to="/admin-actions" className="text-blue-600 hover:underline">
            Manage Users
          </Link>
        </div>
      )}

      {/* Display recent activity for each user */}
      <UserRecentActivity />
    </div>
  );
}

export default DashboardHome;
