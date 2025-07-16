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

  //applied filters (after submit)
  const [appliedFilters, setApplietFilters] = useState({
    searchTerm: "",
    selectedLocation: "",
    selectedDate: null,
  });

const filteredEvents = useMemo(() => {
  const today = new Date();
  // Normaliza 'today' para o início do dia no fuso horário local
  const todayMidnightLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return events.filter((event) => {
    // 1. Converte a string 'event.date' para um objeto Date.
    // Usamos 'event.date + "T00:00:00"' para forçar a interpretação como início do dia local,
    // ou apenas new Date(event.date) e depois ajustar.
    // A forma mais segura é: new Date(year, month, day) para criar no fuso horário local.
    const eventYear = parseInt(event.date.substring(0, 4));
    const eventMonth = parseInt(event.date.substring(5, 7)) - 1; // Mês é 0-indexado
    const eventDay = parseInt(event.date.substring(8, 10));

    // Cria a data do evento à meia-noite no fuso horário local
    const eventDateMidnightLocal = new Date(eventYear, eventMonth, eventDay);

    // Verifica se o evento já passou
    if (eventDateMidnightLocal < todayMidnightLocal) {
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

    let matchesDate = true; // Assume true by default
    if (appliedFilters.selectedDate) {
      // Normaliza 'selectedDate' (do DatePicker) para o início do dia no fuso horário local
      const selectedDateMidnightLocal = new Date(
        appliedFilters.selectedDate.getFullYear(),
        appliedFilters.selectedDate.getMonth(),
        appliedFilters.selectedDate.getDate()
      );

      // Compara os milissegundos para ver se são o mesmo dia local
      matchesDate = eventDateMidnightLocal.getTime() === selectedDateMidnightLocal.getTime();
    }

    // Logs para depuração mais detalhada
    console.log('--- Evento:', event.title, '---');
    console.log('Data do Evento (original):', event.date);
    console.log('Data do Evento (normalizada local):', eventDateMidnightLocal);
    console.log('Data Selecionada (normalizada local):', appliedFilters.selectedDate ? new Date(appliedFilters.selectedDate.getFullYear(), appliedFilters.selectedDate.getMonth(), appliedFilters.selectedDate.getDate()) : 'N/A');
    console.log('Hoje (normalizado local):', todayMidnightLocal);
    console.log('EventDateMidnightLocal < TodayMidnightLocal:', eventDateMidnightLocal < todayMidnightLocal);
    console.log('matchesSearch:', matchesSearch);
    console.log('matchesLocation:', matchesLocation);
    console.log('matchesDate:', matchesDate);
    console.log('Resultado Final para este evento:', matchesSearch && matchesLocation && matchesDate);


    return matchesSearch && matchesLocation && matchesDate;
  });
}, [events, appliedFilters]);

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
    setIsLoading(true);
    setShowEventList(true);
    setApplietFilters({ searchTerm, selectedLocation, selectedDate });
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowEventList(false);
    setSelectedLocation("");
    setSelectedDate(null);
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
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
