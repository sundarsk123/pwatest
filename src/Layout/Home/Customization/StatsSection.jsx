"use client"
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';


export default function StatsSection({counter_section}) {
  const stats = [
  { number: counter_section[0]?.counter_number, label: counter_section[0]?.counter_text},
  { number: counter_section[1]?.counter_number, suffix: counter_section[1]?.counter_letter+counter_section[1]?.counter_symbol, label: counter_section[1]?.counter_text },
  { number: counter_section[2]?.counter_number, label: counter_section[2]?.counter_text },
  { number: counter_section[3]?.counter_number, suffix: counter_section[3]?.counter_symbol, label: counter_section[3]?.counter_text },
];
  return (
    <div className="relative z-10">
      {/* Top blur light overlay */}
      <div className="absolute top-0 left-0 w-full h-[50px] bg-[#000]/100 blur-3xl opacity-100" />

      <div className="bg-[#0F0601] text-white -mt-[3rem] lg:-mt-[0rem] pt-[2rem] md:pt-[5rem] lg:pt-[6rem] pb-[3rem] md:pb-[5rem] ">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-[2rem] md:gap-0 place-items-center md:place-items-center">
          {stats.map((item, index) => (
            <StatItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

// bg-gradient-to-b from-[#170A02]/98 to-[#0F0601]


function StatItem({ item }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div ref={ref}>
      <div className={item.suffix ? "flex items-end lg:items-start" : ""}>
        <span className="font-tan-pearl text-[2rem] lg:text-[4.5rem] block md:mb-2">
          <CountUp
            end={inView ? parseInt(item.number) : 0}
            duration={1}
            formattingFn={(value) => 
              item.number.length === 2 && value < 10 
                ? value.toString().padStart(2, '0') 
                : value.toString()
            }
          />
        </span>
        {item.suffix && (
          <span className="lg:text-[2.5rem] text-[1.25rem] font-tan-pearl lg:pt-8">
            {item.suffix}
          </span>
        )}
      </div>
      <p className="text-[#ACACAC] text-[0.9rem] lg:text-[1.2rem] border-t border-[#ACACAC] pt-2 w-[6rem] lg:w-[12rem] mx-auto">
        {item.label}
      </p>
    </div>
  );
}