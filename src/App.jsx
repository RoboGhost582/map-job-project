import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState} from "react";
import axios from "axios";
import Markers from "./components/Markers";
import NavBar from "./components/NavBar";

function App() {
  const [mapData, setMapData] = useState([]);
  const [viewPort, setViewPort] = useState({
    latitude: 38.483964,
    longitude: -94.681538,
    zoom: 4,
  });
  const [keyword, setKeyword] = useState("Junior Developer");
  const [location, setLocation] = useState("USA");
  const perPage = 1000;

  const handleSubmit = async () =>{
    const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=2ab7411c&app_key=5eb49153dbc20fd4904557e94acbf1a3&results_per_page=${perPage}&what=${keyword}&where=${location}`;
    const res = await axios(url);
    setMapData(res.data.results);
  }

  return (
    <div className="flex">
      <Map
        {...viewPort}
        onMove={evt => setViewPort(evt.viewPort)}
        mapboxAccessToken="pk.eyJ1Ijoicm9ib2dob3N0NTgyIiwiYSI6ImNsYWNvcnl6MjA2Z240MXF2NXl1OXR1d3gifQ.pcL3VAIzYvsPXqUIXFm8wA"
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        
      >
        {mapData.map((item) => {
          return <Markers key={item?.id} item={item} />;
        })}
      </Map>
      <NavBar setKeyword = {setKeyword} setLocation = {setLocation} viewPort = {viewPort} setViewPort = {setViewPort} handleSubmit = {handleSubmit} mapData = {mapData}/>
    </div>
  );
}

export default App;
