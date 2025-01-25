import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import NoMatch from "./pages/NoMatch.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import CreateBlogPost from "./pages/CreateBlogPost.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Forum from "./pages/Forum.jsx";
import Account from "./components/dashboardComponents/Account.jsx";
import Messages from "./components/dashboardComponents/Messages.jsx";
import Search from "./components/dashboardComponents/Search.jsx";
import Policies from "./components/dashboardComponents/Policies.jsx";
import Support from "./components/dashboardComponents/Support.jsx";
import DashboardHome from "./components/dashboardComponents/DashboardHome.jsx";
import AdminActions from "./components/dashboardComponents/AdminActions.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogPost />,
      },
      {
        path: "/create-blog",
        element: <CreateBlogPost />,
      },
      {
        path: "/admin-actions",
        element: <AdminActions />,
      },
      {
        path: "/dashboard/*",
        element: <Dashboard />,
        children: [
          {
            path: "dashboardhome",
            element: <DashboardHome />,
          },
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "messages",
            element: <Messages />,
          },
          {
            path: "search",
            element: <Search />,
          },
          {
            path: "policies",
            element: <Policies />,
          },
          {
            path: "support",
            element: <Support />,
          },
        ],
      },
      {
        path: "/forum",
        element: <Forum />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
