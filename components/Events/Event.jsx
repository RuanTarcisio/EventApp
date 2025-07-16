import Image from "next/image";
import { BiCalendar, BiTime, BiMap } from "react-icons/bi";

const Event = ({ event }) => {
  return (
    <div className="bg-white/5 hover:bg-white/10 transition-all rounded-3xl flex flex-col justify-start p-4 w-full max-w-[320px] sm:max-w-full mx-auto sm:mx-0">
  <div className="relative w-full aspect-[4/3] mb-10">
    <Image
      src={event.img_sm}
      fill
      alt=""
      quality={100}
      className="rounded-2xl object-cover"
    />
    <div className="absolute -bottom-[24px] left-4 bg-accent w-[110px] h-[40px] text-[13px] uppercase font-medium rounded-full flex items-center justify-center shadow-md">
      {event.type}
    </div>
  </div>
      <div className="pl-4 flex flex-col justify-between h-[50%]">
        <div>
          <div className="flex items-center gap-3 text-accent mb-2">
            <div className="flex items-center gap-1">
              <BiCalendar />
              {/* hardcoded date, to change*/}
              <div className="text-[15px]">15.06.25</div>
            </div>

            <div className="flex items-center gap-1">
              <BiTime />
              <div className="text-[15px]">{event.hour}</div>
            </div>
          </div>
          <h4 className="h4">{event.title}</h4>
        </div>
        <div className="flex items-center gap-2 pb-2">
          <BiMap className="text-xl text-accent" />
          <p className="text-sm font-light text-white/70">{event.location}</p>
        </div>
      </div>
    </div>
  );
};

export default Event;
