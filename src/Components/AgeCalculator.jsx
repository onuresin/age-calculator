import React, { useState } from "react";

export default function AgeCalculator({ setAge, result }) {
  const [currentDay, setCurrentDay] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "day":
        // Gün kontrolü: 1 ile 31 arasında olmalı
        if (value < 1 || value > 31) {
          setError("Please enter a valid day (1-31)");
          return;
        }
        setCurrentDay(value);
        break;
      case "month":
        // Ay kontrolü: 1 ile 12 arasında olmalı
        if (value < 1 || value > 12) {
          setError("Please enter a valid month (1-12)");
          return;
        }
        setCurrentMonth(value);
        break;
      case "year":
        // Yıl kontrolü: Belirli bir sınır koyabilirsiniz (örneğin, 2023'e kadar)
        const currentYear = new Date().getFullYear();
        if (value < 1900 || value > currentYear) {
          setError(`Please enter a valid year (1900-${currentYear})`);
          return;
        }
        setCurrentYear(value);
        break;
      default:
        break;
    }
    // Hata olmadığında hatayı sıfırla
    setError(null);
  };

  const calculateAgeDetails = () => {
    const birthYear = parseInt(currentYear);
    const birthMonth = parseInt(currentMonth);
    const birthDay = parseInt(currentDay);

    const today = new Date();
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

    const ageInMilliseconds = today - birthDate;

    const years = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
    const birthDatePlusYears = new Date(birthDate);
    birthDatePlusYears.setFullYear(birthDatePlusYears.getFullYear() + years);

    const months = Math.floor((today - birthDatePlusYears) / (30.44 * 24 * 60 * 60 * 1000));
    const birthDatePlusMonths = new Date(birthDatePlusYears);
    birthDatePlusMonths.setMonth(birthDatePlusMonths.getMonth() + months);

    const days = Math.floor((today - birthDatePlusMonths) / (24 * 60 * 60 * 1000));

    setAge({ years, months, days });
  };

  const handleCalculate = () => {
    const birthYear = parseInt(currentYear);
    const birthMonth = parseInt(currentMonth);
    const birthDay = parseInt(currentDay);
  
    // Tarih kontrolü: Geçmiş tarih girilemez
    if (isNaN(birthYear) || isNaN(birthMonth) || isNaN(birthDay)) {
      setError("Please enter valid birth date");
      return;
    }
  
    // Gün, ay ve yıl kontrolü
    if (birthDay < 1 || birthDay > 31) {
      setError("Please enter a valid day (1-31)");
      return;
    }
  
    if (birthMonth < 1 || birthMonth > 12) {
      setError("Please enter a valid month (1-12)");
      return;
    }
  
    const currentYearValue = new Date().getFullYear(); // Değişiklik burada
    if (birthYear < 1900 || birthYear > currentYearValue) {
      setError(`Please enter a valid year (1900-${currentYearValue})`);
      return;
    }
  
    // If all checks pass, proceed with calculations
    calculateAgeDetails();
    setError(null);
  };

  return (
    <div className="calculator-age">
      <div className="set-ddmmyy">
        <input type="number" name="day" placeholder="DD" onChange={handleChange} />
        <input type="number" name="month" placeholder="MM" onChange={handleChange} />
        <input type="number" name="year" placeholder="YYYY" onChange={handleChange} />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="calculate-b-section">
        <button onClick={handleCalculate}>
          <img src="purple-button.svg" alt="click-button" />
        </button>
      </div>
      <div className="result">
        <h3>{result.years || "--"} YEARS</h3>
        <h3>{result.months || "--"} MONTHS</h3>
        <h3>{result.days || "--"} DAYS</h3>
      </div>
    </div>
  );
}