import './fStyle.css';

const Files = () =>{
    return(<>
        <div className="files">
            <div className="container">
                <div className="files-cont">
                    <div className="h-cont">
                        <div className="back-btn">
                            <button  onClick={(e) => {e.preventDefault();window.location.href='/gaddah/dash';}} ><img src="./back.png" alt="" /></button>
                        </div>
                        <h1>الملفات </h1>
                        <div className="cont-info">
                            <div className="info">
                              <h3>عدد</h3>
                              <p>7</p>
                            </div>
                        </div>
                    </div>
                    <div className="f-card" >
              <div className="storage-info">
                <div className="info">
                  <span className="label">المساحة</span>
                  <span className="value">30GB</span>
                </div>
                <div className="info">
                  <span className="label">مستخدم</span>
                  <span className="value">15.7GB</span>
                </div>
                <div className="info">
                  <span className="label">متاح</span>
                  <span className="value">14.3GB</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="bar">
                    <div className="used" style={{ width: '67%' }}></div>
                    <div className="indicator left"><img src="./persw.png" alt="" />67%</div>
                    <div className="indicator right">33%<img src="./persw.png" alt="" /></div>
                </div>
                <span className="max-space">50 GB</span>
              </div>
                    </div>
                    <div className="cards">
                        <div className="card">
                                <div className="card-num">
                                    <span class="number"><img src="./delete.png" alt="" /></span>
                                </div>
                                <div className="card-info">
                                    <p><img src="./copyall.png" alt="" />نسخ الكل</p>
                                    <p><img src="./copy.png" alt="" />نسخ معين</p>
                                    <p><img src="./cate.png" alt="" />الفئة</p>
                                    <button>رفع</button>
                                </div>
                                <div className="display"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Files