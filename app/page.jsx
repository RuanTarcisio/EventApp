"use client";

import Searchbar from "@/components/SearchBar/Searchbar";
import { EventContext } from "@/contexts/EventContext";
import React, { useContext } from "react";

const Home = () => {
  return (
    <div>
      <Searchbar />
    </div>
  );
};

export default Home;
