// TicketProvider.jsx
"use client";

import { createContext, useState, useEffect } from "react";

export const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [event, setEvent] = useState(null);
  const [seat, setSeat] = useState({ seat: null, price: null });
  const [showMenu, setShowMenu] = useState(false);
  const [itemAmount, setItemAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutData, setCheckoutData] = useState(null);

  const initializeEvent = (fetchedEvent) => {
    setEvent(fetchedEvent);
    setItemAmount(1);
    const frontseat = fetchedEvent?.seats.find(
      (seat) => seat.seat === "frontseat"
    );
    if (frontseat) {
      setSeat({ seat: frontseat.seat, price: frontseat.price });
    } else {
      // Se não houver frontseat, defina um valor inicial seguro, como o primeiro assento ou null
      setSeat({
        seat: fetchedEvent?.seats[0]?.seat || null,
        price: fetchedEvent?.seats[0]?.price || null,
      });
    }
    // Garanta que o menu esteja fechado ao inicializar um novo evento
    setShowMenu(false);
  };

  // Efeito para lidar com clique fora do menu para fechá-lo
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Verifica se o clique não foi dentro de um elemento com a classe 'custom-select'
      // E se o menu está aberto
      if (showMenu && !e.target.closest(".custom-select")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]); // Depende de showMenu para que o listener seja reavaliado quando showMenu muda

  // Calcula o preço total sempre que o preço do assento ou a quantidade do item mudam
  useEffect(() => {
    setTotalPrice(seat.price * itemAmount);
  }, [seat.price, itemAmount]);

  // Função para lidar com a seleção do assento
  const handleSeat = (selectedSeat, selectedPrice) => {
    setSeat({ seat: selectedSeat, price: selectedPrice });
    setShowMenu(false); // Fecha o menu ao selecionar um item
  };

  const buyNow = (event) => {
    const ticketData = {
      eventId: event.id,
      eventName: event.title,
      ticketType: seat.seat,
      ticketPrice: seat.price,
      amount: itemAmount,
      totalPrice,
    };
    setCheckoutData(ticketData); // in case if we want to use the data for the checkout page
    console.log(checkoutData)
  };

  const increaseAmount = () => {
    setItemAmount((prevAmount) => ++prevAmount);
  };

  const decreaseAmount = () => {
    setItemAmount((prevAmount) =>
      prevAmount > 1 ? --prevAmount : (prevAmount = 0)
    );
  };

  return (
    <TicketContext.Provider
      value={{
        event,
        seat,
        showMenu,
        itemAmount,
        totalPrice,
        checkoutData,
        handleSeat,
        setSeat,
        setShowMenu,
        buyNow,
        initializeEvent,
        decreaseAmount,
        increaseAmount,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;
