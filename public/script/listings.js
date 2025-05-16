document.addEventListener("DOMContentLoaded", () => {
  fetch('/api/cars')
    .then(res => res.json())
    .then(cars => {
      const carListingsDiv = document.getElementById('car-listings');
      if (carListingsDiv) {
        cars.forEach(car => {
          const carDiv = document.createElement('div');
          carDiv.classList.add('car-listing-item');
          carDiv.innerHTML = `
            <h3>${car.make} ${car.model} (${car.year})</h3>
            <p>Price: $${car.price}</p>
            <img src="${car.image}" alt="${car.make} ${car.model}" width="200">
            <p>${car.description}</p>
            <a href="/details.html?id=${car.id}">View Details</a>
          `;
          carListingsDiv.appendChild(carDiv);
        });
      }
    })
    .catch(error => {
      console.error('Error fetching cars: ' + error);
    });
});