import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../Styles.css";

export default function Nav() {
  const [isLoading, setIsLoading] = useState(false);
  const [locationNotFound, setlocationNotFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationExists, setLocationExists] = useState(false);
  const [locations, setLocations] = useState([]);

  const handleErrorTimeout = (setState) => {
    setSearchTerm("");
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 3000);
  };

  useEffect(() => {
    const storedLocations = localStorage.getItem("locations");
    if (storedLocations) {
      setLocations(JSON.parse(storedLocations));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(locations));
  }, [locations]);

  const getCoordinates = async (newLocation) => {
    try {
      if (!newLocation) {
        setIsLoading(false);
        setlocationNotFound(true);
        return;
      }

      const duplicate = locations.some(
        (location) =>
          location.name.toLowerCase().trim() ===
          newLocation.toLowerCase().trim()
      );

      if (duplicate) {
        handleErrorTimeout(setLocationExists);
        return;
      }

      setIsLoading(true);

      const response = await axios(
        `${process.env.REACT_APP_GEO_API_ENDPOINT}/direct?q=${newLocation}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
      );

      if (response.data && response.data.length > 0) {
        const { name, lat, lon, country } = response.data[0];

        const duplicateAfterApi = locations.some(
          (location) =>
            location.name.toLowerCase().trim() === name.toLowerCase().trim()
        );

        if (!duplicateAfterApi) {
          setLocations((prevState) => [
            ...prevState,
            { name, lat, lon, country },
          ]);
        } else {
          handleErrorTimeout(setLocationExists);
        }
      } else {
        handleErrorTimeout(setlocationNotFound);
      }
    } catch (err) {
      console.error("Error in getCoordinates:", err);
      setIsLoading(false);
      setlocationNotFound(true);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getCoordinates(searchTerm);
    setSearchTerm("");
  };

  const removeLocation = (location) => {
    const updatedLocations = locations.filter(
      (loc) => loc.name !== location.name
    );
    setLocations(updatedLocations);
  };
  return (
    <div className="nav-wrapper">
      <div className="nav-container">
        <ul className="nav-ul-container">
          <li>
            <FontAwesomeIcon icon={faLocationDot} />
            <Link to="/"> Current Location</Link>
          </li>
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={searchTerm}
            placeholder="Enter location..."
          />
        </form>
        <div>
          <nav className="nav-loc-container">
            {locationNotFound && (
              <div className="error">Location not found</div>
            )}
            {locationExists && (
              <div className="error">Location already exists</div>
            )}
            <ul className="loc-ul-container">
              {locations.map((location) => (
                <li key={location.name}>
                  <button
                    onClick={() => {
                      removeLocation(location);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <Link
                    to={{
                      pathname: `/location/${location.name}`,
                      state: { location },
                    }}
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
