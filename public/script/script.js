document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const brandFilter = document.getElementById('brand-filter');
  const priceFilter = document.getElementById('price-filter');
  const carListDiv = document.getElementById('car-list');

  let allCars = [];

  fetch('/api/cars')
    .then(response => response.json())
    .then(cars => {
      allCars = cars;
      populateBrandFilter(cars);
      displayCars(cars);
    })
    .catch(error => {
      console.error('Error fetching cars:', error);
    });

  function displayCars(cars) {
    carListDiv.innerHTML = ''; // Clear existing cars
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

  function populateBrandFilter(cars) {
    const brands = [...new Set(cars.map(car => car.make))];
    brands.forEach(brand => {
      const option = document.createElement('option');
      option.value = brand;
      option.textContent = brand;
      brandFilter.appendChild(option);
    });
  }

  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedBrand = brandFilter.value;
    const selectedPrice = priceFilter.value;

    const filteredCars = allCars.filter(car => {
      const matchesSearch =
        car.make.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm);

      const matchesBrand = selectedBrand ? car.make === selectedBrand : true;

      const matchesPrice = selectedPrice
        ? (() => {
          const [min, max] = selectedPrice.split('-').map(Number);
          return car.price >= min && car.price <= max;
        })()
        : true;

      return matchesSearch && matchesBrand && matchesPrice;
    });

    displayCars(filteredCars);
  }

  searchInput.addEventListener('input', applyFilters);
  brandFilter.addEventListener('change', applyFilters);
  priceFilter.addEventListener('change', applyFilters);
});
