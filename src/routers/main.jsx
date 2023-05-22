import MainLayout from "@/layout/MainLayout";
import ForumPage from "@/pages/main/ForumPage";
import HomePage from "@/pages/main/HomePage";
import ProfilePage from "@/pages/main/ProfilePage";
import GuardRoute from "./GuardRoute";
import BlogPage from "@/pages/main/BlogPage";
import PersonalPage from "@/pages/main/PersonalPage";
import BookmarkPage from "@/pages/main/BookmarkPage";
import PostDetailPage from "@/pages/main/PostDetailPage";

// Xem cấu trúc route ở https://reactrouter.com/en/main/routers/create-browser-router#routes
export default function init(routes) {
  const route = {
    path: "/",

    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "profile",
        element: (
          <GuardRoute>
            <ProfilePage/>
          </GuardRoute>
        ),
      },
      {
        path: "forum",
        element: <ForumPage/>,
      },
      {
        path: "personal",
        element: (
          <GuardRoute>
            <PersonalPage />
          </GuardRoute>
        ),
      },
      {
        path: "bookmark",
        element: (
          <GuardRoute>
            <BookmarkPage />
          </GuardRoute>
        ),
      },
      {
        path: "post/:postId",
        element: (
          
          <PostDetailPage />
          
        ),
      },
    ],
  };

  routes.push(route);
}
