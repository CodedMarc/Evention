// read env vars from .env file
require('dotenv').config();
import express from 'express';
import cors from 'cors';
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }))
app.use(cors());



app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});