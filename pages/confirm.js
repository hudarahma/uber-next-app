import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import tw from "tailwind-styled-components"
import Map from "./components/Map";
import RideSelector from './components/RideSelector';
import Link from 'next/link'

const confirm = () => {
    const router = useRouter()
    const { pickup, dropoff } = router.query

    console.log('pickup',pickup)
    console.log('dropoff',dropoff)
    const [ pickupCoordinates, setPickupCoordinates ] = useState([0,0])
    const [ dropoffCoordinates, setDropoffCordinates ] = useState([0,0])

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
              <ButtonContainer>
                <Link href="/search">
                    <BackButton
                        src='https://img.icons8.com/ios-filled/50/000000/left.png'
                    />
                </Link>
            </ButtonContainer>
            <Map 
                pickupCoordinates={pickupCoordinates}
                dropoffCoordinates={dropoffCoordinates}
            />
            <RideContainer>
                <RideSelector 
                    pickupCoordinates={pickupCoordinates}
                    dropoffCoordinates={dropoffCoordinates}
                />
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
const ButtonContainer = tw.div`rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer`
const BackButton = tw.img`h-full object-contain`

export default confirm

