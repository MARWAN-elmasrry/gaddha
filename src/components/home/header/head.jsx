import "./hStyle.css"
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom"
import {
  useSelector,
  useDispatch,
} from "react-redux"
import { logoutUser } from "../../../userSlice"
import { StartBtn } from "../../startBtn"
import { useEffect } from "react"

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(
    (state) => state.users.user
  )

  const menuItems = [
    { path: "/", label: "الرئيسية" },
    {
      path: "/contact",
      label: "تواصل",
    },
    { path: "/games", label: "إلعب" },
    {
      path: "/packages",
      label: "الباقات",
    },
  ]

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/login")
  }

  return (
    <header>
      <div className="container">
        <div className="head-cont">
          <div className="links">
            <div className="side-menu">
              <span className="icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <ul className="open">
                {menuItems.map(
                  (item) => (
                    <li
                      key={item.path}
                      className={
                        location.pathname ===
                        item.path
                          ? "active"
                          : ""
                      }
                    >
                      <NavLink
                        to={item.path}
                      >
                        {item.label}
                        {location.pathname ===
                          item.path && (
                          <img
                            src="./dashr.png"
                            alt=""
                          />
                        )}
                      </NavLink>
                    </li>
                  )
                )}

                {user && (
                  <>
                    {/* رابط صفحة حسابي */}
                    <li
                      className={
                        location.pathname ===
                        "/user"
                          ? "active"
                          : ""
                      }
                    >
                      <NavLink to="/user">
                        حسابي
                        {location.pathname ===
                          "/user" && (
                          <img
                            src="./dashr.png"
                            alt=""
                          />
                        )}
                      </NavLink>
                    </li>

                    {/* زر تسجيل الخروج */}
                    <li className="exit">
                      <button
                        onClick={
                          handleLogout
                        }
                        className="logout-btn"
                      >
                        تسجيل الخروج{" "}
                        <img
                          src="./exit.png"
                          alt=""
                          style={{
                            width: 20,
                          }}
                        />
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {user ? (
              <>
                <button className="points">
                  <img
                    src="./ydot.png"
                    alt=""
                    style={{
                      width: 25,
                    }}
                  />{" "}
                  {user.coins}
                </button>
                <StartBtn />
              </>
            ) : (
              <button
                onClick={() =>
                  navigate("/login")
                }
                className="play"
              >
                تسجيل
              </button>
            )}
          </div>
          <a href="/">
            <img
              src="./logo.png"
              alt="logo"
              style={{ width: 100 }}
            />
          </a>
        </div>
      </div>
    </header>
  )
}
export default Header
