"use client";

import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  Children,
} from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  //applied filters (after submit)
  const [appliedFilters, setApplietFilters] = useState({
    searchTerm: "",
  });

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // chech search term
      const matchesSearch = appliedFilters.searchTerm
        ? event.title
            .toLowerCase()
            .includes(appliedFilters.searchTerm.toLowerCase())
        : true;

      return matchesSearch;
    });
  }, [events, appliedFilters]);
  console.log(filteredEvents);

  //fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      //start loader
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:4000/events");
        if (!res.ok) throw new Error("Failed to fetch events.");
        const data = await res.json();
        setEvents(data);
        // stop loader
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = () => {
    setApplietFilters({searchTerm});
  }

  const handleClearSearch = () => {
    setSearchTerm("");
  }

  return (
    <EventContext.Provider
      value={{
        events,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        filteredEvents,
        handleClearSearch,
        handleSubmit,

      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
