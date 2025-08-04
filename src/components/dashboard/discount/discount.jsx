import './disStyle.css';

const Discount =()=>{
    return(<>
        <div className="dis">
            <div className="container">
                <div className="h-cont">
                        <div className="back-btn">
                            <button  onClick={(e) => {e.preventDefault();window.location.href='/gaddah/dash';}} ><img src="./back.png" alt="" /></button>
                        </div>
                        <h1>اكواد الخصم</h1>
                        <div className="cont-info">
                            <div className="info">
                              <h3>عدد</h3>
                              <p>7</p>
                            </div>
                        </div>
                </div>
                <div className="cards">
                    <div className="card">
                                <div className="card-num">
                                    <span class="number"><img src="./delete.png" alt="" /></span>
                                </div>
                                <div className="card-info">
                                    <button>تعديل</button>
                                    <img src="./inf.png" alt="" />
                                    <img src="./inf.png" alt="" />
                                    <p>45</p>
                                    <p>30%</p>
                                    <p>#1234</p>
                                </div>
                    </div>
                    <div className="card">
                                <div className="card-num">
                                    <span class="number"><img src="./delete.png" alt="" /></span>
                                </div>
                                <div className="card-info">
                                    <button>تعديل</button>
                                    <img src="./inf.png" alt="" />
                                    <img src="./inf.png" alt="" />
                                    <p>45</p>
                                    <p>30%</p>
                                    <p>#1234</p>
                                </div>
                    </div>
                    <div className="card">
                                <div className="card-num">
                                    <span class="number"><img src="./delete.png" alt="" /></span>
                                </div>
                                <div className="card-info">
                                    <button>تعديل</button>
                                    <img src="./inf.png" alt="" />
                                    <img src="./inf.png" alt="" />
                                    <p>45</p>
                                    <p>30%</p>
                                    <p>#1234</p>
                                </div>
                    </div>
                    <div className="card">
                                <div className="card-num">
                                    <span class="number"><img src="./delete.png" alt="" /></span>
                                </div>
                                <div className="card-info">
                                    <button>تعديل</button>
                                    <img src="./inf.png" alt="" />
                                    <img src="./inf.png" alt="" />
                                    <p>45</p>
                                    <p>30%</p>
                                    <p>#1234</p>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Discount;