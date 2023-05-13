import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {

    const [services, setServices] = useState([])
 



    useEffect(() =>{
        fetch('https://car-doctor-server-gold.vercel.app/services')
        .then(res => res.json())
        .then(data => setServices(data))
    } , [])

    return (
        <div className='my-8'>
            <div>
                <h1 className='text-3xl text-orange-500 text-center'>Service</h1>
                <h1 className='text-5xl text-center'>Our Service Area</h1>
                <p className='text-center'>the hi majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
                
{
    services.map((service) => <ServiceCard key={service._id} service={service}></ServiceCard>)
}
            </div>

        </div>
    );
};

export default Services;