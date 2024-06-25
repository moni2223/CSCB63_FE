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
import Schedule from "../../screens/Schedule";
import EditMark from "../../screens/References/Operations/EditMark";
import EditAbsence from "../../screens/References/Operations/EditAbsence";
import AddStudent from "../../screens/ClassMates/AddStudent";
import Teachers from "../../screens/Teachers/Teachers";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import AddTeacher from "../../screens/Teachers/Operations/AddTeacher";
import EditTeacher from "../../screens/Teachers/Operations/EditTeacher";
import EditStudent from "../../screens/ClassMates/EditStudent";

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
  const { modal } = useSelector(({ general }) => general) || null;
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
    {
      path: "/schedule",
      element: (
        <PrivateRoute>
          <Schedule />
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
    {
      path: "/edit-mark",
      element: (
        <PrivateRoute>
          <EditMark />
        </PrivateRoute>
      ),
    },
    {
      path: "/edit-absence",
      element: (
        <PrivateRoute>
          <EditAbsence />
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
  const principleRoutes = [
    {
      path: "/teachers",
      element: (
        <PrivateRoute>
          <Teachers />
        </PrivateRoute>
      ),
    },
    {
      path: "/add-teacher",
      element: (
        <PrivateRoute>
          <AddTeacher />
        </PrivateRoute>
      ),
    },
    {
      path: "/edit-teacher",
      element: (
        <PrivateRoute>
          <EditTeacher />
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
    {
      path: "/add-student",
      element: (
        <PrivateRoute>
          <AddStudent />
        </PrivateRoute>
      ),
    },
    {
      path: "/edit-student",
      element: (
        <PrivateRoute>
          <EditStudent />
        </PrivateRoute>
      ),
    },
    ...studentRoutes,
    ...profileRoutes,
    ...teacherRoutes,
    ...principleRoutes,
  ];

  return (
    <>
      {User.isAuthenticated && <Header />}
      {modal?.open && <ModalComponent options={modal} />}
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
