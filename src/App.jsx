import { useState,useEffect} from "react";
import AgeCalculator from "./Components/AgeCalculator";


function App() {
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(1900);
  const [today, setToday] = useState(new Date());
  const [age, setAge] = useState(0);
  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone/Europe/Istanbul")
      .then((r) => r.json())
      .then((data) => setToday(new Date(data.unixtime * 1000)));
  }, []);

  return (
    <AgeCalculator 
      day={day}
      month={month}
      year={year}
      setAge={setAge}
      today={today}
      result={age}
    />
    
  );
}

export default App;