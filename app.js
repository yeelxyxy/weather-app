import './index.css';




/*SEARCH CITY*/
const form = document.querySelector(".card form");
const input = document.querySelector(".card input");
const msg = document.querySelector(".card .msg");
const list = document.querySelector(".city-section .cities");
const apiKey = "b37b57f803528865ff5ec1b80a3de154";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  //API CALLER
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `http://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "City does not exist";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});

