import "./gStyle.css";


const Haeder= () =>{
    return(<>
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
                                <li className='active'><a href="#"><img src="./dashr.png" alt="" /> Service</a></li>
                                <li><a href="#">Portfolio</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Contact</a></li>
                                <li className='exit'><a href="#"><img src="./exit.png" alt="" style={{width: 20}} /> exit </a></li>
                            </ul>
                        </div>
                    </div>
                    <h1 style={{ color: '#F9E7C5' }}>لعبة الأشاوس</h1>
                    <img src="./logo.png" alt="logo" style={{width:100}}/>
                    </div>
                </div>
            </header>
    </>)
}

const SelecteCate = () =>{
    return(<>
         <div className="card-cate">
        <div className="card-info">
            <div className="select">
                <img src="./remg2.png" alt="" />
            </div>
            <img src="./catimg.png" alt="" />
            <h5>فئة معينة</h5>
        </div>
    </div>
    </>)
}

const GameFooter = () =>{
    return(<>
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
    </>)
}

const QandA = () =>{
    return(<>
        <div className="qa">
            <div className="qa-cont">
                
                <h1>سؤال فئة معينة مع الميديا</h1>
                <div className="qora">
                    <img src="./catimg.png" alt="" />
                </div>
            </div>
        </div>
    </>)
}

const MainGame =() =>{
    return(<>
        <div className="m-game">
            <div className="container">
                <div className="m-game-cont">
                    <Haeder />
                    <div className="cards">
                        <SelecteCate />
                        <SelecteCate />
                        <SelecteCate />
                        <SelecteCate />
                        <SelecteCate />
                        <SelecteCate />
                    </div>
                    <QandA />
                </div>
            </div>
        <GameFooter />
        </div>
    </>);
}

export default  MainGame;