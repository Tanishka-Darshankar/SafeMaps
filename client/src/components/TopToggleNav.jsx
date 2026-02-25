import { NavLink, useLocation } from "react-router-dom";
import "./TopToggleNav.css";

const TopToggleNav = () => {
  const location = useLocation();

  const links = [
    { path: "/report", label: "🚨 Stay Safe – Report Now" },
    { path: "/route", label: "🗺️ Plan a Route" },
    { path: "/history", label: "📊 Travel & Danger History" },
  ];

  return (
    <div className="top-toggle-container-left">
      {links
        .filter(link => link.path !== location.pathname)
        .map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className="toggle-nav-btn"
          >
            {link.label}
          </NavLink>
        ))}
    </div>
  );
};

export default TopToggleNav;
