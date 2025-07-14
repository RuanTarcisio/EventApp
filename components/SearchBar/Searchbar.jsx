import React, { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";
import EventSearch from "./EventSearch";

const Searchbar = () => {
  const { handleSubmit, } = useContext(EventContext);

  return (
    <div className="bg-white/5 w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-max p-8 xl:pl-8 xl:pr-2 h-auto xl:h-[70px] rounded-3xl xl:rounded-full backdrop-blur-[20px] flex flex-col xl:flex-row items-center gap-6 mx-auto text-sm">
      {/*event search*/}
      <div>
        <EventSearch />
      </div>
      {/*event location*/}
      <div>Event Location</div>
      {/*event date*/}
      <div>Event Date</div>
      {/*event location*/}
      <div>Event Type</div>
      <button onClick={handleSubmit} className="btn btn-accent">Submit</button>
    </div>
  );
};

export default Searchbar;
