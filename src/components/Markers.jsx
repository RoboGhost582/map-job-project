import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

function Markers({ item }) {
  const [current, setCurrent] = useState("");
  return (
    <>
      {item.longitude || item.latitude ? (
        <Marker
          key={item.id}
          longitude={item.longitude}
          latitude={item.latitude}
          anchor="center"
        >
          <FaMapMarkerAlt
            className="w-[25px] h-[25px]"
            onClick={() => setCurrent(item)}
          />
        </Marker>
      ) : (
        ""
      )}

      {item?.id === current?.id && (
        <Popup
          key={item?.id}
          longitude={item?.longitude}
          latitude={item?.latitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setCurrent("")}
          anchor="bottom"
        >
          <div className = 'm-2'>
            <h1 className="font-bold text-lg border-b-2 border-b-black">{item?.title}:</h1>
            <p>{item?.description}</p>
          </div>
        </Popup>
      )}
    </>
  );
}

export default Markers;
