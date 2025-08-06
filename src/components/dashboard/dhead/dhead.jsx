import './dhStyle.css';
import { NavLink, useLocation } from 'react-router-dom';

const Dhead = () => {
    const location = useLocation();
    
    const menuItems = [
        { path: '/dash', label: 'لوحة الإحصائيات' },
        { path: '/dmess', label: 'الرسائل' },
        { path: '/dreport', label: 'البلاغات' },
        { path: '/dsale', label: 'المبيعات' },
        { path: '/discount', label: 'أكواد الخصم' },
        { path: '/categories', label: 'الفئات' },
        { path: '/files', label: 'الملفات' },
        { path: '/controls', label: 'ادوات التحكم' },
        { path: '/dgames', label: 'الألعاب' },
        { path: '/users', label: 'المستخدمين' },
    ];

    return (
        <>
            <div className="d-head">
                <div className="container">
                    <div className="d-head-cont">
                        <div className="side-menu">
                            <span className="icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                            <ul>
                                {menuItems.map((item) => (
                                    <li 
                                        key={item.path} 
                                        className={location.pathname === item.path ? 'active' : ''}
                                    >
                                        <NavLink to={item.path}>
                                            {item.label}
                                            {location.pathname === item.path && <img src="./dashr.png" alt="" style={{marginLeft:20}}/>}
                                        </NavLink>
                                    </li>
                                ))}
                                <li className='exit'>
                                    <a href="/logout">
                                        <img src="./exit.png" alt="" style={{width: 20}} /> exit
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h1>مرحباً مستر عباس</h1>
                        <a href="/">
                            <img src="./logo.png" alt="logo" style={{width:100}}/>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dhead;