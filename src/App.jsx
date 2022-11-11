import Map, { Marker, Popup } from 'react-map-gl';
import { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaMapMarkerAlt } from 'react-icons/fa'
import Data from './DummyData.js'


function App() {
  //const [toggle, setToggle] = useState(false)
  const [current, setCurrent] = useState(0)

  console.log(current)

  return (

    <div>
      <Map
        mapboxAccessToken="pk.eyJ1Ijoicm9ib2dob3N0NTgyIiwiYSI6ImNsYWNvcnl6MjA2Z240MXF2NXl1OXR1d3gifQ.pcL3VAIzYvsPXqUIXFm8wA"
        style={{ width: "90vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
      //initialViewState={viewport}
      >
        {Data.map((item) => {
          return (
            <div>
              < Marker key={item.id} longitude={item.long} latitude={item.lad} anchor="bottom" >
                <FaMapMarkerAlt className='w-[25px] h-[25px]' onClick={() => setCurrent(item)} />
              </Marker>
              {item.id === current.id &&
                <Popup
                  key={item.id}
                  longitude={item.long}
                  latitude={item.lad}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrent(0)}
                  anchor="bottom"
                >
                  You are here
                </Popup>
              }
            </div>

          )
        })}
      </Map>

    </div >
  );
}

export default App;
