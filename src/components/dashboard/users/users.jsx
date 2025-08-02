import './uStyle.css';

const Users = () =>{
    return(<>
        <div className="users">
            <div className="container">
                <div className="users-cont">
                    <div className="h-cont">
                        <div className="back-btn">
                            <button  onClick={(e) => {e.preventDefault();window.location.href='/dash';}} ><img src="./back.png" alt="" /></button>
                        </div>
                        <h1>المستخدمين </h1>
                        <div className="cont-info">
                            <div className="info">
                              <h3>عدد</h3>
                              <p>7</p>
                            </div>
                        </div>
                    </div>
                    <div className="search">
                        <div className="search-inp">
                            <img src="./search.png" alt="" />
                            <input type="text" name="" id="" placeholder='بحث' />
                        </div>
                    </div>
                    <div className="cards">
                        <div className="card">
                                <div className="card-info">
                                    <button>عرض</button>
                                    <div className="contant-info">
                                        <p>20s</p>
                                        <p>+90-552-594-00-33</p>
                                    </div>
                                    <div className="main-info">
                                        <p>322</p>
                                        <p>djkd_3333</p>
                                        <h5>ياسر الحسن</h5>
                                    </div>
                                </div>
                        </div>
                        <div className="card">
                                <div className="card-info">
                                    <button>عرض</button>
                                    <div className="contant-info">
                                        <p>20s</p>
                                        <p>+90-552-594-00-33</p>
                                    </div>
                                    <div className="main-info">
                                        <p>322</p>
                                        <p>djkd_3333</p>
                                        <h5>ياسر الحسن</h5>
                                    </div>
                                </div>
                        </div>
                        <div className="card">
                                <div className="card-info">
                                    <button>عرض</button>
                                    <div className="contant-info">
                                        <p>20s</p>
                                        <p>+90-552-594-00-33</p>
                                    </div>
                                    <div className="main-info">
                                        <p>322</p>
                                        <p>djkd_3333</p>
                                        <h5>ياسر الحسن</h5>
                                    </div>
                                </div>
                        </div>
                        <div className="card">
                                <div className="card-info">
                                    <button>عرض</button>
                                    <div className="contant-info">
                                        <p>20s</p>
                                        <p>+90-552-594-00-33</p>
                                    </div>
                                    <div className="main-info">
                                        <p>322</p>
                                        <p>djkd_3333</p>
                                        <h5>ياسر الحسن</h5>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Users;