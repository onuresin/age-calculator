export default function AgeCalculator(props) {
    const [age, setAge] = useState(0);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
    }
    switch (name) {
        case "day":
            if(value.length > 31) {
                setError("Please enter a valid day value")
            } else {
                setError(null);
            }
            break;
            case "month":
                if (value.lenght > 12) {
                    setError("Please enter a valid month value")
                } else {
                    setError(null);
                }
                break;
            case "year":
                if (value.lenght !== 4) {
                    setError("Please enter a valid year value")
                } else {
                    setError(null);
                }
                break;
    }
};

const handleCalculate = () => {
    // Bu değişkenler tek tek kullanıcının girdiği verileri kullanmak için verildi
   const birthYear = parseInt(props.year);
   const birthMonth = parseInt(props.month);
   const birthDay = parseInt(props.day);

   const today = new Date () ;   // bugünün tarihini alır ve değiştirir

   // hesaplamak için aşağıda ki değişkeni kullanırız

   const age = today.getFullYear() - birthYear;

   props.setAge(age);

   setError(null);
}

return (
    <div className="calculator-age">
        <div className="set-ddmmyy">
            <input type="number" placeholder="DD" onChange={handleChange} />
            <input type="number" placeholder="MM" onChange={handleChange} />
            <input type="number" placeholder="YYYY" onChange={handleChange}/>
            {error && <p style={{color: "red" }} >{error}</p>}
        </div>
        <div className="calculate-b-section">
            <button onClick={handleCalculate}><img src="purple-button.svg" alt="click-button" /></button>
        </div>
        <div className="result">
            <h3>{age} YEAR</h3>
            <h4>{age / 12 } MONTH</h4>
            <h5>{age % 12} DAY</h5>
        </div>
    </div>
)