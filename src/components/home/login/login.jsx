import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../api/services/authService";
import { loginAdmin } from "../../../api/services/admingService";
import { setUser } from "../../../userSlice";
import "./lStyle.css";
import Offerv from "../../../../public/offerv.png";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isAdmin = location.pathname === "/admin/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;
      if (isAdmin) {
        response = await loginAdmin(identifier, password);
      } else {
        response = await loginUser(identifier, password);
      }
      localStorage.setItem("authData", JSON.stringify(isAdmin ? response.admin : response.user));
      localStorage.setItem("token", JSON.stringify(response.token));
      localStorage.setItem("loginType", isAdmin ? "admin" : "user");
      dispatch(
        setUser({
          user: isAdmin ? response.admin : response.user,
          loginType: isAdmin ? "admin" : "user",
        })
      );
      // console.log("raw token from login component:", rawToken);

      toast.success("تم التسجيل بى نجاح");
      navigate(isAdmin ? "/admin" : "/", { state: { user: response.user } });
    } catch (err) {
      setError(err.message || "خطأ في تسجيل الدخول");
      toast.error("خطأ في تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login-cont">
          <h1>تسجيل الدخول {isAdmin ? "- المشرف" : ""}</h1>
          <h3>سجل دخولك زبطو القهوة وخلو اللمة تولع</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="start-input-row">
              <span className="start-icon">
                <img src={Offerv} alt="" />
              </span>
              <input
                className="start-input"
                type="text"
                placeholder="البريد الإلكتروني أو اسم المستخدم"
                dir="rtl"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="start-input-row">
              <span className="start-icon">
                <img src={Offerv} alt="" />
              </span>
              <input
                className="start-input"
                type="password"
                placeholder="كلمة المرور"
                dir="rtl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p style={{ color: "white", direction: "rtl" }}>{error}</p>}

            {isAdmin ? (
              <></>
            ) : (
              <>
                <div className="links">
                  <a href="/sign">إنشاء حساب جديد</a>
                  <a href="/rec">نسيت كلمة المرور؟</a>
                </div>
              </>
            )}

            <div className="start-btn">
              <button type="submit" disabled={loading}>
                {loading ? "جاري الإرسال..." : "إرسال"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
