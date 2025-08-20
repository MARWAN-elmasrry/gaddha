import { StartBtn } from "../../startBtn"
import "./footStyle.css"
import { useLocation } from "react-router-dom"

const Footer = () => {
  const location = useLocation()
  const isUserPage =
    location.pathname === "/user"

  return (
    <>
      <div className="foot">
        <div className="container">
          <div className="foot-cont">
            <div
              className="back-img"
              style={
                !isUserPage
                  ? { display: "" }
                  : { display: "none" }
              }
            >
              <div className="info-f">
                <h1>
                  قدها ولابس سوالف؟
                </h1>
                <h3> !ورنا الحين</h3>
                <StartBtn />
              </div>
              <img
                src="./hero.png"
                alt=""
              />
              <img
                src="./herof.png"
                alt=""
              />
              <img
                src="./logo.png"
                alt=""
                style={{ width: 120 }}
              />
            </div>
            <div
              className="camel"
              style={
                isUserPage
                  ? {
                      display: "flex",
                      justifyContent:
                        "space-between",
                      width: "100%",
                      alignItems:
                        "center",
                    }
                  : { display: "none" }
              }
            >
              <img
                src="./camel.png"
                alt=""
              />
              <img
                src="./cam.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="links">
          <div className="link-cont">
            <div className="f-links">
              <div className="all-links">
                <div className="game-links">
                  <p>صفحات</p>
                  <a href="#">
                    الرئيسية
                  </a>
                  <a href="#">تواصل</a>
                  <a href="#">تسجيل</a>
                  <a href="#">
                    انشائ لعبة
                  </a>
                  <a href="#">ألعابي</a>
                </div>
                <div className="police-links">
                  <p>السياسات</p>
                  <a href="#">
                    سياسة الخصوصية
                  </a>
                  <a href="#">
                    سياسة الاسترداد
                  </a>
                </div>
              </div>
              <div className="f-logo">
                <img
                  src="./logo.png"
                  alt=""
                />
                <h2>
                  قدها ولا بس سوالف؟
                </h2>
                <div className="line"></div>
              </div>
            </div>
            <div className="p-police">
              <p>
                2025 قدّها, كل الحقوق
                محفوظة
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
