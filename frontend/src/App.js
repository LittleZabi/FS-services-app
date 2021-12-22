import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/main.scss";
import Header from "./components/header";
import Home from "./view/home/home";
import ServicesList from "./view/services/services-list";
import NotFound from "./view/notFound/notFound";
import Footer from "./components/footer";
import RegistrationForm from "./view/regsiteration/form";
import Login from "./view/user/login";
import Profile from "./view/user/profile";
import Messages from "./components/messages";
import ModalView from "./components/modal";
import { SHOW_MESSAGE, SHOW_MODAL } from "./store/constants";
import PlaceOrders from "./view/place-orders/placeorder";
import ActivateUser from "./view/user/activate-user";
import Contact from "./view/contact/contact";
import MyOrder from "./view/place-orders/order-details";
import ClientArea from "./view/client-area/client-area";
import PaymentsRequest from "./view/payments/payments";
import Logout from "./view/user/logout";
import { currencyExchangeAction } from "./store/actions";

function App() {
  const modal = useSelector((state) => state.TopReducer);
  const dispatch = useDispatch();
  const [crncy_rate, setCrncyRate] = useState(["PKR", 1]);
  const crncy_red = useSelector((state) => state.CrncyExchangeRed);
  {
    let _crnt_rate = 1;
    let _crnt_symbol = "PKR";
    if (crncy_red.payload) {
      if (crncy_red.payload.currency) {
        let crnc = crncy_red.payload.currency;
        _crnt_symbol = crnc[0].split("_")[1];
        _crnt_rate = crnc[1];
      }
    }
    useEffect(() => {
      setCrncyRate([_crnt_symbol, _crnt_rate]);
    }, [crncy_red, _crnt_rate, _crnt_symbol]);
  }
  useEffect(() => {
    dispatch(currencyExchangeAction());
  }, [dispatch]);
  useEffect(() => {
    const btn = document.querySelector(".nav-menu-btn svg");
    modal.status && modal.payload.ModalType === "NavBar"
      ? btn.classList.add("open")
      : btn.classList.remove("open");
  }, [modal.status, modal.payload.ModalType]);
  return (
    <BrowserRouter>
      <Header />
      <main>
        {modal.status === SHOW_MODAL ? <ModalView ModalPayload={modal} /> : ""}
        {modal.status === SHOW_MESSAGE ? (
          <Messages payload={modal.payload} />
        ) : (
          ""
        )}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="register" element={<RegistrationForm />} />
          <Route
            path="/services"
            element={<ServicesList currency={crncy_rate} />}
          />
          <Route
            path="placeorder"
            element={<PlaceOrders currency={crncy_rate} />}
          />
          <Route path="client" element={<ClientArea currency={crncy_rate} />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="contact" element={<Contact />} />
          <Route path="logout" element={<Logout />} />
          <Route
            path="/payment-request"
            element={<PaymentsRequest currency={crncy_rate} />}
          />
          <Route
            path="my-order/:slug"
            element={<MyOrder currency={crncy_rate} />}
          />
          <Route path="activate-user/:token" element={<ActivateUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
