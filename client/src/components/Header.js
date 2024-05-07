import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("https://blog-app-mern-0a1m.onrender.com/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        setUserInfo(data);
      });
    });
  }, [setUserInfo]);

  const logout = () => {
    fetch("https://blog-app-mern-0a1m.onrender.com/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        Blog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">New Post</Link>
            <a href="/" onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};
