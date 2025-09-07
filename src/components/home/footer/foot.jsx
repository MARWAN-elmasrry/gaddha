import { StartBtn } from "../../startBtn"
import "./footStyle.css"
import { useLocation, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"   

const Footer = () => {
  const location = useLocation()
  const isUserPage = location.pathname === "/user"
  const user = useSelector((state) => state.users.user) 

  const isLoggedIn = Boolean(localStorage.getItem("token"))

  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-cont">
          {!isUserPage && (
            <div className="back-img">
              <div className="info-f">
                <h1>قدها ولابس سوالف؟</h1>
                <h3>!ورنا الحين</h3>
                <StartBtn />
              </div>
              <img src="/hero.png" alt="hero" />
              <img src="/herof.png" alt="herof" />
              <img src="/logo.png" alt="logo" style={{ width: 120 }} />
            </div>
          )}

          {isUserPage && (
            <div className="camel">
              <img src="/camel.png" alt="camel" />
              <img src="/cam.png" alt="camel-deco" />
            </div>
          )}
        </div>
      </div>

      <div className="links">
        <div className="link-cont">
          <div className="f-links">
            <div className="all-links">
              <div className="game-links">
                <p className="game-links-p">صفحات</p>

                <NavLink to="/" className={({ isActive }) => (isActive ? "active-f" : "")}>
                  الرئيسية
                </NavLink>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? "active-f" : "")}>
                  تواصل
                </NavLink>  

                {isLoggedIn ? (
                  <NavLink 
                    to="/user" 
                    className={({ isActive }) => (isActive ? "active-f" : "")}
                  >
                    {user?.role ? "لوحة الإحصائيات" : "حسابى"}
                  </NavLink>
                ) : (
                  <NavLink to="/login" className={({ isActive }) => (isActive ? "active-f" : "")}>
                    تسجيل
                  </NavLink>
                )}

                <NavLink to="/games/create" className={({ isActive }) => (isActive ? "active-f" : "")}>
                  إنشاء لعبة
                </NavLink>
                <NavLink to="/my-games" className={({ isActive }) => (isActive ? "active-f" : "")}>
                  ألعابي
                </NavLink>
              </div>

              <div className="police-links">
                <p className="police-links-p">السياسات</p>
                <NavLink to="/privacy" className={({ isActive }) => (isActive ? "active-f" : "")}>
                  سياسة الخصوصية
                </NavLink>
                <NavLink to="/refund" className={({ isActive }) => (isActive ? "active-f" : "")}>
                  سياسة الاسترداد
                </NavLink>
              </div>
            </div>

            <div className="f-logo">
              <img src="/logo.png" alt="logo" />
              <h2>قدها ولا بس سوالف؟</h2>
              <div className="line"></div>
            </div>
          </div>

          <div className="p-police">
            <p>2025 قدّها, كل الحقوق محفوظة</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
