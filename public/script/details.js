document.addEventListener('DOMContentLoaded', () => {

  function getCarIdFromURL() {
    const param = new URLSearchParams(window.location.search);
    return param.get('id');
  }

  const carId = getCarIdFromURL();

  fetch(`/api/cars/${carId}`)
    .then(response => response.json())
    .then(car => {
      const carDetailsDiv = document.getElementById('car-details');
      carDetailsDiv.innerHTML = `
        <h3>${car.make}</h3>
        <img src="${car.image}" alt="${car.make} ${car.model}" width="200">
        <p>Model: ${car.model}</p>
        <p>Year: ${car.year}</p>
        <p>Price: ${car.price}</p>
        <p>Description: ${car.description}</p>
        <a href="/">Home</a>
    `;
    })
    .catch(error => {
      console.error(`Error Fetching Car Detail: ${error}`);
    });
  
});