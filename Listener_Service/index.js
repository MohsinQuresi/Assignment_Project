// listener.js
const { v4: uuidv4 } = require('uuid');
const db = require("./Database_files/config");
const SecondTable = require("./Database_files/secondTable");
const FirstTable = require("./Database_files/firstTable");
const express = require('express');
const app = express();


app.use(express.json());
// Subscriber to events from Receiver Service (simplified example)
const pollForNewRecords = async () => {
    try {
        const changes = await FirstTable.find({}).sort({ _id: -1 }).limit(1).exec();
        const latestChange = changes[0];
        if (latestChange) {
            // Process the latest change
            // Copy the received record to the second table with modified attributes
            const modifiedRecord = new SecondTable({
                id: latestChange.id,
                user: latestChange.user,
                class: latestChange.class,
                age: latestChange.age,
                email: latestChange.email,
                inserted_at: latestChange.inserted_at,
                modified_at: new Date()
            });
            await modifiedRecord.save();
            console.log('Record copied to second table with modified attributes');
        }
    } catch (err) {
        console.error('Error polling for new records:', err);
    }
};

// Start polling for new records every 5 seconds (adjust as needed)
pollForNewRecords();

app.listen(9981)