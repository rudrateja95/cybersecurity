const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();


app.use(cors());
app.use(express.json());  


mongoose.connect('mongodb://localhost:27017/cybersecurity', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));


const Threat = mongoose.model('Threat', new mongoose.Schema({
  input: String,
  threatStatus: String,
}));


app.post('/submit-threat', async (req, res) => {
  const { input } = req.body;

  try {
  
    const response = await axios.post('http://127.0.0.1:5001/analyze', { input });

   
    const newThreat = new Threat({
      input,
      threatStatus: response.data.status,
    });
    await newThreat.save();

    res.json({ message: 'Threat submitted successfully', data: newThreat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while analyzing threat' });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Node server running on http://127.0.0.1:${PORT}`);
});
