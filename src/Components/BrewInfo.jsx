import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BrewInfo = () => {
    let { id } = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    const [brewLogo, setBrewLogo] = useState(null);

    useEffect(() => {
        fetchBrewery().catch(console.error);
    }, []);
    useEffect(() => {
        getBreweryLogo().catch(console.error);
    }, [fullDetails]);

    const fetchBrewery = async () => {
        const response = await fetch(
            `https://api.openbrewerydb.org/v1/breweries/${id}`
        );
        const json = await response.json();
        setFullDetails(json);
    };

    const getBreweryLogo = async () => {
        const web_url = fullDetails.website_url
        if (web_url != null) {
            const response = await fetch(
                `https://logo.clearbit.com/:${fullDetails.website_url}`
            )
            const json = await response.json();
            setBrewLogo(json);
        }
    }

    return (
        fullDetails ?
            <div>
                {brewLogo ? <div>
                    <a href={fullDetails.website_url}>
                        Website: {fullDetails.website_url}
                    </a>
                    <p>{brewLogo}</p>
                </div> : <p>No Logo</p>}
                <p>Name: {fullDetails.name}</p>
                <p>Brewery Type: {fullDetails.brewery_type}</p>
                <p>Address: {fullDetails.address_1}</p>
                {/* <p>{fullDetails.</p> */}
            </div>
            : null
    )
}

export default BrewInfo;