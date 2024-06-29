import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useCity } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
function Map() {
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCity();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getGeolocation,
  } = useGeolocation();
  const mapLat = searchParams.get("lat") || undefined;
  const mapLng = searchParams.get("lng") || undefined;

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {geolocationPosition ? null : (
        <Button type="position" onClick={getGeolocation}>
          {isLoadingPosition ? "Loading" : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  const map = useMapEvents({
    click: (e) => {
      navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
export default Map;
