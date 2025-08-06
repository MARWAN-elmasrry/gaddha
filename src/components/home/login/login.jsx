import "./lStyle.css";

const Login = () =>{
    return(<>
        <div className="login">
            <div className="container">
                <div className="login-cont">
                    <h1>تسجيل الدخول</h1>
                    <h3>سجل دخولك زبطو القهوة وخلو اللمة تولع</h3>
                    <div className="form">
                        <div className="start-input-row">
                            <span className="start-icon">
                            <img src="./offerv.png" alt="" />
                            </span>
                            <input className="start-input" type="text" placeholder="البريد الإلكتروني " dir="rtl" />
                        </div>
                        <div className="start-input-row">
                            <span className="start-icon">
                            <img src="./offerv.png" alt="" />
                            </span>
                            <input className="start-input" type="text" placeholder="كلمة المرور" dir="rtl" />
                        </div>
                        <div className="links">
                            <a href="/sign">انشائ حساب جديد</a>
                            <a href="/rec">نسيت كلمة المرور؟</a>
                        </div>
                        <div className="start-btn">
                            <button>إرسال</button>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    </>)
}

export default Login;