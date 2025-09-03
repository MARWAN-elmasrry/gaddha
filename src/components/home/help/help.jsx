import { useState, useEffect } from "react"
import "./helpStyle.css"

const Help = () => {
  const helpOptions = {
    phone: {
      image: "./hphone.png",
      text: {
        p: "قبل تشوف السؤال, وعندك 60 ثانية بس",
        h5: "دق على خويك"
      }
    },
    hr: {
      image: "./hr.png",
      text: {
        p: "الإجابة الصحيحة للسؤال",
        h5: "السؤال صحيح"
      }
    },
    hdp: {
      image: "./hdp.png",
      text: {
        p: "مضاعفة النقاط للفريق",
        h5: "ضاعف النقاط"
      }
    }
  }

  const optionKeys = Object.keys(helpOptions)
  const [activeOption, setActiveOption] = useState("phone")
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)

      setTimeout(() => {
        setActiveOption(prev => {
          const currentIndex = optionKeys.indexOf(prev)
          const nextIndex = (currentIndex + 1) % optionKeys.length
          return optionKeys[nextIndex]
        })
        setIsAnimating(false)
      }, 300) 
    }, 3000)

    return () => clearInterval(interval)
  }, [optionKeys])

  return (
    <div className="help">
      <div className="container">
        <div className="help-cont">
          <h1>وسائل المساعدة</h1>
          <h3>لكل فريق ثلاث وسائل مساعده</h3>
          <div className="help-info">
            <img
              src={helpOptions[activeOption].image}
              alt=""
              className={`main-image ${isAnimating ? 'fade-out' : 'fade-in'}`}
            />
            <div className="up">
              <p>{helpOptions[activeOption].text.p}</p>
              <h5>{helpOptions[activeOption].text.h5}</h5>
            </div>
          </div>
          <div className="img-h">
            {optionKeys
              .filter(key => key !== activeOption)
              .map(optionKey => (
                <img
                  key={optionKey}
                  src={helpOptions[optionKey].image}
                  alt=""
                  className={`${optionKey}-img clickable-img ${isAnimating ? 'fade-out' : 'fade-in'}`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
