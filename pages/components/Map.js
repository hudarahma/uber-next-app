import { useEffect } from "react";
import tw from "tailwind-styled-components"
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaC1hZGkxMTkxIiwiYSI6ImNrdncwdWV6YTVwbTUydG51YjNybjR5OXUifQ.xtYSo-L7N7dPgwdJu4CZFw';

// const map = new mapboxgl.Map({
//   container: 'YOUR_CONTAINER_ELEMENT_ID',
//   style: 'mapbox://styles/mapbox/streets-v11',
//   center: ,
//   zoom: ,
// })
const Map = (props) => {
    useEffect(() => {

        const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
        center: [-99.29011, 39.39172],
        zoom: 7
      })

      if (props.pickupCoordinates) {
        addToMap(map, props.pickupCoordinates)
      }

      if (props.dropoffCoordinates) {
        addToMap(map, props.dropoffCoordinates)
      }

      if (props.pickupCoordinates && props.dropoffCoordinates) {
        map.fitBounds([
          props.dropoffCoordinates,
          props.pickupCoordinates
        ],{
          padding: 60
        })
      }

    },[props.pickupCoordinates, props.dropoffCoordinates]);

    
    const addToMap = (map, coordinates) => {
      const marker1 = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);
    }

    return <Wrapper id='map'></Wrapper>
}

const Wrapper = tw.div`
    flex-1 h-1/2
`;
export default Map
