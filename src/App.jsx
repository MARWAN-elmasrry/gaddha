import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import Header from "./components/home/header/head";
import Footer from "./components/home/footer/foot";
import Hero from "./components/home/hero/hero";
import What from "./components/home/whatis/what";
import Howt from "./components/home/howt/howt";
import Category from "./components/home/cate/category";
import Help from "./components/home/help/help";
import Pack from "./components/home/pack/pack";
import Comq from "./components/home/comq/comq";

import Dhead from "./components/dashboard/dhead/dhead";
import Dmain from "./components/dashboard/dmain/dmain";
import Dmess from "./components/dashboard/dmess/dmess";
import Dreport from "./components/dashboard/dreport/dreport";
import Dsale from "./components/dashboard/dsale/dsale";
import Discount from "./components/dashboard/discount/discount";
import Categories from "./components/dashboard/categories/cate";
import Files from "./components/dashboard/files/files";
import Controls from "./components/dashboard/controls/controls";
import Dgames from "./components/dashboard/dgames/dgames";
import Users from "./components/dashboard/users/users";
import Mgame from "./components/game/game";
import Start from "./components/game/start/start";
import MainGame from "./components/game/Maingame/game";
import Contact from "./components/home/contact/contact";
import Login from "./components/home/login/login";
import Sign from "./components/home/signin/sign";
import Rec from "./components/home/rec/rec";
import User from "./components/home/user/user";
import Ver from "./components/home/ver/ver";
export const ForceUpdateContext = createContext();

const SandBackground = ({ intensity = 0.75, blur = 1 }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(207, 138, 65, 1)",
      zIndex: -1,
      pointerEvents: "none",
    }}
  >
    {["before", "after"].map((key, i) => (
      <div
        key={i}
        style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "110%",
          background: `repeating-conic-gradient(#0003 0.000001%, #fff0 .00005%, #fff0 .00035%, #fff0 .00005%),
                       repeating-conic-gradient(#fff2 0.00002%, #fff0 .00008%, #fff0 .0008%, #fff0 .00008%)`,
          opacity: intensity,
          filter: blur + "px" && (key === "after" ? "none" : `blur(${blur}px)`),
          transform: key === "after" ? "rotate(180deg) scale(5)" : undefined,
          pointerEvents: "none",
        }}
      />
    ))}
  </div>
);

const DashboardLayout = ({ children }) => (
  <>
    <Dhead />
    <main>{children}</main>
    <div className="dfooter" />
  </>
);

function HomePage() {
  return (
    <>
      <SandBackground />
      <Header />
      <Hero />
      <What />
      <Howt />
      <Category />
      <Help />
      <Pack />
      <Comq />
      <Footer />
    </>
  );
}

function Games() {
  return (
    <>
      <Header />
      <Mgame />
    </>
  );
}

export default function App() {
  const [tick, setTick] = useState(0);

  const forceUpdate = () => setTick((prev) => prev + 1);

  return (
    <ForceUpdateContext.Provider value={forceUpdate}>
      <div key={tick}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/contact"
            element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/sign"
            element={
              <>
                <Header />
                <Sign />
                <Footer />
              </>
            }
          />
          <Route
            path="/rec"
            element={
              <>
                <Header />
                <Rec />
                <Footer />
              </>
            }
          />
          <Route
            path="/user"
            element={
              <>
                <Header />
                <User />
                <Footer />
              </>
            }
          />
          <Route
            path="/ver"
            element={
              <>
                <Header />
                <Ver />
                <Footer />
              </>
            }
          />

          <Route path="/games" element={<Games />} />
          <Route path="/game" element={<MainGame />} />
          <Route
            path="/start"
            element={
              <>
                <Header />
                <Start />
              </>
            }
          />

          <Route
            path="/dash"
            element={
              <DashboardLayout>
                <Dmain />
              </DashboardLayout>
            }
          />
          <Route
            path="/dmess"
            element={
              <DashboardLayout>
                <Dmess />
              </DashboardLayout>
            }
          />
          <Route
            path="/dreport"
            element={
              <DashboardLayout>
                <Dreport />
              </DashboardLayout>
            }
          />
          <Route
            path="/dsale"
            element={
              <DashboardLayout>
                <Dsale />
              </DashboardLayout>
            }
          />
          <Route
            path="/discount"
            element={
              <DashboardLayout>
                <Discount />
              </DashboardLayout>
            }
          />
          <Route
            path="/categories"
            element={
              <DashboardLayout>
                <Categories />
              </DashboardLayout>
            }
          />
          <Route
            path="/files"
            element={
              <DashboardLayout>
                <Files />
              </DashboardLayout>
            }
          />
          <Route
            path="/controls"
            element={
              <DashboardLayout>
                <Controls />
              </DashboardLayout>
            }
          />
          <Route
            path="/dgames"
            element={
              <DashboardLayout>
                <Dgames />
              </DashboardLayout>
            }
          />
          <Route
            path="/users"
            element={
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            }
          />
        </Routes>
      </div>
    </ForceUpdateContext.Provider>
  );
}
