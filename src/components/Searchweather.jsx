import React, { useState, useEffect } from "react";

export default function Searchweather() {
  //use our hooks
  const [search, setSearch] = useState("canada");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  let componentMounted = true;

  useEffect(() => {
    const fetchWeatherStatus = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a2f16a6c7bb36cd5a896b9904e842716`
        );
        if (componentMounted) {
          setData(await response.json());
          console.log(data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchWeatherStatus();
  }, []);

  let emojisky = null;
  if (typeof data.main != undefined) {
    if (data.weather[0].main == "Clouds") {
      emojisky = "fa-cloud";
    } else if (data.weather[0].main == "Thunderstorm") {
      emojisky = "fa-bolt";
    } else if (data.weather[0].main == "Drizzle") {
      emojisky = "fa-cloud-rain";
    } else if (data.weather[0].main == "Rain") {
      emojisky = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main == "Snow") {
      emojisky = "fa-snow-flake";
    } else {
      emojisky = "fa-smog";
    }
  } else {
    return <div>...waiting</div>;
  }

  let temp = (data.main.temp - 275.15).toFixed(2);
  let temp_min = (data.main.temp_min - 275.15).toFixed(2);
  let temp_max = (data.main.temp_max - 275.15).toFixed(2);

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-center text-white border-0">
              <img
                src="https://source.unsplash.com/random/620x1080/?wallpaper,landscape"
                class="card-img"
                alt="..."
              />
              <div class="card-img-overlay">
                <form action="">
                  <div class="input-group mb-4 w-75 mx-auto ">
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Search City..."
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                    />
                    <button
                      type="submit"
                      class="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>

                <div className="bg-dark bg-opacity-50 py-3">
                  <h2 class="card-title">{data.name}</h2>
                  <p class="card-text lead">Tuesday, March 1 2022</p>
                  <hr />
                  <i className={`fas ${emojisky} fa-4x`}></i>
                  <h1 className="fw-bolder mb-4">{temp}&deg;C</h1>
                  <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                  <p className="lead">
                    {temp_min} &deg;C | {temp_max} &deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
