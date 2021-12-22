import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currencyExchangeAction } from "../../store/actions";
import HomeHeights from "./HomeHeights";
import TopView from "./topView/topview";
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currencyExchangeAction());
  }, [dispatch]);
  return (
    <React.Fragment>
      <div className="page-view">
        <TopView />
      </div>
      <HomeHeights />
    </React.Fragment>
  );
}

export default Home;
