import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

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
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
export const ForceUpdateContext = createContext();
import { ToastContainer, toast } from "react-toastify";
import CategoryView from "./components/dashboard/categories/category/view";
import CategoryEdit from "./components/dashboard/categories/category/edit";
import GameResult from "./components/game/Result";
import { Privacy } from "./components/home/privacy/privacy";
import { Refund } from "./components/home/refund/refund";
import { AbilityContext, defineAbilitiesFor } from "./context/abilityContext";
const DashboardLayout = ({ children }) => (
  <>
    <Dhead />
    <main>{children}</main>
    <div className="dfooter" />
  </>
);

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get("payment");
    if (paymentStatus === "success") {
      toast.success("تمت العملية بنجاح ✅");
    } else if (paymentStatus === "failed") {
      toast.error("فشلت العملية ❌");
    } else if (paymentStatus === "error") {
      toast.warning("حدث خطأ أثناء العملية ⚠️");
    }
  }, [location.search]);
  return (
    <>
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
  const { loginType, user } = useSelector((state) => state.users);
  const privileges = user?.privileges || [];
  const ability = defineAbilitiesFor(privileges);
  // Import hooks and selector

  // Helper components for route protection
  function RequireAuth({ allowedTypes, children, redirectTo }) {
    const location = useLocation();

    if (!loginType) {
      // Not logged in, redirect to login
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (!allowedTypes.includes(loginType)) {
      // Wrong type, redirect accordingly

      return <Navigate to={redirectTo} replace />;
    }
    return children;
  }
  function RequireAbility({ action, subject, children, redirectTo }) {
    const location = useLocation();

    if (!ability.can(action, subject)) {
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    return children;
  }

  return (
    <AbilityContext.Provider value={ability}>
      <ForceUpdateContext.Provider value={forceUpdate}>
        <div key={tick}>
          <ToastContainer />
          <Routes>
            {/* Public routes */}
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
              path="/privacy"
              element={
                <>
                  <Header />
                  <Privacy />
                  <Footer />
                </>
              }
            />
            <Route
              path="/refund"
              element={
                <>
                  <Header />
                  <Refund />
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
              path="/ver"
              element={
                <>
                  <Header />
                  <Ver />
                  <Footer />
                </>
              }
            />

            {/* User protected routes */}
            <Route
              path="/user"
              element={
                <RequireAuth allowedTypes={["user"]} redirectTo="/admin">
                  <>
                    <Header />
                    <User />
                    <Footer />
                  </>
                </RequireAuth>
              }
            />
            <Route
              path="/packages"
              element={
                <RequireAuth allowedTypes={["user"]} redirectTo="/admin">
                  <>
                    <Header />
                    <Pack />
                    <Footer />
                  </>
                </RequireAuth>
              }
            />
            <Route
              path="/games"
              element={
                <RequireAuth allowedTypes={["user"]} redirectTo="/admin">
                  <Games />
                </RequireAuth>
              }
            />
            <Route
              path="/game"
              element={
                <RequireAuth allowedTypes={["user"]} redirectTo="/admin">
                  <MainGame />
                </RequireAuth>
              }
            />
            <Route
              path="/game/result"
              element={
                <RequireAuth allowedTypes={["user"]} redirectTo="/admin">
                  <Header />

                  <GameResult />
                </RequireAuth>
              }
            />
            <Route
              path="/start"
              element={
                <RequireAuth allowedTypes={["user"]} redirectTo="/admin">
                  <>
                    <Header />
                    <Start />
                  </>
                </RequireAuth>
              }
            />

            {/* Admin protected routes */}
            <Route
              path="admin"
              element={
                <RequireAuth allowedTypes={["admin"]} redirectTo="/user">
                  <DashboardLayout>
                    <Dmain />
                  </DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="admin/login"
              element={
                <>
                  <Header />
                  <Login />
                  <Footer />
                </>
              }
            />
            <Route
              path="admin/dmess"
              element={
                <RequireAuth allowedTypes={["admin"]} redirectTo="/user">
                  <RequireAbility action="view" subject="Messages" redirectTo="/admin">
                    <DashboardLayout>
                      <Dmess />
                    </DashboardLayout>
                  </RequireAbility>
                </RequireAuth>
              }
            />
            <Route
              path="admin/dreport"
              element={
                <RequireAuth allowedTypes={["admin"]} redirectTo="/user">
                  <RequireAbility action="view" subject="Reports" redirectTo="/admin">
                    <DashboardLayout>
                      <Dreport />
                    </DashboardLayout>
                  </RequireAbility>
                </RequireAuth>
              }
            />
            <Route
              path="admin/dsale"
              element={
                <RequireAuth allowedTypes={["admin"]} redirectTo="/user">
                  <RequireAbility action="view" subject="Sales" redirectTo="/admin">
                    <DashboardLayout>
                      <Dsale />
                    </DashboardLayout>
                  </RequireAbility>
                </RequireAuth>
              }
            />
            <Route
              path="admin/discount"
              element={
                <RequireAuth allowedTypes={["admin"]} redirectTo="/user">
                  <RequireAbility action="manage" subject="all" redirectTo="/admin">
                    <DashboardLayout>
                      <Discount />
                    </DashboardLayout>
                  </RequireAbility>
                </RequireAuth>
              }
            />
            <Route
              path="admin/categories"
              element={
                <RequireAuth allowedTypes={["admin"]} redirectTo="/user">
                  <RequireAbility action="manage" subject="Categories" redirectTo="/admin">
                    <DashboardLayout>
                      <Categories />
                    </DashboardLayout>
                  </RequireAbility>
                </RequireAuth>
              }
            />
            <Route
              path="admin/category/view/:id"
              element={
                <RequireAuth allowedTypes={["admin"]} redirectTo="/user">
                  <RequireAbility action="manage" subject="Categories" redirectTo="/admin">
                    <DashboardLayout>
                      <CategoryView />
                    </DashboardLayout>
                  </RequireAbility>
                </RequireAuth>
              }
            />
            <Route
              path="admin/category/edit/:id"
              element={
                <RequireAuth allowedTypes={["admin"]} redirectTo="/user">
                  <RequireAbility action="manage" subject="Categories" redirectTo="/admin">
                    <DashboardLayout>
                      <CategoryEdit />
                    </DashboardLayout>
                  </RequireAbility>
                </RequireAuth>
              }
            />
            <Route
              path="admin/files"
              element={
                <RequireAuth allowedTypes={["admin"]} redirectTo="/user">
                  <RequireAbility action="view" subject="Files" redirectTo="/admin">
                    <DashboardLayout>
                      <Files />
                    </DashboardLayout>
                  </RequireAbility>
                </RequireAuth>
              }
            />
            <Route
              path="admin/controls"
              element={
                <RequireAuth allowedTypes={["admin"]} redirectTo="/user">
                  <RequireAbility action="manage" subject="all" redirectTo="/admin">
                    <DashboardLayout>
                      <Controls />
                    </DashboardLayout>
                  </RequireAbility>
                </RequireAuth>
              }
            />
            <Route
              path="admin/dgames"
              element={
                <RequireAuth allowedTypes={["admin"]} redirectTo="/user">
                  <RequireAbility action="manage" subject="all" redirectTo="/admin">
                    <DashboardLayout>
                      <Dgames />
                    </DashboardLayout>
                  </RequireAbility>
                </RequireAuth>
              }
            />
            <Route
              path="admin/users"
              element={
                <RequireAuth allowedTypes={["admin"]} redirectTo="/user">
                  <RequireAbility action="manage" subject="all" redirectTo="/admin">
                    <DashboardLayout>
                      <Users />
                    </DashboardLayout>
                  </RequireAbility>
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </ForceUpdateContext.Provider>
    </AbilityContext.Provider>
  );
}
