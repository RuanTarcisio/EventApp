"use client";

import EventList from "@/components/Events/EventList";
import { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";
import Hero from "@/components/Hero";

const Home = () => {
  const { showEventList, handleClearSearch } = useContext(EventContext);

  return (
    <div>
      <Hero />
      <div className="flex flex-col justify-center items-center"> 
       
      </div>
      {showEventList ? (
        <div className="container mx-auto">
          <EventList />
        </div>
      ) : (
        <div>
          <div className="container mx-auto">
            {/* upcoming events slider */}
            <div>upcoming events slider</div>
            {/* download app section */}
            <div>download app section</div>
            {/* recomended events slider*/}
            <div>recomended events slider</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
