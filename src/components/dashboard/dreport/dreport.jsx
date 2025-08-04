import './drStyle.css';

const Dreport = () =>{
    return(<>
            <div className="d-report">
                <div className="container">
                    <div className="h-cont">
                        <div className="back-btn">
                            <button  onClick={(e) => {e.preventDefault();window.location.href='/dash';}} ><img src="./back.png" alt="" /></button>
                        </div>
                        <h1>البلاغات</h1>
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
                                    <span class="number"><img src="./delete.png" alt="" /></span>
                                </div>
                                <div className="card-info">
                                    <div className="main-info">
                                        <h3>11:20</h3>
                                        <h3>صالح عبد الرحمن</h3>
                                    </div>
                                    <div className="report-info">
                                        <h4> أيقونة: لا</h4>
                                        <h4>سهل</h4>
                                        <h4>أنمي</h4>
                                    </div>
                                    <div className="contact-info">
                                            <p>something@gmail.com</p>
                                            <p>+90 552-593-90-69</p>
                                            <p>333-222-245</p>
                                    </div>
                                    <div className="mess">
                                        <p>نعمل شراكة شرايكم</p>
                                    </div>
                                    <div className="edit-btn">
                                        <button className='r-edit'>تعديل</button>
                                    </div>
                                </div>
                        </div>
                        <div className="card">
                                <div className="card-num">
                                    <span class="number"><img src="./delete.png" alt="" /></span>
                                </div>
                                <div className="card-info">
                                    <div className="main-info">
                                        <h3>11:20</h3>
                                        <h3>صالح عبد الرحمن</h3>
                                    </div>
                                    <div className="report-info">
                                        <h4> أيقونة: لا</h4>
                                        <h4>سهل</h4>
                                        <h4>أنمي</h4>
                                    </div>
                                    <div className="contact-info">
                                            <p>something@gmail.com</p>
                                            <p>+90 552-593-90-69</p>
                                            <p>333-222-245</p>
                                    </div>
                                    <div className="mess">
                                        <p>نعمل شراكة شرايكم</p>
                                    </div>
                                    <div className="edit-btn">
                                        <button className='r-edit'>تعديل</button>
                                    </div>
                                </div>
                        </div>
                        <div className="card">
                                <div className="card-num">
                                    <span class="number"><img src="./delete.png" alt="" /></span>
                                </div>
                                <div className="card-info">
                                    <div className="main-info">
                                        <h3>11:20</h3>
                                        <h3>صالح عبد الرحمن</h3>
                                    </div>
                                    <div className="report-info">
                                        <h4> أيقونة: لا</h4>
                                        <h4>سهل</h4>
                                        <h4>أنمي</h4>
                                    </div>
                                    <div className="contact-info">
                                            <p>something@gmail.com</p>
                                            <p>+90 552-593-90-69</p>
                                            <p>333-222-245</p>
                                    </div>
                                    <div className="mess">
                                        <p>نعمل شراكة شرايكم</p>
                                    </div>
                                    <div className="edit-btn">
                                        <button className='r-edit'>تعديل</button>
                                    </div>
                                </div>
                        </div>
                        <div className="card">
                                <div className="card-num">
                                    <span class="number"><img src="./delete.png" alt="" /></span>
                                </div>
                                <div className="card-info">
                                    <div className="main-info">
                                        <h3>11:20</h3>
                                        <h3>صالح عبد الرحمن</h3>
                                    </div>
                                    <div className="report-info">
                                        <h4> أيقونة: لا</h4>
                                        <h4>سهل</h4>
                                        <h4>أنمي</h4>
                                    </div>
                                    <div className="contact-info">
                                            <p>something@gmail.com</p>
                                            <p>+90 552-593-90-69</p>
                                            <p>333-222-245</p>
                                    </div>
                                    <div className="mess">
                                        <p>نعمل شراكة شرايكم</p>
                                    </div>
                                    <div className="edit-btn">
                                        <button className='r-edit'>تعديل</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
    </>)
}

export default Dreport;