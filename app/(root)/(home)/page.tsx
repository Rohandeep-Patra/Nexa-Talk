import MeetingTypeList from "@/components/MeetingTypeList";
import React from "react";

const Home = () => {
  const currentDateAndTime = new Date();
  const time = currentDateAndTime.toLocaleTimeString("en-india", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-india", {
    dateStyle: "full",
  }).format(currentDateAndTime);
  return (
    <section className="flex size-full flex-col gap-6 sm:gap-8 md:gap-10 text-white">
      <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-11">
          <h2 className="glassmorphism max-w-[200px] sm:max-w-[240px] md:max-w-[270px] rounded py-1.5 sm:py-2 text-center text-sm sm:text-base font-normal">
            Upcoming Meetings At {time}
          </h2>
          <div className="flex flex-col gap-1 sm:gap-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold">
              {time}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-sky-1">
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  );
};

export default Home;
