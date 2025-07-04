import { useState } from "react";
import AgeCalculator from "./Components/AgeCalculator";

function App() {
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });

  return (
    <AgeCalculator 
      setAge={setAge}
      result={age}
    />
  );
}

export default App;