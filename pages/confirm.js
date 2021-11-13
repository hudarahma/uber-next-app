import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import tw from "tailwind-styled-components"
import Map from "./components/Map";
import RideSelector from './components/RideSelector';

const confirm = () => {
    const router = useRouter()
    const { pickup, dropoff } = router.query

    console.log('pickup',pickup)
    console.log('dropoff',dropoff)
    const [ pickupCoordinates, setPickupCoordinates ] = useState()
    const [ dropoffCoordinates, setDropoffCordinates ] = useState()

    const getPickupCoordinates = (pickup) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?`+
            new URLSearchParams({
                access_token: 'pk.eyJ1IjoiaC1hZGkxMTkxIiwiYSI6ImNrdncwdWV6YTVwbTUydG51YjNybjR5OXUifQ.xtYSo-L7N7dPgwdJu4CZFw',
                limit: 1
            })
        )
        .then(response => response.json())
        .then(data => setPickupCoordinates(data.features[0].center));
    }

    const getDropofCoordinates = (dropoff) => {

        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?`+
            new URLSearchParams({
                access_token: 'pk.eyJ1IjoiaC1hZGkxMTkxIiwiYSI6ImNrdncwdWV6YTVwbTUydG51YjNybjR5OXUifQ.xtYSo-L7N7dPgwdJu4CZFw',
                limit: 1
            })
        )
        .then(response => response.json())
        .then(data => setDropoffCordinates(data.features[0].center));
    }

    useEffect(() => {
        getPickupCoordinates(pickup);
        getDropofCoordinates(dropoff);
    },[pickup, dropoff])

    
    return (
        <Wrapper>
            <Map 
                pickupCoordinates={pickupCoordinates}
                dropoffCoordinates={dropoffCoordinates}
            />
            <RideContainer>
                <RideSelector />
                <ConfirmButtonContainer>
                    <ConfirmBtn>
                         Confirm UberX
                    </ConfirmBtn>
                </ConfirmButtonContainer>
            </RideContainer>
        </Wrapper>
    )
}

const Wrapper = tw.div`flex flex-col h-screen`
const RideContainer = tw.div` flex flex-1 flex-col h-1/2`
const ConfirmButtonContainer = tw.div`border-t-2`
const ConfirmBtn = tw.div` bg-black text-white my-4 mx-4 text-center text-xl`

export default confirm

