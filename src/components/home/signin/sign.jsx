import { useState } from "react";
import "./siStyle.css";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../../api/services/authService";
import OTPStep from "./OTPStep";

const Sign = () => {
  const [otpStep, setOtpStep] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [fullNumber, setFullNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 3) {
      const code = "+" + value.slice(0, 3); // اضفنا +
      const num = value.slice(3);
      setCountryCode(code);
      setPhone(num);
      setFullNumber(`${code}-${num}`);
    } else {
      const code = value ? "+" + value : "";
      setCountryCode(code);
      setPhone("");
      setFullNumber(code);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (pass !== confirmPass) {
      setError("كلمة المرور غير متطابقة");
      return;
    }
    setLoading(true);

    try {
      await RegisterUser({
        name,
        username,
        email,
        password: pass,
        countryCode,
        phone,
        birthday: birthdate,
      });
      setOtpStep(true);
      // navigate("/login");
    } catch (err) {
      setError(err.message || "خطأ في تسجيل ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!otpStep ? (
        <div className="sign">
          <div className="container">
            <div className="sign-cont">
              <h1>انشئ حسابك</h1>
              <h3>سجل بريدك الألكتروني وجهز نفسك نشوف قدها ولا بس سوالف</h3>
              <form className="form" onSubmit={handleSubmit}>
                <div className="start-input-row">
                  <span className="start-icon">
                    <img src="./offerv.png" alt="" />
                  </span>
                  <input
                    className="start-input"
                    type="text"
                    placeholder="الإسم الأول و الثاني"
                    dir="rtl"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="start-input-row">
                  <span className="start-icon">
                    <img src="./offerv.png" alt="" />
                  </span>
                  <input
                    className="start-input"
                    type="text"
                    placeholder="اسم اليوزر"
                    dir="rtl"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="start-input-row">
                  <span className="start-icon">
                    <img src="./offerv.png" alt="" />
                  </span>
                  <input
                    className="start-input"
                    type="email"
                    placeholder="البريد الإلكتروني"
                    dir="rtl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="start-input-row">
                  <span className="start-icon">
                    <img src="./offerv.png" alt="" />
                  </span>
                  <input
                    className="start-input"
                    type="tel"
                    placeholder="رقم الهاتف (********* -966)"
                    dir="rtl"
                    value={fullNumber}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>

                <div className="start-input-row">
                  <span className="start-icon">
                    <img src="./offerv.png" alt="" />
                  </span>
                  <input
                    className="start-input"
                    type="password"
                    placeholder="كلمة المرور"
                    dir="rtl"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                  />
                </div>

                <div className="start-input-row">
                  <span className="start-icon">
                    <img src="./offerv.png" alt="" />
                  </span>
                  <input
                    className="start-input"
                    type="password"
                    placeholder="اعد كلمة المرور"
                    dir="rtl"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                  />
                </div>

                <div className="links">
                  <div className="date">
                    <input
                      type="text"
                      placeholder="yyyy-mm-dd"
                      className="start-input"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      required
                    />
                    <p>تاريخ الميلاد</p>
                  </div>
                  <a href="/login">لدي حساب بالفعل</a>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="start-btn">
                  <button type="submit" disabled={loading}>
                    {loading ? "جاري الإرسال..." : "إرسال"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <OTPStep />
      )}
    </>
  );
};

export default Sign;
