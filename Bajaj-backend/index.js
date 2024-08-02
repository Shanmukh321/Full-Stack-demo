const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3000;

// Helper function to separate numbers and alphabets
const separateData = (data) => {
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestAlphabet = alphabets.length ? [alphabets.sort().pop()] : [];
    return { numbers, alphabets, highestAlphabet };
};

// GET endpoint that returns an operation code
app.get('/bfhl', (req, res) => {
    console.log("GET request received");
    res.json({ operation_code: 1 });
});

// POST endpoint that returns specified details
app.post('/bfhl', (req, res) => {
    console.log("POST request received");
    console.log("Request body:", req.body);
    
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
        console.log("Invalid input: no data provided or data is not an array");
        return res.status(400).json({ is_success: false, message: 'Invalid input' });
    }

    const { numbers, alphabets, highestAlphabet } = separateData(data);
    console.log("Processed data:", { numbers, alphabets, highestAlphabet });
    
    res.json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});