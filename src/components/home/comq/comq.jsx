import { useState } from "react";
import "./cStyle.css";

const faqs = [
  {
    q: "كيف اسجل بقدها ؟",
    a: "عن طريق الموقع الأكتروني أو التطبيق",
  },
  {
    q: "اقدر العب مع خوياي اونلاين ؟",
    a: "نعم تقدر تلعب مع أصحابك أونلاين بكل سهولة",
  },
  {
    q: "في حال حدثت مشكلة تقنية ماذا افعل ؟",
    a: "تواصل مع الدعم الفني عبر التطبيق أو الموقع",
  },
  {
    q: "المقاطع ما تشتغل وش اسوي ؟",
    a: "تأكد من الاتصال بالإنترنت أو حدث التطبيق",
  },
  {
    q: "اقدر ارجع فلوسي ؟",
    a: "حسب سياسة الاسترجاع الموضحة في الموقع",
  },
  {
    q: "واجهت سؤال غلط وش اسوي ؟",
    a: "بلغنا عن السؤال الغلط من خلال الدعم",
  },
];

const Comq = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  return (
    <div className="com">
      <div className="container">
        <div className="com-cont">
          <h1>الأسئلة الشائعة</h1>
          <div className="cards">
            {faqs.map((item, index) => (
              <div
                key={index}
                className={`card ${activeIndex === index ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="q-card">
                  <img
                    src={activeIndex === index ? "./offerw.png" : "./offerv.png" }
                    alt="icon"
                    className="card-icon"
                  />
                  <h3>{item.q}</h3>
                </div>
                <div className={`answer ${activeIndex === index ? "answer-active" : ""}`}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



export default Comq;