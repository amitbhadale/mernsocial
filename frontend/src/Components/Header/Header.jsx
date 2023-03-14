import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  Add,
  Search,
  AccountCircle,
  HomeOutlined,
  AddOutlined,
  SearchOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";

const Header = () => {
  const [path, setPath] = useState(window.location.pathname);
  return (
    <div className="header">
      <Link to="/" onClick={() => setPath("/")}>
        {path === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
      </Link>

      <Link to="/newpost" onClick={() => setPath("/newpost")}>
        {path === "/newpost" ? (
          <Add style={{ color: "black" }} />
        ) : (
          <AddOutlined />
        )}
      </Link>
      <Link to="/search" onClick={() => setPath("/search")}>
        {path === "/search" ? (
          <Search style={{ color: "black" }} />
        ) : (
          <SearchOutlined />
        )}
      </Link>
      <Link to="/account" onClick={() => setPath("/account")}>
        {path === "/account" ? (
          <AccountCircle style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>
    </div>
  );
};

export default Header;
