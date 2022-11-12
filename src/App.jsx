import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect } from "react";
//import Data from "./DummyData.js";
import axios from "axios";
import Markers from "./components/Markers";
function App() {
  const [mapData, setMapData] = useState([]);
  const viewport = {
    latitude: 38.483964,
    longitude: -94.681538,
    zoom: 4,
  };
  const search = "Junior React Developer"
  const perPage = 50
  const url = "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=2ab7411c&app_key=5eb49153dbc20fd4904557e94acbf1a3&title_only=React"
  //`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=2ab7411c&app_key=5eb49153dbc20fd4904557e94acbf1a3&results_per_page=50&title_only=ReactDeveloper%20&where=Connecticut`
  //`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=2ab7411c&app_key=5eb49153dbc20fd4904557e94acbf1a3&results_per_page=${perPage}&title_only=${search}`;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(url);
      setMapData(res.data.results);
    };
    fetchData();
  }, [url]);

  console.log(mapData)

  return (
    <div>
      <div className="bg-black text-white">Hello World</div>
      <Map
        mapboxAccessToken="pk.eyJ1Ijoicm9ib2dob3N0NTgyIiwiYSI6ImNsYWNvcnl6MjA2Z240MXF2NXl1OXR1d3gifQ.pcL3VAIzYvsPXqUIXFm8wA"
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        initialViewState={viewport}
      >
        {mapData.map((item) => {
          return <Markers key={item?.id} item={item} />;
        })}
      </Map>
    </div>
  );
}

export default App;
