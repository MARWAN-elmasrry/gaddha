import './hStyle.css'

const Help=()=>{
    return(<>
        <div className="help">
            <div className="container">
                <div className="help-cont">
                    <h1>وسائل المساعدة</h1>
                    <h3>لكل فريق ثلاث وسائل مساعده</h3>
                    <div className="help-info">
                        <img src="./hphone.png" alt="" />
                        <div className="up">
                            <p>قبل تشوف السؤال, وعندك 60 ثانية بس</p>
                            <h5>دق على خويك</h5>
                        </div>
                    </div>
                    <div className="img-h">
                        <img src="./hr.png" alt=""  className='hr-img'/>
                        <img src="./hdp.png" alt=""  className='hdp-img'/>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Help;