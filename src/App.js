import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonInput
      });
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;

    return (
      <div>
        <h2>Response:</h2>
        {selectedOptions.includes('Alphabets') && <p>Alphabets: {responseData.alphabets.join(', ')}</p>}
        {selectedOptions.includes('Numbers') && <p>Numbers: {responseData.numbers.join(', ')}</p>}
        {selectedOptions.includes('Highest lowercase alphabet') && <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet}</p>}
      </div>
    );
  };

  return (
    <div>
      <h1>BFHL Challenge Frontend</h1>
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON input here"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      <div>
        <h3>Select options to display:</h3>
        <label>
          <input type="checkbox" value="Alphabets" onChange={handleOptionChange} />
          Alphabets
        </label>
        <label>
          <input type="checkbox" value="Numbers" onChange={handleOptionChange} />
          Numbers
        </label>
        <label>
          <input type="checkbox" value="Highest lowercase alphabet" onChange={handleOptionChange} />
          Highest lowercase alphabet
        </label>
      </div>

      {renderResponse()}
    </div>
  );
}

export default App;
