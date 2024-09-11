import { Card } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
// import { useUser } from '../../store/store';

const Welcome: React.FC = () => {
  // State variables
  const [currentTime, setCurrentTime] = useState<Dayjs>(dayjs());
  const [greeting, setGreeting] = useState<string>('');
  const [cover, setCover] = useState<string>('');
  //   const { username } = useUser();

  // Function to format date and time
  const formatDate = (date: Dayjs): string => {
    return date.format('dddd, MMMM D, YYYY h:mm A');
  };

  // Function to determine greeting based on current hour
  const determineGreeting = (hour: number): string => {
    if (hour >= 1 && hour <= 11) return 'Morning';
    else if (hour >= 12 && hour <= 17) return 'Afternoon';
    else return 'Evening';
  };

  // Function to determine cover image based on current hour
  const determineCoverImage = (hour: number): string => {
    if (hour >= 6 && hour <= 8) return '/dawn.svg';
    else if (hour >= 9 && hour <= 16) return '/morning.svg';
    else if (hour >= 17 && hour <= 18) return '/sunset.svg';
    else return '/night.svg';
  };

  // Effect to update time and related state variables
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = dayjs();
      setCurrentTime(currentTime);
      const currentHour = currentTime.hour();
      setGreeting(determineGreeting(currentHour));
      setCover(determineCoverImage(currentHour));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-y-5">
      <Card cover={<img src={cover} alt="Cover" />}>
        <h2 className="text-lg font-medium capitalize">
          Good {greeting}, Allan
        </h2>
        <p className="text-slate-500 py-2">
          Today is {formatDate(currentTime)}
        </p>
      </Card>
    </div>
  );
};

export default Welcome;
