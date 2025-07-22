"use client";

import React, { createContext, useEffect, useState, useMemo } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEventList, setShowEventList] = useState(false);

  // current filter inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");

  //applied filters (after submit)
  const [appliedFilters, setApplietFilters] = useState({
    searchTerm: "",
    selectedLocation: "",
    selectedDate: null,
    selectedType: "",
  });

  const filteredEvents = useMemo(() => {
    const today = new Date();
    // Cria 'today' como meia-noite UTC (do seu dia local atual)
    const todayMidnightUTC = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    );

    return events.filter((event) => {
      // 1. Parseia a data do evento da string (assumindo que "YYYY-MM-DD" é o dia no fuso horário do evento)
      const eventYear = parseInt(event.date.substring(0, 4));
      const eventMonth = parseInt(event.date.substring(5, 7)) - 1; // Mês é 0-indexado
      const eventDay = parseInt(event.date.substring(8, 10));

      // Cria a data do evento à meia-noite UTC para comparação consistente
      const eventDateMidnightUTC = new Date(
        Date.UTC(eventYear, eventMonth, eventDay)
      );

      // Verifica se o evento já passou (comparação em UTC)
      if (eventDateMidnightUTC < todayMidnightUTC) {
        return false;
      }

      // chech search term
      const matchesSearch = appliedFilters.searchTerm
        ? event.title
            .toLowerCase()
            .includes(appliedFilters.searchTerm.toLowerCase())
        : true;

      // check location
      const matchesLocation = appliedFilters.selectedLocation
        ? event.location.toLowerCase() ===
          appliedFilters.selectedLocation.toLowerCase()
        : true;

      let matchesDate = true;
      if (appliedFilters.selectedDate) {
        // Cria a data selecionada à meia-noite UTC
        const selectedDateMidnightUTC = new Date(
          Date.UTC(
            appliedFilters.selectedDate.getFullYear(),
            appliedFilters.selectedDate.getMonth(),
            appliedFilters.selectedDate.getDate()
          )
        );
        // Compara os milissegundos UTC
        matchesDate =
          eventDateMidnightUTC.getTime() === selectedDateMidnightUTC.getTime();
      }

      const matchesType = appliedFilters.selectedType
        ? event.type.toLowerCase() === appliedFilters.selectedType.toLowerCase()
        : true;

      return matchesSearch && matchesLocation && matchesDate && matchesType;
    });
  }, [events, appliedFilters]);

  //fetch events
  useEffect(() => {
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      // URL condicional para desenvolvimento/produção
      const apiUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000/events'
        : 'https://eventapp-5yie.onrender.com/api/events';
      
      const res = await fetch(apiUrl);
      
      if (!res.ok) throw new Error("Failed to fetch events.");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  fetchEvents();
}, []);

  const handleSubmit = () => {
    setIsLoading(true);
    setShowEventList(true);
    setApplietFilters({
      searchTerm,
      selectedLocation,
      selectedDate,
      selectedType,
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowEventList(false);
    setSelectedLocation("");
    setSelectedDate(null);
    setSelectedType("");
  };

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
        showEventList,
        setSelectedLocation,
        selectedLocation,
        selectedDate,
        setSelectedDate,
        selectedType,
        setSelectedType,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
