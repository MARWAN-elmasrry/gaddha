import "./cStyle.css";

const Contact=()=>{
    return(<>
        <div className="contact">
            <div className="container">
                <div className="cont-cont">
                    <h1>تواصل معنا</h1>
                    <h3>تواصل معنا لأي سؤال, طلب عمل, أو إستفسار</h3>
                    <div className="form">
                        <div className="start-input-row">
                            <span className="start-icon">
                            <img src="./offerv.png" alt="" />
                            </span>
                            <input className="start-input" type="text" placeholder="اسم الفريق الأول" dir="rtl" />
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
                        <div className="start-input-row mass-cont">
                            <span className="start-icon">
                            <img src="./offerv.png" alt="" />
                            </span>
                            <input className="start-input mass-inp" type="text" placeholder="الرسالة" dir="rtl" />
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

export default Contact;