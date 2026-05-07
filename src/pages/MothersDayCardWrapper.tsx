import { useEffect, useState } from "react";
import MothersDayCard from "./MothersDayCard.tsx";



// Entry point or Root component
function MothersDayCardWrapper() {
  const [remountKey, setRemountKey] = useState(0);

  useEffect(() => {
    const handleResize = () => setRemountKey(prev => prev + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // When remountKey changes, the Parent AND all its children will remount
  return <MothersDayCard key={remountKey} />;
}

export default MothersDayCardWrapper;