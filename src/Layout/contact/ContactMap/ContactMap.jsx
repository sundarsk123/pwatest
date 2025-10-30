"use client";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import location from "@/Assets/Contactus/LandMark.svg"
import gsap from "gsap";
// import { cityData } from "./citydata";
import MapDetailCard from "./Details";
import MapButton from "./MapButton";




mapboxgl.accessToken =
    "pk.eyJ1IjoiZGV6dm9sdGEiLCJhIjoiY201a2RtMDZkMWVtcDJpc2Q2bzZpOTV3NyJ9.WFlygZZNCxKA4Rp7FqOXzg";

const ContactMap = ({ maps_data }) => {

    const cityData = maps_data.reduce((acc, city) => {
        const [lng, lat] = city.map_coordinates.split(",").map(Number); // convert string to number
        acc[city.city_name.toLowerCase()] = {
            city: city.city_name,
            address: city.address,
            image: city.place_image?.url || "",
            coordinates: [lat, lng],
            rating: parseFloat(city.rating),
            totalStars: parseInt(city.total_stars, 10),
            view: parseInt(city.view, 10),
            directions: city.get_direction
        };
        return acc;
    }, {});
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState(cityData.chennai);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const cardRef = useRef(null);




    useEffect(() => {
        if (!mapboxgl.supported()) {
            alert("Your browser does not support Mapbox GL");
            return;
        }

        if (!mapRef.current && mapContainerRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/light-v10", // Using light theme as a base
                zoom: 14.2,
                center: [80.2337, 13.0418], // Taj Coromandel, Nungambakkam
                pitch: 0,
                bearing: 0,
                dragRotate: false,
            });

            mapRef.current.scrollZoom.disable();
            mapRef.current.dragRotate.disable();
            mapRef.current.touchZoomRotate.disableRotation();
            mapRef.current.doubleClickZoom.disable();

            mapRef.current.on("style.load", () => {
                const style = mapRef.current?.getStyle();
                if (!style) return;

                mapRef.current?.setPaintProperty("land", "background-color", "#F9F8F8");
                mapRef.current?.setPaintProperty("water", "fill-color", "#D9F7E5");

                // Modify label text color
                [
                    "road-label",
                    "place-label",
                    "water-label",
                    "poi-label",
                    "airport-label",
                ].forEach((layer) => {
                    if (style.layers.some((l) => l.id === layer)) {
                        mapRef.current?.setPaintProperty(layer, "text-color", "#000000");
                    }
                });

                // Apply custom road color (#E6ECF0)
                const roadLayers = style.layers.filter(layer => layer.id.includes("road"));
                roadLayers.forEach(layer => {
                    if (layer.type === "line") {
                        mapRef.current.setPaintProperty(layer.id, "line-color", "#E6ECF0");
                    }
                    if (layer.type === "fill") {
                        mapRef.current.setPaintProperty(layer.id, "fill-color", "#E6ECF0");
                    }
                });

                // Hide unwanted icon & label layers
                [
                    "poi-label",
                    "transit-label",
                    "airport-label",
                    "country-label",
                    "state-label",
                    "waterway-label",
                ].forEach((layer) => {
                    if (style.layers.some((l) => l.id === layer)) {
                        mapRef.current?.setLayoutProperty(layer, "visibility", "none");
                    }
                });
            });

            if (!markerRef.current) {
                const el = document.createElement("div");
                el.style.backgroundImage = `url(${location.src})`;
                el.style.width = "80px";
                el.style.height = "80px";
                el.style.backgroundSize = "contain";
                el.style.backgroundRepeat = "no-repeat";
                el.style.backgroundPosition = "center";
                el.style.cursor = "pointer";

                markerRef.current = new mapboxgl.Marker({ element: el })
                    .setLngLat(selectedLocation.coordinates)
                    .addTo(mapRef.current);
            }

        }
        // Initial animation when the map loads
        if (cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 50 }, // Start from below
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
            );
        }
    }, [selectedLocation.coordinates]);


    // Function to update map and marker when city is clicked
    const handleCityChange = (city) => {
        const newLocation = cityData[city];
        setSelectedLocation(newLocation);

        if (mapRef.current) {
            mapRef.current.flyTo({
                center: newLocation.coordinates,
                zoom: 14.2,
                essential: true,
                speed: 3.5,   // default is 1.2 → higher is faster
                curve: 1.2,   // how "curvy" the zoom animation feels
                duration: 1500 // fallback in ms (lower = faster), try 800 for snappy effect
            });
        }

        if (markerRef.current) {
            markerRef.current.setLngLat(newLocation.coordinates);
        }
    };

    const handleZoomIn = () => {
        if (mapRef.current) {
            const currentZoom = mapRef.current.getZoom();
            mapRef.current.easeTo({
                zoom: currentZoom + 1,
                duration: 800, // Smooth transition duration in milliseconds
            });
        }
    };

    const handleZoomOut = () => {
        if (mapRef.current) {
            const currentZoom = mapRef.current.getZoom();
            mapRef.current.easeTo({
                zoom: currentZoom - 1,
                duration: 800, // Smooth transition duration in milliseconds
            });
        }
    };



    return (
        <div>
            <div className="relative w-full h-[25rem] md:h-[43.75rem]">

                {/* Map Button */}
                <div className="absolute bottom-[0.3125rem] md:top-[1.875rem] right-[0.3125rem] z-10 lg:px-[1.875rem] block">
                    <MapButton onSelectCity={handleCityChange} maps_data={maps_data} />
                </div>

                {/* Map Container */}
                <div ref={mapContainerRef} className="w-full h-full" />

                <div className="absolute bottom-[0.3125rem] left-[0.3125rem] z-10 lg:px-[1.875rem] hidden space-y-4">
                    <div>
                        <button
                            onClick={handleZoomIn}
                            className="w-[0.875rem] h-[0.875rem] flex items-center justify-center rounded-full bg-[#FCF9F1] text-2xl cursor-pointer"
                        >
                            +
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={handleZoomOut}
                            className="w-[0.875rem] h-[0.875rem] flex items-center justify-center rounded-full bg-[#FCF9F1] text-2xl cursor-pointer"
                        >
                            –
                        </button>
                    </div>
                </div>

                <div
                    className='absolute right-[0.5625rem] lg:left-[2rem] top-[1.875rem] hidden md:block main-haver cursor-pointer max-w-[22rem]'
                    ref={cardRef}
                    onClick={() => setPopupOpen(true)}
                >
                    <MapDetailCard {...selectedLocation} />
                </div>
            </div>

            <div className="px-[1.25rem] py-[1.25rem] bg-[#9C458B] md:hidden" onClick={() => setPopupOpen(true)}>
                <MapDetailCard {...selectedLocation} />
            </div>
        </div>

    );
};

export default ContactMap;