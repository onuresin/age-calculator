import React, { useState } from "react";
import PurpleButton from "../assets/purple-button.svg";
import BlackButton from "../assets/black-button.svg";
import Line from "../assets/line.svg";
import LongLine from "../assets/long-line.svg";

export default function AgeCalculator({ setAge, result }) {
  const [currentDay, setCurrentDay] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [error, setError] = useState(null);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "day") {
      setCurrentDay(value);
      if (value < 1 || value > 31) {
        setError("Must be a valid day");
        return;
      }
    }
    if (name === "month") {
      setCurrentMonth(value);
      if (value < 1 || value > 12) {
        setError("Must be a valid month");
        return;
      }
    }
    if (name === "year") {
      setCurrentYear(value);
      const thisYear = new Date().getFullYear();
      if (value < 1900 || value > thisYear) {
        setError(`Please enter a valid year (1900-${thisYear})`);
        return;
      }
    }
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

    if (isNaN(birthYear) || isNaN(birthMonth) || isNaN(birthDay)) {
      setError("Please enter valid birth date");
      return;
    }
    if (birthDay < 1 || birthDay > 31) {
      setError("Must be a valid day");
      return;
    }
    if (birthMonth < 1 || birthMonth > 12) {
      setError("Must be a valid month (1-12)");
      return;
    }
    const currentYearValue = new Date().getFullYear();
    if (birthYear < 1900 || birthYear > currentYearValue) {
      setError(`Must be in the past (1900-${currentYearValue})`);
      return;
    }
    calculateAgeDetails();
    setError(null);
  };

  return (
   <div className="container">
      <div className="calculator-age">
        <div className="set-ddmmyy">
          <span className="dd">
            <h4 style={{ color: error && error.includes("day") ? "#FF5959" : "" }}>DAY</h4>
            <input
              type="number"
              name="day"
              placeholder="DD"
              value={currentDay}
              onChange={handleChange}
              min="1"
              max="31"
            />
            {error && error.includes("day") && <h6>{error}</h6>}
          </span>
          <span className="mm">
            <h4 style={{ color: error && error.includes("month") ? "#FF5959" : "" }}>MONTH</h4>
            <input
              type="number"
              name="month"
              placeholder="MM"
              value={currentMonth}
              onChange={handleChange}
              min="1"
              max="12"
            />
            {error && error.includes("month") && <h6>{error}</h6>}
          </span>
          <span className="yyyy">
            <h4 style={{ color: error && error.includes("year") ? "#FF5959" : "" }}>YEAR</h4>
            <input
              type="number"
              name="year"
              placeholder="YYYY"
              value={currentYear}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
            />
            {error && error.includes("year") && <h6>{error}</h6>}
          </span>
        </div>
        <div className="calculate-b-section">
          <img className="line" src={Line} alt="line-gray" />
          <img
            className="hover-btn"
            onMouseOver={() => setIsMouseOver(true)}
            onMouseOut={() => setIsMouseOver(false)}
            onClick={handleCalculate}
            src={isMouseOver ? BlackButton : PurpleButton}
            alt="click-button"
          />
          <img className="line" src={Line} alt="line-gray" />
          <img className="line-2" src={LongLine} alt="line-gray" />
          <img
            className="hover-btn-2"
            onMouseOver={() => setIsMouseOver(true)}
            onMouseOut={() => setIsMouseOver(false)}
            onClick={handleCalculate}
            src={isMouseOver ? PurpleButton : BlackButton}
            alt="click-button"
          />
        </div>
        <div className="result">
          <h3 style={{ color: '#854DFF' }}>{result?.years ?? "--"} <span style={{ color: '#151515' }}>YEARS</span></h3>
          <h3 style={{ color: '#854DFF' }}>{result?.months ?? "--"} <span style={{ color: '#151515' }}>MONTHS</span></h3>
          <h3 style={{ color: '#854DFF' }}>{result?.days ?? "--"} <span style={{ color: '#151515' }}>DAYS</span></h3>
        </div>
      </div>
   </div>
  );
}
