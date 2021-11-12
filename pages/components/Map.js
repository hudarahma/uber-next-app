import { useEffect } from "react";
import tw from "tailwind-styled-components"
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaC1hZGkxMTkxIiwiYSI6ImNrdncwdWV6YTVwbTUydG51YjNybjR5OXUifQ.xtYSo-L7N7dPgwdJu4CZFw';

const Map = () => {
    // const map = new mapboxgl.Map({
  //   container: 'YOUR_CONTAINER_ELEMENT_ID',
  //   style: 'mapbox://styles/mapbox/streets-v11',
  //   center: ,
  //   zoom: ,
  // })
    useEffect(() => {

        const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
        center: [-99.29011, 39.39172],
        zoom: 3
      });
    },[])

    return <Wrapper id='map'></Wrapper>
}

const Wrapper = tw.div`
    flex-1
`;
export default Map
