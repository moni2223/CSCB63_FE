import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes/Routes";
import "react-datepicker/dist/react-datepicker.css";
import { User } from "./utilities/User";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_URL } from "./config/settings";
import "./App.scss";
import { checkUser } from "./actions";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(({ general }) => general) || {};
  useEffect(() => {
    if (User.isAuthenticated) {
      dispatch(checkUser(User.getUser()));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
