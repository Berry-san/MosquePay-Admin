import React, { Suspense, useLayoutEffect } from "react";
import { Router, Route } from "react-router-dom";
import Chart from "../Chart/Chart";
import Donation from "../Donation/Donation";
import DonationCreate from "../Donation/DonationCreate";


export default function Pages() {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
      });

  return (
    <Suspense>
        <Router>
            <Route exact path="/" component={Chart} />
            <Route exact path="/donate" component={Donation} />
            <Route exact path="/dashboard" component={DonationCreate} />
        </Router>
    </Suspense>
  )
}
