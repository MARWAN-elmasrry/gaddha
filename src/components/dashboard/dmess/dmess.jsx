import './dmStyle.css';
import { Link } from 'react-router-dom';

const Dmess =()=>{
    return(<>
        <div className="d-mess">
            <div className="container">
                <div className="d-mess-cont">
                    <div className="h-cont">
                        <div className="back-btn">
                            <button  onClick={(e) => {e.preventDefault();window.location.href='/dash';}} ><img src="./back.png" alt="" /></button>
                        </div>
                        <h1>الرسائل</h1>
                        <div className="cont-info">
                            <div className="info">
                              <h3>جديد</h3>
                              <p>0</p>
                            </div>
                            <div className="info">
                              <h3>كلى</h3>
                              <p>15</p>
                            </div>
                        </div>
                    </div>
                    <div className="cards">
                            <div className="card">
                                <div className="card-num">
                                    <span class="number">22</span>
                                </div>
                                <div className="card-info">
                                    
                                </div>
                            </div> 
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Dmess;