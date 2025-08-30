import { StartBtn } from "../../startBtn"
import "./footStyle.css"
import { useLocation, Link } from "react-router-dom"

const Footer = () => {
  const location = useLocation()
  const isUserPage = location.pathname === "/user"

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
                <p>صفحات</p>
                <Link to="/">الرئيسية</Link>
                <Link to="/contact">تواصل</Link>
                {isLoggedIn ? (<>
                  <Link to="/user">حسابى</Link>               
                </>):(<>
                  <Link to="/login">تسجيل</Link>

                </>)}
                <Link to="/games">إنشاء لعبة</Link>
                <Link to="/games">ألعابي</Link>
              </div>

              <div className="police-links">
                <p>السياسات</p>
                <Link to="/privacy">سياسة الخصوصية</Link>
                <Link to="/refund">سياسة الاسترداد</Link>
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

export default Footer;
