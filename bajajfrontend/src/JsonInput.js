// src/JsonInput.js
import React, { useState } from 'react';
import axios from 'axios';

const JsonInput = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (e) => {
        setJsonInput(e.target.value);
    };

    const validateJson = (input) => {
        try {
            JSON.parse(input);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateJson(jsonInput)) {
            setError('Invalid JSON format. Please correct it.');
            return;
        }

        setError('');
        try {
            // Make POST request to backend
            const response = await axios.post('http://localhost:3000/bfhl', JSON.parse(jsonInput));
            setResponseData(response.data);
        } catch (error) {
            setError('Error calling the API: ' + error.message);
        }
    };

    const handleSelectChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    const renderResponse = () => {
        if (!responseData) return null;

        let filteredData = responseData;

        if (selectedOptions.includes('Alphabets')) {
            filteredData = filteredData.filter(item => isNaN(item)); // Only alphabets
        }

        if (selectedOptions.includes('Numbers')) {
            filteredData = filteredData.filter(item => !isNaN(item)); // Only numbers
        }

        // Implement logic for "Highest Alphabet" if needed

        return filteredData.map((item, index) => (
            <div key={index}>{item}</div>
        ));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={handleChange}
                    placeholder="Enter valid JSON"
                    rows="5"
                    cols="30"
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            
            {responseData && (
                <div>
                    <select multiple onChange={handleSelectChange}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest Alphabet">Highest Alphabet</option>
                    </select>
                    <div>
                        <h3>Response:</h3>
                        {renderResponse()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JsonInput;
