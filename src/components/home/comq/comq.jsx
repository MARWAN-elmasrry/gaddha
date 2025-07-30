import './cStyle.css';

const Comq = () =>{
    return(<>
        <div className="com">
            <div className="container">
                <div className="com-cont">
                    <h1>الأسئلة الشائعة</h1>
                    <div className="cards">
                        <div className="card">
                            <div className="q-card active">
                                <img src="./offerv.png" alt=""/>
                                <h3>كيف اسجل بقدها ؟ </h3>
                            </div>
                            <p>عن طريق الموقع الأكتروني أو التطبيق</p>
                        </div>
                        <div className="card">
                            <div className="q-card">
                                <img src="./offerv.png" alt="" />
                                <h3>اقدر العب مع خوياي اونلاين ؟ </h3>
                            </div>                        </div>
                        <div className="card">
                            <div className="q-card">
                                <img src="./offerv.png" alt="" />
                                <h3>كفي حال حدثت مشكلة تقنية ماذا افعل ؟</h3>
                            </div>
                        </div>
                        <div className="card">
                            <div className="q-card">
                                <img src="./offerv.png" alt="" />
                                <h3>المقاطع ما تشتغل وش اسوي ؟</h3>
                            </div>
                        </div>
                        <div className="card">
                            <div className="q-card">
                                <img src="./offerv.png" alt="" />
                                <h3>اقدر ارجع فلوسي ؟ </h3>
                            </div>
                        </div>
                        <div className="card">
                            <div className="q-card">
                                <img src="./offerv.png" alt="" />
                                <h3>واجهت سؤال غلط وش اسوي</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Comq;