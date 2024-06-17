import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { User } from "../../utilities/User";
import Login from "../../screens/Login";
import LoaderGlobal from "../LoaderGlobal";
import Header from "../Header/Header";
import Home from "../../screens/Home";
import References from "../../screens/References";
import ClassMates from "../../screens/ClassMates";
import EditProfile from "../../screens/Profile";
import AddMark from "../../screens/References/Operations/AddMark";
import AddAbsence from "../../screens/References/Operations/AddAbsence";

function PrivateRoute({ children }) {
  if (!User.isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function AuthRoute({ children }) {
  let location = useLocation();
  if (User.isAuthenticated) return <Navigate to="/" state={{ from: location }} replace />;
  return children;
}

const RoutesCamp = () => {
  const studentRoutes = [
    {
      path: "/classmates",
      element: (
        <PrivateRoute>
          <ClassMates />
        </PrivateRoute>
      ),
    },
    {
      path: "/references",
      element: (
        <PrivateRoute>
          <References />
        </PrivateRoute>
      ),
    },
  ];
  const teacherRoutes = [
    {
      path: "/add-mark",
      element: (
        <PrivateRoute>
          <AddMark />
        </PrivateRoute>
      ),
    },
    {
      path: "/add-absence",
      element: (
        <PrivateRoute>
          <AddAbsence />
        </PrivateRoute>
      ),
    },
  ];
  const profileRoutes = [
    {
      path: "/edit-profile",
      element: (
        <PrivateRoute>
          <EditProfile />
        </PrivateRoute>
      ),
    },
  ];
  const privateRoutes = [
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
    ...studentRoutes,
    ...profileRoutes,
    ...teacherRoutes,
  ];
  return (
    <>
      {User.isAuthenticated && <Header />}
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        {privateRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <LoaderGlobal />
    </>
  );
};

export default RoutesCamp;
