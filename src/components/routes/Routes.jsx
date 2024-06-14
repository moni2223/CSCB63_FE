import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { User } from "../../utilities/User";
import Login from "../../screens/Login";
import LoaderGlobal from "../LoaderGlobal";
import Header from "../Header/Header";
import Home from "../../screens/Home";
import References from "../../screens/References";

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
  const privateRoutes = [
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Home />
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
