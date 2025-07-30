import './dhStyle.css';

const Dhead = () =>{
    return(<>
        <div className="d-head">
            <div className="container">
                <div className="d-head-cont">
                    <div className="side-menu">
                            <span className="icon">
                            <span></span>
                            <span></span>
                            <span></span>
                            </span>
                            {/* <ul>
                                <li><a href="#">Service</a></li>
                                <li><a href="#">Portfolio</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul> */}
                    </div>
                    <h1>مرحباً مستر عباس</h1>
                    <img src="./logo.png" alt="logo" style={{width:100}}/>
                </div>
            </div>
        </div>
    </>)
}

export default Dhead;
