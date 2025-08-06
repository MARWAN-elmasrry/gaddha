import "./gStyle.css";
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const location = useLocation();
    
    const menuItems = [
        { path: '/', label: 'الرئيسية' },
        { path: '/contact', label: 'تواصل' },
        { path: '/games', label: 'إلعب' },
        { path: '/packages', label: 'الباقات' },
    ];

    return (
        <>
            <header>
                <div className="container">
                    <div className="head-cont">
                        <div className="links">
                            <div className="side-menu">
                                <span className="icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                                <ul>
                                    {menuItems.map((item) => (
                                        <li 
                                            key={item.path} 
                                            className={location.pathname === item.path ? 'active' : ''}
                                        >
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
                        <a href="/">
                            <img src="./logo.png" alt="logo" style={{width:100}}/>
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
};

const SelecteCate = ({ onClick }) => {
    return(
        <>
            <div className="card-cate" onClick={onClick} style={{ cursor: 'pointer' }}>
                <div className="card-info">
                    <div className="select">
                        <img src="./remg2.png" alt="" />
                    </div>
                    <img src="./catimg.png" alt="" />
                    <h5>فئة معينة</h5>
                </div>
            </div>
        </>
    )
}

const GameFooter = () => {
    return(
        <>
            <div className="game-footer">
                <div className="container">
                    <div className="game-foot-cont">
                        <div className="t1">
                            <h2>عبد الرحمن</h2>
                            <div className="score">
                                <div className="t-btn"><span className="min" >-</span></div>
                                <p>2500</p>
                                <div className="t-btn"><span className="plus" >+</span></div>
                            </div>
                        </div>
                        <div className="helps">
                            <img src="./hphone.png" alt="" />
                            <img src="./hdp.png" alt="" />
                            <img src="./hr.png" alt="" />
                        </div>
                        <div className="t1">
                            <h2>عبد الرحمن</h2>
                            <div className="score">
                                <div className="t-btn"><span className="min" >-</span></div>
                                <p>2500</p>
                                <div className="t-btn"><span className="plus" >+</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const QandA = ({ onBack, onToggleText, currentView }) => {
    return(
        <>
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
                            <h1>سؤال فئة معينة مع الميديا</h1>
                            <div className="qora">
                                <img src="./catimg.png" alt="" />
                            </div>
                        </>
                    )}
                    
                    {currentView === 'answer' && (
                        <>
                            <h1>جواب في فئة معينة مع الميديا</h1>
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
        </>
    )
}

const GameResult = () =>{
    return(<>
        <h1>مين جاوب ؟</h1>
        <div className="g-t1">
            <span className="g-t1-span"><p>عبدالرحمن</p></span>
        </div>
        <div className="g-t2">
            <span className="g-t2-span"><p>عبدالرحمن</p></span>
        </div>
        <div className="g-no-one">
            <span className="g-no-span" ><p>ولا احد</p></span>
        </div>
    </>)
}


const MainGame = () => {
    const [showQandA, setShowQandA] = useState(false);
    const [currentView, setCurrentView] = useState('question'); // 'question', 'answer', 'result'

    const handleCategoryClick = () => {
        setShowQandA(true);
        setCurrentView('question'); // Start with question
    };

    const handleBackClick = () => {
        setShowQandA(false); // Go back to category selection
        setCurrentView('question'); // Reset to question for next time
    };

    const handleToggleText = () => {
        if (currentView === 'question') {
            setCurrentView('answer');
        } else if (currentView === 'answer') {
            setCurrentView('result');
        } else if (currentView === 'result') {
            setShowQandA(false); // Go back to category selection
            setCurrentView('question'); // Reset for next time
        }
    };

    return(
        <>
            <div className="m-game">
                <div className="container">
                    <div className="m-game-cont">
                        <Header />
                        {!showQandA ? (
                            <div className="cards">
                                <SelecteCate onClick={handleCategoryClick} />
                                <SelecteCate onClick={handleCategoryClick} />
                                <SelecteCate onClick={handleCategoryClick} />
                                <SelecteCate onClick={handleCategoryClick} />
                                <SelecteCate onClick={handleCategoryClick} />
                                <SelecteCate onClick={handleCategoryClick} />
                            </div>
                        ) : (
                            <QandA 
                                onBack={handleBackClick}
                                onToggleText={handleToggleText}
                                currentView={currentView}
                            />
                        )}
                    </div>
                </div>
                <GameFooter />
            </div>
        </>
    );
}

export default MainGame;