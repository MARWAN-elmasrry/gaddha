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
  const [countryCode, setCountryCode] = useState("+966"); 
  const [phone, setPhone] = useState("");
  const [fullNumber, setFullNumber] = useState("+966");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const navigate = useNavigate();

  const countries = [
    { code: "+966", name: "السعودية", flag: "🇸🇦" },
    { code: "+971", name: "الإمارات", flag: "🇦🇪" },
    { code: "+965", name: "الكويت", flag: "🇰🇼" },
    { code: "+974", name: "قطر", flag: "🇶🇦" },
    { code: "+973", name: "البحرين", flag: "🇧🇭" },
    { code: "+968", name: "عمان", flag: "🇴🇲" },
    { code: "+962", name: "الأردن", flag: "🇯🇴" },
    { code: "+961", name: "لبنان", flag: "🇱🇧" },
    { code: "+963", name: "سوريا", flag: "🇸🇾" },
    { code: "+964", name: "العراق", flag: "🇮🇶" },
    { code: "+20", name: "مصر", flag: "🇪🇬" },
    { code: "+212", name: "المغرب", flag: "🇲🇦" },
    { code: "+213", name: "الجزائر", flag: "🇩🇿" },
    { code: "+216", name: "تونس", flag: "🇹🇳" },
    { code: "+218", name: "ليبيا", flag: "🇱🇾" },
    { code: "+249", name: "السودان", flag: "🇸🇩" },
    { code: "+967", name: "اليمن", flag: "🇾🇪" },
    { code: "+1", name: "الولايات المتحدة", flag: "🇺🇸" },
    { code: "+44", name: "المملكة المتحدة", flag: "🇬🇧" },
    { code: "+33", name: "فرنسا", flag: "🇫🇷" },
    { code: "+49", name: "ألمانيا", flag: "🇩🇪" },
    { code: "+91", name: "الهند", flag: "🇮🇳" },
    { code: "+86", name: "الصين", flag: "🇨🇳" },
  ];

  const handleCountrySelect = (selectedCode) => {
    setCountryCode(selectedCode);
    setFullNumber(phone ? `${selectedCode}-${phone}` : selectedCode);
    setShowCountryDropdown(false);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    setPhone(value);
    setFullNumber(value ? `${countryCode}-${value}` : countryCode);
  };

  const getCurrentCountry = () => {
    return countries.find(country => country.code === countryCode) || countries[0];
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
        countryCode: countryCode.replace('+', ''), 
        phone,
        birthday: birthdate,
      });
      setOtpStep(true);
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
              <h2>قدها ولا بس سوالف؟ شوي ونعرف</h2>
              <form className="form" onSubmit={handleSubmit}>
                <div className="start-input-row">
                  <span className="start-icon">
                    <img src="./offerv.png" alt="" />
                  </span>
                  <input
                    className="start-input"
                    type="text"
                    placeholder="الإسم "
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
                    placeholder="اسم المستخدم"
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

                <div className="start-input-row phone-input-container" style={{ position: 'relative' }}>
                  <span className="start-icon">
                    <img src="./offerv.png" alt="" />
                  </span>
                  <div className="phone-input-wrapper" style={{ display: 'flex', width: '100%' ,flexDirection:'row-reverse' }}>
                    <input
                      className="start-input"
                      type="tel"
                      placeholder="رقم الهاتف"
                      dir="rtl"
                      value={phone}
                      onChange={handlePhoneChange}
                      style={{ borderRadius: '0 8px 8px 0', borderLeft: 'none' }}
                      required
                    />
                    <div className="country-code-selector" style={{ position: 'relative' }}>
                      <button
                        type="button"
                        className="country-code-btn"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        style={{
                          borderRadius: '8px 0 0 8px',
                          borderRight: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          minWidth: '100px',
                          justifyContent: 'center',
                          margin:0
                        }}
                      >
                        <span>{getCurrentCountry().flag}</span>
                        <span>{getCurrentCountry().code}</span>
                        <span style={{ fontSize: '12px' }}>▼</span>
                      </button>
                      
                      {showCountryDropdown && (
                        <div 
                          className="country-dropdown"
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'white',
                            borderRadius: '8px',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            zIndex: 1000,
                          }}
                        >
                          {countries.map((country) => (
                            <div
                              key={country.code}
                              className="country-option"
                              onClick={() => handleCountrySelect(country.code)}
                              style={{
                                padding: '10px 15px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #eee',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                backgroundColor: countryCode === country.code ? '#f0f0f0' : 'white'
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                              onMouseLeave={(e) => {
                                if (countryCode !== country.code) {
                                  e.target.style.backgroundColor = 'white';
                                }
                              }}
                            >
                              <span style={{ fontSize: '12px'  , color: '#883813'}}>{country.flag}</span>
                              <span style={{ fontSize: '12px'  , color: '#883813'}}>{country.code}</span>
                              <span style={{ fontSize: '20px', color: '#883813' }}>{country.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
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

                {error && <p style={{ color: "white" }}>{error}</p>}

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
        <OTPStep phone={phone} countryCode={countryCode.replace('+', '')} />
      )}
    </>
  );
};

export default Sign;