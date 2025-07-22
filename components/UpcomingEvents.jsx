"use client";

import { EventContext } from "@/contexts/EventContext";
import { useContext, useEffect, useState } from "react";

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import swiper required modules
import { Pagination } from "swiper/modules";

import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

// import components
import Link from "next/link";
import Image from "next/image";
import Event from "./Events/Event";
import SkeletonGrid from "./SkeletonGrid";

const UpcomingEvents = () => {
  const { events } = useContext(EventContext);
  const [eventValue, setEventValue] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const filterEvents = () => {
      if (eventValue === "all") {
        setFilteredEvents(events);
      } else {
        const result = events.filter((event) => event.type === eventValue);
        setFilteredEvents(result);
      }
    };

    filterEvents();
  }, [eventValue, events]);

  return (
    <section>
      <div>
        <Tabs value={eventValue} onValueChange={setEventValue}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sport">Sport</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="art">Art</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {/* slider */}
      {filteredEvents.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ dynamicBullets: true, clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1310: { slidesPerView: 4 },
          }}
          modules={[Pagination]}
          className="w-full h-[500px]"
        >
          {filteredEvents.map((event, index) => {
            return (
              <SwiperSlide key={index} className="select-none">
                <Link href="">
                  <Event event={event} />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <SkeletonGrid itemCount={4} />
      )}
    </section>
  );
};

export default UpcomingEvents;
