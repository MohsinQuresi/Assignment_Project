// Receiver Service
const express = require('express');
require("./Database_files/config");
const FirstTable = require("./Database_files/firstTable");
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');



app.use(express.json());
app.use(bodyParser.json());


app.post('/receiver', async (req, res) => {
    try {
      const { user, class: userClass, age, email } = req.body;
      if (!user || !userClass || !age || !email) {
        return res.status(400).json({ error: 'Incomplete data' });
      }
  
      const newRecord = new FirstTable({
        id: uuidv4(),
        user,
        class: userClass,
        age,
        email,
      });
      await newRecord.save();
  
      res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(9980)