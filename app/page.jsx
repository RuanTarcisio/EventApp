"use client";

import Searchbar from "@/components/SearchBar/Searchbar";
import EventList from "@/components/Events/EventList";
import { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";

const Home = () => {
  const { showEventList, handleClearSearch } = useContext(EventContext);
  console.log(showEventList);
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Searchbar />
        {/* clear search */}
        <button onClick={() => handleClearSearch()} className="text-accent">
          clear search
        </button>
      </div>
      {showEventList ? (
        <div className="container mx-auto">
          <EventList />
        </div>
      ) : (
        <div>
          {/* upcoming events slider */}
          <div>upcoming events slider</div>
          {/* download app section */}
          <div>download app section</div>
          {/* recomended events slider*/}
          <div>recomended events slider</div>
        </div>
      )}
    </div>
  );
};

export default Home;
