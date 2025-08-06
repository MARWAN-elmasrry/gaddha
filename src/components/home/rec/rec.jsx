import "./recStyle.css";

const Rec = () =>{
    return(<>
        <div className="rec">
            <div className="container">
                <div className="rec-cont">
                    <h1>استعد حسابك</h1>
                    <h3>ادخل بريدك ورقم الهاتف </h3>
                    <div className="form">
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
                        <div className="start-btn">
                            <button>إرسال</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Rec;