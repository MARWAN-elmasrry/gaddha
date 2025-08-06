import './hStyle.css';
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    
    const menuItems = [
        { path: '/', label: 'الرئيسية' },
        { path: '/contact', label: 'تواصل' },
        { path: '/games', label: 'إلعب' },
        { path: '/packages', label: 'الباقات' },
    ];

    return (
        <>
            <header>
                <div className="container">
                    <div className="head-cont">
                        <div className="links">
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
                                                {location.pathname === item.path && <img src="./dashr.png" alt="" />}
                                            </NavLink>
                                        </li>
                                    ))}
                                    <li className='exit'>
                                        <a href="/logout">
                                            تسجيل الخروج <img src="./exit.png" alt="" style={{width: 20}} />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <button className='points'>
                                <img src="./ydot.png" alt="" style={{width: 25}}/> 2
                            </button>
                            <button className='play'>العب</button>
                        </div>
                        <a href="/">
                            <img src="./logo.png" alt="logo" style={{width:100}}/>
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;