import { useEffect, useState } from "react";

const Home = () => {
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState({});

  const getCityData = async () => {
    try {
      const url = `https://api.weatherstack.com/current?access_key=3e231709ff7109679ffe9525a93ab2b9&query=${cityName}`;
      const options = {
        method: "GET",
      };
      const resp = await fetch(url);
      const jsondata = await resp.json();
      setData(jsondata?.location)
    } catch (e) {
      console.log("Error", e);
    }
  };

  const handleCityName = (e) => {
    setCityName(e.target.value);
  };

  return (
    <div>
      <h1> Search Weather </h1>
      <div>
        <input type="text" value={cityName} onChange={handleCityName} />
        <button onClick={getCityData}> Search</button>
      </div>
      <div>
        <div>Info</div>
        <div>{data.name}</div>
        <div>{data.region}</div>
        <div>{data.timezone_id}</div>
      </div>
    </div>
  );
};

export default Home;
