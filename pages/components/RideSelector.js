import React, { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import { carList } from '../data/carList'
import { useRouter } from 'next/router'

const RideSelector = (props) => {

    const [rideduration, setRideDuration ]= useState(0);
    const router = useRouter();

    // get the ride duration from MAPBOX API\
    // https://api.mapbox.com/directions/v5/mapbox/driving/-122.42,37.78;-77.03,38.91?access_token=pk.eyJ1IjoiaC1hZGkxMTkxIiwiYSI6ImNrdncwdWV6YTVwbTUydG51YjNybjR5OXUifQ.xtYSo-L7N7dPgwdJu4CZFw

    const getDirections = async (pickUpCoordinates, dropoffCoordinates) => {
        await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpCoordinates[0]},${pickUpCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?` + 
            new URLSearchParams({
                access_token: "pk.eyJ1IjoibmF6YXJpeTE5OTUiLCJhIjoiY2t2bGlmdW12MHZlcDJ1bzA5OHh3NDIxeCJ9.li8l-1u52aCFd2ZdW-1IaA",
            })
        )
        .then((response)=>{
            return response.json();
        }).then(data => {
            setRideDuration(data.routes[0].duration)
        })
        .catch(err => err.message)
    }

    useEffect(()=>{
        if(props.pickupCoordinates && props.dropoffCoordinates){
            getDirections(props.pickupCoordinates, props.dropoffCoordinates)
        } else {
            router.push('/search')
        }
    

    }, [props.pickupCoordinates, props.dropoffCoordinates])

   

    return (
        <Wrapper>
            <Title>Choose a ride, or swipe up for more</Title>
            <CarList>
            { carList.map((car, index)=>(

                <Car key={index}>
                    <CarImg src={car.imgUrl} />
                    <CarDetails>
                        <Service>{car.service}</Service>
                        <Time>5 min away</Time>
                    </CarDetails>
                    <Price>${(rideduration /100 * car.multiplier).toFixed(2)}</Price>

                </Car>
                ))
            }
            </CarList>
        </Wrapper>
    )
}

export default RideSelector


const Wrapper = tw.div` flex-1 overflow-y-scroll flex flex-col`
const Title = tw.div`text-gray-500 text-center text-xs py-2 border-b`
const CarList = tw.div` overflow-y-scroll`
const Car = tw.div` flex p-4 items-center`
const CarImg = tw.img`h-14 mr-4`
const CarDetails = tw.div`flex-1`
const Service = tw.div` font-medium`
const Time = tw.div` text-xs text-blue-500`
const Price = tw.div` text-sm`