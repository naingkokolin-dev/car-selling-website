const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const carsData = require('./data/cars.json');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/listings', (req, res) => {
  res.sendFile(__dirname + '/public/html/listings.html');
});

app.get('/details', (req, res) => {
  res.sendFile(__dirname + '/public/html/details.html');
});

app.get('/test', (req, res) => {
  res.json(carsData);
});

app.get('/api/cars', (req, res) => {
  res.json(carsData);
});

app.get('/api/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const car = carsData.find(selectedCar => selectedCar.id === id);

  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ error: "Car Not Found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});