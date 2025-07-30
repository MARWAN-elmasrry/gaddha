import './pStyle.css';

const Pack = () =>{
    return(<>
        <div className="pack">
            <div className="container">
                <div className="pack-cont">
                    <div className="cards">
                        <div className="card">
                            <div className="main">
                              <h5>لعبتين</h5>
                              <div className="price">
                                    <div className="price-info">
                                        <p>14</p>
                                    <img src="./riyal.png" alt="" />
                                    </div>
                              </div> 
                            </div>
                            <div className="top"></div>
                            <div className="center"></div>
                        </div>
                        <div className="card card2">
                            <div className="main">
                              <h5>لعبة واحدة</h5>
                              <div className="price">
                                    <div className="price-info">
                                        <p>8</p>
                                    <img src="./riyal.png" alt="" />
                                    </div>
                              </div> 
                            </div>
                            <div className="top"></div>
                            <div className="center"></div>
                        </div>
                        <div className="card card3">
                            <div className="main">
                              <h5 >ألعاب 10</h5>
                              <div className="price">
                                    <div className="price-info">
                                        <p>75</p>
                                    <img src="./riyal.png" alt="" />
                                    </div>
                              </div> 
                            </div>
                            <div className="top"></div>
                            <div className="center"></div>
                        </div>
                        <div className="card card4">
                            <div className="main">
                              <h5>5 ألعاب</h5>
                              <div className="price">
                                    <div className="price-info">
                                        <p>35</p>
                                    <img src="./riyal.png" alt="" />
                                    </div>
                              </div> 
                            </div>
                            <div className="top"><h3>الأكثر مبيعا</h3></div>
                            <div className="center"></div>
                        </div>
                    </div>
                    <img src="./offers.png" alt="" />
                </div>
            </div>
        </div>
    </>)
}

export default Pack;