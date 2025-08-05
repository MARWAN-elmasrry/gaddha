import "./gcStyle.css";

const Card =()=>{
    return(<>
    <div className="card-cate">
        <div className="card-num">
            <span class="number">22</span>
        </div>
        <div className="card-info">
            <div className="select">
                <img src="./remg2.png" alt="" />
            </div>
            <img src="./catimg.png" alt="" />
            <h5>فئة معينة</h5>
        </div>
    </div></>)
}

const GameCate = () =>{
    return(<>
        <div className="game-cate">
            <div className="container">
                <div className="game-cate-cont">
                    <img className="remg" src="./remg.png" alt="" />
                    <div className="game-cate-imgs">
                        <img src="./offerv.png" alt="" className="opc-img6" />
                        <img src="./offerv.png" alt="" className="opc-img6" />
                        <img src="./offerv.png" alt="" className="opc-img6" />
                        <img src="./offerv.png" alt="" className="opc-img1" />
                        <img src="./offerv.png" alt="" className="opc-img1" />
                        <img src="./offerv.png" alt="" className="opc-img1" />
                    </div>
                    <h3> اختر 6 فئات ثلالثة لكل فريق</h3>
                    <div className="cards">
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
export default GameCate;