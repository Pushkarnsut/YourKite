// import { useState } from "react";
// import {Link,useNavigate} from "react-router-dom";
// import axios from "axios";
// import API from "../Api";

// export default function Menu({user}) {
//   const [selectedMenu, setSelectedMenu] = useState(0);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const navigate = useNavigate();
//   const LANDINGPAGE_URL = import.meta.env.VITE_LANDING_PAGE_URL;
  
//   const profileClick = (index) =>{
//     setProfileOpen(!profileOpen);
//   };
//   const menuClick = (index) => {
//     setSelectedMenu(index);
//   };

//   const handleLogout = async () => {
//     try {
//       await API.post("/logout", {}, { withCredentials: true });
//       setProfileOpen(false);
//       window.location.href = LANDINGPAGE_URL;
//     } catch (error) {
//       alert("Logout failed. Please try again.");
//     }
//   };

//   const menuClass="menu";
//   const activeMenuClass = "menu selected";

//   return (
//     <div className="menu-container">
//       <img src="kitelogo.png" style={{ width: "55px" }} />
//       <div className="menus">
//         <ul>
//           <li>
//             <Link to="/" className={selectedMenu === 0 ? activeMenuClass : menuClass} onClick={() => menuClick(0)}>
//               <p>Summary</p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/orders" className={selectedMenu === 1 ? activeMenuClass : menuClass} onClick={() => menuClick(1)}>
//               <p>Orders</p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/holdings" className={selectedMenu === 2 ? activeMenuClass : menuClass} onClick={() => menuClick(2)}>
//               <p>Holdings</p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/positions" className={selectedMenu === 3 ? activeMenuClass : menuClass} onClick={() => menuClick(3)}>
//               <p>Positions</p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/funds" className={selectedMenu === 4 ? activeMenuClass : menuClass} onClick={() => menuClick(4)}>
//               <p>Funds</p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/appmain" className={selectedMenu === 5 ? activeMenuClass : menuClass} onClick={() => menuClick(5)}>
//               <p>Apps</p>
//             </Link>
//           </li>
//         </ul>
//         <hr />
//         <div className="profile-wrap" style={{ position: "relative" }} >
//           <div className="profile" onClick={profileClick}>
//           <div className="avatar">{user.name.charAt(0).toUpperCase() || "U"}</div>
//           <p className="username">{user.username}</p>
//           </div>
//           {profileOpen && (
//             <div className="profileopen-dropdown">
//               <button className="logout-btn" onClick={handleLogout}>
//                 <i className="fa fa-sign-out" style={{ marginRight: "8px" }}></i>
//                 Logout
//               </button>
              
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import API from "../Api";
import { useTheme } from "../context/ThemeContext";

export default function Menu({user}) {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const LANDINGPAGE_URL = import.meta.env.VITE_LANDING_PAGE_URL;
  const { isDarkMode, toggleTheme } = useTheme();
  
  const profileClick = (index) =>{
    setProfileOpen(!profileOpen);
  };
  
  const menuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleLogout = async () => {
    try {
      await API.post("/logout", {}, { withCredentials: true });
      setProfileOpen(false);
      window.location.href = LANDINGPAGE_URL;
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  const handleThemeToggle = () => {
    toggleTheme();
    setProfileOpen(false);
  };

  const menuClass="menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="kitelogo.png" style={{ width: "55px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link to="/" className={selectedMenu === 0 ? activeMenuClass : menuClass} onClick={() => menuClick(0)}>
              <p>Summary</p>
            </Link>
          </li>
          <li>
            <Link to="/orders" className={selectedMenu === 1 ? activeMenuClass : menuClass} onClick={() => menuClick(1)}>
              <p>Orders</p>
            </Link>
          </li>
          <li>
            <Link to="/holdings" className={selectedMenu === 2 ? activeMenuClass : menuClass} onClick={() => menuClick(2)}>
              <p>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to="/positions" className={selectedMenu === 3 ? activeMenuClass : menuClass} onClick={() => menuClick(3)}>
              <p>Positions</p>
            </Link>
          </li>
          <li>
            <Link to="/funds" className={selectedMenu === 4 ? activeMenuClass : menuClass} onClick={() => menuClick(4)}>
              <p>Funds</p>
            </Link>
          </li>
          <li>
            <Link to="/appmain" className={selectedMenu === 5 ? activeMenuClass : menuClass} onClick={() => menuClick(5)}>
              <p>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile-wrap" style={{ position: "relative" }}>
          <div className="profile" onClick={profileClick}>
            <div className="avatar">{user.name.charAt(0).toUpperCase() || "U"}</div>
            <p className="username">{user.username}</p>
          </div>
          {profileOpen && (
            <div className="profileopen-dropdown">
              <button className="theme-toggle-option" onClick={handleThemeToggle}>
                <span className="dropdown-icon">{isDarkMode ? "☀️" : "🌙"}</span>
                <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>

              <button className="logout-btn" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}