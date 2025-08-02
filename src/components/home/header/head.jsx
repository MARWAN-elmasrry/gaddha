import './hStyle.css'

const Header = () =>{
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
                        <button className='points'><img src="./ydot.png" alt="" style={{width: 25}}/>  2</button>
                        <button className='play'>العب</button>
                    </div>
                    <img src="./logo.png" alt="logo" style={{width:100}}/>
                    </div>
                </div>
            </header>
    </>)
}

export default Header;