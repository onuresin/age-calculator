import { useState,useEffect, useRef } from "react";
import AgeCalculator from "./Components/AgeCalculator";


function App() {
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(1900);

  const errorRef = useRef(null);

  useEffect(() => {
    // WorldTimeAPI'den saat bilgisini çekmek için fetch kullanıp r
    fetch("http://worldtimeapi.org/api/ip")
      .then((r) => r.json())
      .then((data) => {
        // Bugünkü tarihi bul
        const today = new Date(data.unixtime * 1000);

        // Yaş hesaplar
        const age = today.getFullYear() - year;

        // Yaş bilgisini AgeCalculator komponentine gönderir
        setAge(age);
      });
  }, []);
  return (
    <AgeCalculator />
  )
}
export default App
