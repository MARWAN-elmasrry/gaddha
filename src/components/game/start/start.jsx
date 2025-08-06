import "./sgStyle.css";

const Start = () => {
  return (
    <div className="start">
        <div className="container">
            <div className="start-cont">
                <div className="game-cate-imgs">
                        <img src="./offerv.png" alt="" className="opc-img6" />
                        <img src="./offerv.png" alt="" className="opc-img6" />
                        <img src="./offerv.png" alt="" className="opc-img6" />
                        <img src="./offerv2.png" alt="" className="opc-img1" />
                        <img src="./offerv2.png" alt="" className="opc-img1" />
                        <img src="./offerv2.png" alt="" className="opc-img1" />
                </div>
                <div className="start-inp">
                    <h2 className="start-title">اختر الأسامي ولا نشوف مين قدها</h2>
                <div className="start-input-group">
                    <div className="start-input-row">
                        <span className="start-icon">
                            <img src="./offerw.png" alt="" />
                        </span>
                        <input className="start-input" type="text" placeholder="اسم اللعبة" dir="rtl" />
                    </div>
                    <div className="start-input-row">
                        <span className="start-icon">
                        <img src="./offerv.png" alt="" />
                        </span>
                        <input className="start-input" type="text" placeholder="اسم الفريق الأول" dir="rtl" />
                    </div>
                    <div className="start-input-row">
                        <span className="start-icon" >
                            <img src="./offerv2.png" alt="" />
                        </span>
                        <input className="start-input" type="text" placeholder="اسم الفريق الثاني" dir="rtl" />
                    </div>
                </div>
                    <div className="start-btn">
                        <button>متابعة</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};
export default Start;