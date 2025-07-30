import './cStyle.css';

const Category = () =>{
    return(<>
        <div className="cat">
            <div className="container">
                <div className="cat-cont">
                        <div className="info">
                            <h1>الفئات</h1>
                            <h2>هنا تشوفون جزو من فئاتنا, سووا حساب وشوفو باقي الفئات</h2>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <div className="card-num">
                                    <span class="number">22</span>
                                </div>
                                <div className="card-info">
                                    <img src="./catimg.png" alt="" />
                                    <h5>فئة معينة</h5>
                                </div>
                            </div>  
                            <div className="card">
                                <div className="card-num">
                                    <span class="number">22</span>
                                </div>
                                <div className="card-info">
                                    <img src="./catimg.png" alt="" />
                                    <h5>فئة معينة</h5>
                                </div>
                            </div>  
                            <div className="card">
                                <div className="card-num">
                                    <span class="number">22</span>
                                </div>
                                <div className="card-info">
                                    <img src="./catimg.png" alt="" />
                                    <h5>فئة معينة</h5>
                                </div>
                            </div>           
                        </div>
                        <div className="bar-b">
                            <img src="./catbar.png" alt="" />
                            <button>عرض المزيد</button>
                        </div>
                </div>
            </div>
        </div>
    </>) 
}

export default Category;