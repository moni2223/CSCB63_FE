import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes/Routes";
import "react-datepicker/dist/react-datepicker.css";
import { User } from "./utilities/User";
import { checkUser } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_URL } from "./config/settings";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(({ general }) => general) || {};
  useEffect(() => {
    if (User.isAuthenticated) {
      dispatch(checkUser(User.getUser()));
      if (socket) {
        socket?.disconnect();
      }
      socket = io(API_URL, { query: `token=${User.getToken()}`, transports: [`polling`] });
      socket.on("connect", () => {
        dispatch(setGeneralFields({ socket }));
      });
    }
  }, [dispatch, user]);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
