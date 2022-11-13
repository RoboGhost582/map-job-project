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
          <div className = 'p-2'>
            <div className="border-b-2 border-b-black w-full">
              <h1 className="font-bold text-lg">Title: {item?.title}</h1>
              <p> <span className="font-bold">Company:</span>  {item?.company?.display_name}</p>
              <p> <span className="font-bold">Label:</span>  {item?.category?.label}</p>
              {item.salary_is_predicted > 0 ?
              (<p> <span className="font-bold">Salary:</span> ${item?.salary_max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </p>) : null}
            </div>
            <p className="border-b-2 border-b-black w-full my-2">{item?.description}</p>
            <a className="underline text-blue-400" href={item?.redirect_url}> Job Link </a>
          </div>
        </Popup>
      )}
    </>
  );
}

export default Markers;
