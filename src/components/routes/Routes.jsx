import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { User } from "../../utilities/User";
import Login from "../../screens/Login";
import LoaderGlobal from "../LoaderGlobal";
import Header from "../Header/Header";

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
  // const privateRoutes = [
  //   {
  //     path: "/",
  //     element: (
  //       <PrivateRoute>
  //         {" "}
  //         <Insurances />
  //       </PrivateRoute>
  //     ),
  //   },
  //   {
  //     path: "/add-insurance",
  //     element: (
  //       <PrivateRoute>
  //         <AddInsurance />
  //       </PrivateRoute>
  //     ),
  //   },
  // ];
  return (
    <>
      {User.isAuthenticated && !location.pathname.includes("/login") && <Header />}
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        {/* {privateRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))} */}
      </Routes>
      <LoaderGlobal />
    </>
  );
};

export default RoutesCamp;
