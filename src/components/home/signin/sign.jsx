import "./siStyle.css";

const Sign = () =>{
    return(<>
        <div className="sign">
            <div className="container">
                <div className="sign-cont">
                    <h1>انشئ حسابك</h1>
                    <h3>سجل بريدك الألكتروني وجهز نفسك نشوف قدها ولا بس سوالف</h3>
                    <div className="form">
                        <div className="start-input-row">
                            <span className="start-icon">
                            <img src="./offerv.png" alt="" />
                            </span>
                            <input className="start-input" type="text" placeholder="الإسم الأول و الثاني" dir="rtl" />
                        </div>
                        <div className="start-input-row">
                            <span className="start-icon">
                            <img src="./offerv.png" alt="" />
                            </span>
                            <input className="start-input" type="text" placeholder="البريد الإلكتروني" dir="rtl" />
                        </div>
                        <div className="start-input-row">
                            <span className="start-icon">
                            <img src="./offerv.png" alt="" />
                            </span>
                            <input className="start-input" type="text" placeholder="رقم الهاتف" dir="rtl" />
                        </div>
                        <div className="start-input-row">
                            <span className="start-icon">
                            <img src="./offerv.png" alt="" />
                            </span>
                            <input className="start-input" type="text" placeholder="كلمة المرور" dir="rtl" />
                        </div>
                        <div className="start-input-row">
                            <span className="start-icon">
                            <img src="./offerv.png" alt="" />
                            </span>
                            <input className="start-input" type="text" placeholder="اعد كلمة المرور" dir="rtl" />
                        </div>
                        <div className="links">
                            <div className="date">
                                <input type="date"/>
                            <p>تاريخ الميلاد</p>
                            </div>
                            <a href="/login">لدي حساب بالفعل</a>
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

export default Sign;