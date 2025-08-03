import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/home/header/head';
import Footer from './components/home/footer/foot';
import Hero from './components/home/hero/hero';
import What from './components/home/whatis/what';
import Howt from './components/home/howt/howt';
import Category from './components/home/cate/category';
import Help from './components/home/help/help';
import Pack from './components/home/pack/pack';
import Comq from './components/home/comq/comq';
import Dhead from './components/dashboard/dhead/dhead';
import Dmain from './components/dashboard/dmain/dmain';
import Dmess from './components/dashboard/dmess/dmess';
import Dreport from './components/dashboard/dreport/dreport';
import Dsale from './components/dashboard/dsale/dsale';
import Discount from './components/dashboard/discount/discount';
import Categories from './components/dashboard/categories/cate';
import Files from './components/dashboard/files/files';
import Controls from './components/dashboard/controls/controls';
import Dgames from './components/dashboard/dgames/dgames';
import Users from './components/dashboard/users/users';

const SandBackground = ({ intensity = 0.75, blur = 1 }) => {
  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(207, 138, 65, 1)',
    zIndex: -1,
    pointerEvents: 'none'
  };

  const beforeAfterBase = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '110%',
    background: `
      repeating-conic-gradient(#0003 0.000001%, #fff0 .00005%, #fff0 .00035%, #fff0 .00005%), 
      repeating-conic-gradient(#fff2 0.00002%, #fff0 .00008%, #fff0 .0008%, #fff0 .00008%)
    `,
    opacity: intensity,
    filter: `blur(${blur}px)`,
    pointerEvents: 'none'
  };

  const afterStyle = {
    ...beforeAfterBase,
    transform: 'rotate(180deg) scale(5)',
    filter: 'none'
  };

  return (
    <div style={backgroundStyle}>
      <div style={beforeAfterBase} />
      <div style={afterStyle} />
    </div>
  );
};

const Dfooter =()=>{
  return(<>
    <div className="dfooter"></div>
  </>)
}
// deploy fix
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gaddha" element={<>
            <SandBackground intensity={0.75} blur={1} />
            <Header />
            <Hero />
            <What />
            <Howt />
            <Category />
            <Help />
            <Pack />
            <Comq />
            <Footer />
          </>} />
        <Route path='/gaddha/dash' element={<>
            <Dhead />
            <Dmain />
            <Dfooter />
          </>} />
        <Route path='/gaddha/dmess' element={<>
            <Dhead />
            <Dmess />
            <Dfooter />
          </>} />
        <Route path='/gaddha/dreport' element={<>
            <Dhead />
            <Dreport />
            <Dfooter />
          </>} />
          <Route path='/gaddha/dsale' element={<>
            <Dhead />
            <Dsale />
            <Dfooter />
          </>} />
          <Route path='/gaddha/discount' element={<>
            <Dhead />
            <Discount />
            <Dfooter />
          </>} />
          <Route path='/gaddha/categories' element={<>
            <Dhead />
            <Categories />
            <Dfooter />
          </>} />
          <Route path='/gaddha/files' element={<>
            <Dhead />
            <Files />
            <Dfooter />
          </>} />
          <Route path='/gaddha/controls' element={<>
            <Dhead />
            <Controls />
          </>} />
          <Route path='/gaddha/games' element={<>
            <Dhead />
            <Dgames />
            <Dfooter />
          </>} />
          <Route path='/gaddha/users' element={<>
            <Dhead />
            <Users />
            <Dfooter />
          </>} />
          <Route path='/gaddha/controls' element={<>
            <Dhead />
            <Controls />
          </>} />
          
      </Routes>
    </BrowserRouter>
  )
}

export default App