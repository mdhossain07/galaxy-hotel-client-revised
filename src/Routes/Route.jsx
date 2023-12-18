import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Rooms from "../Pages/Rooms/Rooms";
import MyRooms from "../Pages/MyRooms/MyRooms";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import UpdateRoom from "../Pages/UpdateRoom/UpdateRoom";
import ContactUs from "../Pages/ContactUs";
import TermsOfUse from "../Pages/TermsOfUse";
import PrivacyPolicy from "../Pages/PrivacyPolicy";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/room/:id",
        element: <RoomDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5001/rooms/${params.id}`),
      },
      {
        path: "/my-rooms",
        element: (
          <PrivateRoute>
            <MyRooms />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-room/:id",
        element: <UpdateRoom />,
        loader: ({ params }) =>
          fetch(`http://localhost:5001/booking/${params.id}`),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/terms-of-use",
        element: <TermsOfUse />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
    ],
  },
]);

export default routes;
