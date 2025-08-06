import { useState } from "react";
import "./uStyle.css";

const Info = () =>{
    return(<>
    <div className="card">
        <div className="card-num">
            <span class="number"><img className="pen" src="./pen.png" alt="" /></span>
        </div>
        <div className="card-info">
            <div className="main-info">
                <h3>ماريو موسى</h3>
            </div>
            <div className="contact-info">
                    <p>itsmariomusa@gmail.com</p>
            </div>
            <div className="mess">
                <p>+90 552-593-90-69</p>
            </div>
            <div className="edit-btn">
                <button className='r-edit'>حفظ</button>
            </div>
        </div>
    </div> 
    </>)
}

const Sec = () =>{
    return(<>
    <div className="card">
        <div className="card-num">
            <span class="number"><img className="pen" src="./pen.png" alt="" /></span>
        </div>
        <div className="card-info">
            <div className="main-info">
                <h3>كلمة المرور القديمة</h3>
            </div>
            <div className="contact-info">
                    <p>كلمة المرور الجديدة</p>
            </div>
            <div className="mess">
                <p>أعد كتابة كلمة المرور الجديدة</p>
            </div>
            <div className="edit-btn">
                <button className='r-edit'>حفظ</button>
            </div>
        </div>
    </div> 
    </>)
}
const User = () => {
    const [activeTab, setActiveTab] = useState('sec');
    const [isFlipping, setIsFlipping] = useState(false);

    const handleTabClick = (tab, event) => {
        event.preventDefault();
        if (tab !== activeTab) {
            setIsFlipping(true);
            setTimeout(() => {
                setActiveTab(tab);
                setTimeout(() => setIsFlipping(false), 50);
            }, 150);
        }
    };

    return (
        <>
            <div className="user">
                <div className="container">
                    <div className="user-cont">
                            <h1>الحساب</h1>
                        <div className="g-links">
                            <div className="g-link">
                                <a 
                                    className={activeTab === 'sec' ? 'g-active' : ''} 
                                    href="#"
                                    onClick={(e) => handleTabClick('sec', e)}>
                                    الأمان</a>
                                <a 
                                    className={activeTab === 'info' ? 'g-active' : ''} 
                                    href="#"
                                    onClick={(e) => handleTabClick('info', e)}>معلومات
                                </a>
                            </div>
                        </div>
                        <div className={`card-flip-container ${isFlipping ? 'flipping' : ''}`}>
                            <div className="card-content">
                                {activeTab === 'sec' && <Sec />}
                                {activeTab === 'info' && <Info />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;