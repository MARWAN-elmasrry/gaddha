import "./gStyle.css";
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from "react-redux";

const Header = () => {
    const location = useLocation();
    const menuItems = [
        { path: '/', label: 'الرئيسية' },
        { path: '/contact', label: 'تواصل' },
        { path: '/games', label: 'إلعب' },
        { path: '/packages', label: 'الباقات' },
    ];
    return (
        <header>
            <div className="container">
                <div className="head-cont">
                    <div className="links">
                        <div className="side-menu">
                            <span className="icon">
                                <span></span><span></span><span></span>
                            </span>
                            <ul>
                                {menuItems.map((item) => (
                                    <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
                                        <NavLink to={item.path}>
                                            {item.label}
                                            {location.pathname === item.path && <img src="./dashr.png" alt="" />}
                                        </NavLink>
                                    </li>
                                ))}
                                <li className='exit'>
                                    <a href="/logout">
                                        تسجيل الخروج <img src="./exit.png" alt="" style={{width: 20}} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <a href="/"><img src="./logo.png" alt="logo" style={{width:100}}/></a>
                </div>
            </div>
        </header>
    );
};

const SelecteCate = ({ category, onClick }) => {
    return(
        <div className="card-cate" onClick={() => onClick(category)} style={{ cursor: 'pointer' }}>
            <div className="card-info">
                <div className="select">
                    <img src="./remg2.png" alt="" />
                </div>
                <img src="./catimg.png" alt="" />
                <h5>{category}</h5>
            </div>
        </div>
    )
}

const GameFooter = () => {
    const { teamOne, teamTwo } = useSelector((state) => state.game);
    return(
        <div className="game-footer">
            <div className="container">
                <div className="game-foot-cont">
                    <div className="t1">
                        <h2>{teamOne || "الفريق الأول"}</h2>
                        <div className="score">
                            <div className="t-btn"><span className="min">-</span></div>
                            <p>2500</p>
                            <div className="t-btn"><span className="plus">+</span></div>
                        </div>
                    </div>
                    <div className="helps">
                        <img src="./hphone.png" alt="" />
                        <img src="./hdp.png" alt="" />
                        <img src="./hr.png" alt="" />
                    </div>
                    <div className="t1">
                        <h2>{teamTwo || "الفريق الثاني"}</h2>
                        <div className="score">
                            <div className="t-btn"><span className="min">-</span></div>
                            <p>2500</p>
                            <div className="t-btn"><span className="plus">+</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const QandA = ({ onBack, onToggleText, currentView, currentQA, category }) => {
    return(
        <div className="qa">
            <div className="qa-cont">
                <div className="game-btn ca" onClick={onToggleText} style={{ cursor: 'pointer' }}>
                    <span className="number"><img src="./cate.png" alt="" /></span>
                </div>
                <div className="game-btn del">
                    <span className="number"><img src="./delete.png" alt="" /></span>
                </div>
                <div className="game-btn back" onClick={onBack} style={{ cursor: 'pointer' }}>
                    <span className="number"><img src="./back.png" alt="" /></span>
                </div>
                <div className="game-btn excl">
                    <span className="number"><img src="./Excl.png" alt="" /></span>
                </div>
                
                {currentView === 'question' && (
                    <>
                        <h1> سؤال: {currentQA?.q}</h1>
                        <div className="qora">
                            <img src="./catimg.png" alt="" />
                        </div>
                    </>
                )}

                {currentView === 'answer' && (
                    <>
                        <h1> الجواب: {currentQA?.a}</h1>
                        <div className="qora">
                            <img src="./catimg.png" alt="" />
                        </div>
                    </>
)}
                
                {currentView === 'result' && (
                    <GameResult />
                )}
            </div>
        </div>
    )
}

const GameResult = () =>{
    const { teamOne, teamTwo } = useSelector((state) => state.game);
    return(
        <>
            <h1>مين جاوب ؟</h1>
            <div className="g-t1">
                <span className="g-t1-span"><p>{teamOne || "الفريق الأول"}</p></span>
            </div>
            <div className="g-t2">
                <span className="g-t2-span"><p>{teamTwo || "الفريق الثاني"}</p></span>
            </div>
            <div className="g-no-one">
                <span className="g-no-span" ><p>ولا احد</p></span>
            </div>
        </>
    )
}

const MainGame = () => {
    const { questionBank } = useSelector((state) => state.game);

    const [showQandA, setShowQandA] = useState(false);
    const [currentView, setCurrentView] = useState('question'); 
    const [currentQA, setCurrentQA] = useState(null);
    const [currentCategory, setCurrentCategory] = useState("");

    // when selecting a category
    const handleCategoryClick = (category) => {
        const questions = questionBank[category] || [];
        const randomQ = questions[Math.floor(Math.random() * questions.length)];
        setCurrentQA(randomQ);
        setCurrentCategory(category);
        setShowQandA(true);
        setCurrentView('question'); 
    };

    const handleBackClick = () => {
        setShowQandA(false); 
        setCurrentView('question');
    };

    const handleToggleText = () => {
        if (currentView === 'question') {
            setCurrentView('answer');
        } else if (currentView === 'answer') {
            setCurrentView('result');
        } else if (currentView === 'result') {
            setShowQandA(false); 
            setCurrentView('question'); 
        }
    };

    return(
        <div className="m-game">
            <div className="container">
                <div className="m-game-cont">
                    <Header />
                    {!showQandA ? (
                        <div className="cards">
                            {Object.keys(questionBank).map((cat) => (
                                <SelecteCate 
                                    key={cat}
                                    category={cat}
                                    onClick={handleCategoryClick} 
                                />
                            ))}
                        </div>
                    ) : (
                        <QandA 
                            onBack={handleBackClick}
                            onToggleText={handleToggleText}
                            currentView={currentView}
                            currentQA={currentQA}
                            category={currentCategory}
                        />
                    )}
                </div>
            </div>
            <GameFooter />
        </div>
    );
}

export default MainGame;
