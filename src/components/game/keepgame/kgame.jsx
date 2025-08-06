import "./kgStyle.css";

const Card =()=>{
    return(<>
    <div className="card">
    <div className="card-num">
        <span class="number"><img src="./cate.png" alt="" /></span>
    </div>
    <div className="card-info">
        <div className="imgs">
            <img src="./catimg.png" alt="" />
            <img src="./catimg.png" alt="" />
            <img src="./catimg.png" alt="" />
            <img src="./catimg.png" alt="" />
            <img src="./catimg.png" alt="" />
            <img src="./catimg.png" alt="" />
        </div>
        <h5>فئة معينة</h5>
    </div>
    </div>
    </>)
}

const Kgame=()=>{
    return(<>
    <div className="kgame">
        <div className="container">
            <div className="kgame-cont">
                <h3> تابع العابك القديمة وين ما وقفت</h3>
                <div className="cards">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    </div>
    </>)
}

export default Kgame;