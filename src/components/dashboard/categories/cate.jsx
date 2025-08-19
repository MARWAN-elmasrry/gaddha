import './cStyle.css';

const Categories =() =>{
    return(<>
        <div className="cate">
            <div className="container">
                <div className="h-cont">
                        <div className="back-btn">
                            <button  onClick={(e) => {e.preventDefault();window.location.href='/dash';}} ><img src="./back.png" alt="" /></button>
                        </div>
                        <h1>الفئات</h1>
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
                                    <button>رفع</button>
                                    <button>عرض</button>
                                    <p>322</p>
                                    <p>200</p>
                                    <p>أنمي</p>
                                </div>
                    </div>
                    <div className="card">
                                <div className="card-num">
                                    <span class="number"><img src="./delete.png" alt="" /></span>
                                </div>
                                <div className="card-info">
                                    <button>تعديل</button>
                                    <button>رفع</button>
                                    <button>عرض</button>
                                    <p>322</p>
                                    <p>200</p>
                                    <p>أنمي</p>
                                </div>
                    </div>
                    <div className="card">
                                <div className="card-num">
                                    <span class="number"><img src="./delete.png" alt="" /></span>
                                </div>
                                <div className="card-info">
                                    <button>تعديل</button>
                                    <button>رفع</button>
                                    <button>عرض</button>
                                    <p>322</p>
                                    <p>200</p>
                                    <p>أنمي</p>
                                </div>
                    </div>
                    <div className="card">
                                <div className="card-num">
                                    <span class="number"><img src="./delete.png" alt="" /></span>
                                </div>
                                <div className="card-info">
                                    <button>تعديل</button>
                                    <button>رفع</button>
                                    <button>عرض</button>
                                    <p>322</p>
                                    <p>200</p>
                                    <p>أنمي</p>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default  Categories;