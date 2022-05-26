import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { BuyItems, CreateItems, Home, Profile } from "../pages";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/create-items" exact element={<CreateItems />} />
        <Route path="/buy-items" exact element={<BuyItems />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
