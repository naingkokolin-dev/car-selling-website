document.addEventListener("DOMContentLoaded", function () {
  fetch('/api/cars')
    .then(response => response.json())
    .then(cars => {
      const carListDiv = document.getElementById('car-list');
      if (carListDiv) {
        cars.forEach(car => {
          const carDiv = document.createElement('div');
          carDiv.classList.add('car-item');
          carDiv.innerHTML = `
            <h3>${car.make} ${car.model} (${car.year})</h3>
            <p>Price: $${car.price}</p>
            <img src="${car.image}" alt="${car.make} ${car.model}" width="200">
            <p>${car.description}</p> 
            `;
          carListDiv.appendChild(carDiv);
        });
      }
    })
    .catch(error => {
      console.error('Error fetching cars: ', error);
    });
});