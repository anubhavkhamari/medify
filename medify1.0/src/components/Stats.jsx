import React, { useEffect, useState } from 'react'

const stats = [
  { id: 1, name: 'Docters We Have', value: 3000000 },
  { id: 2, name: 'Hospitals We Partnered With', value: 150000 },
  { id: 3, name: 'Patients We Treated Successfully', value: 10000000 },
]


const CountUpAnimation = ({
  initialValue,
  targetValue,
  text,
  id,
  pace
}) => {
  const [count, setCount] = useState(initialValue);
  const duration = 1000; // 4 seconds

  useEffect(() => {
      let startValue = initialValue;
      const interval = Math.floor(
          duration / (targetValue - initialValue));

      const counter = setInterval(() => {
          startValue += pace;
          setCount(startValue);
          if (startValue >= targetValue) {
              clearInterval(counter);
              setCount(targetValue)
          }
      }, interval);
console.log(pace)
      return () => {
          clearInterval(counter);
      };
  }, [targetValue, initialValue]);

  return (
      <div className="container">
          <div key={id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600"><b><i>{text}</i></b></dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {count}+
              </dd>
            </div>
      </div>
  );
};


function Stats() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <CountUpAnimation
            id={stat.id}
            initialValue={10000}
            targetValue={stat.value}
            text={stat.name}
            pace={stat.value/1000}
        />
            
          ))}
        </dl>
      </div>
    </div>
  )
}

export default Stats