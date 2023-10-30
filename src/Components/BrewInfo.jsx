import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BrewInfo.css"
import "../App.css"

const BrewInfo = () => {
    let { id } = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    const [brewLogo, setBrewLogo] = useState(null);

    useEffect(() => {
        fetchBrewery().catch(console.error);
    }, []);
    // useEffect(() => {
    //     getBreweryLogo().catch(console.error);
    // }, [fullDetails]);

    const fetchBrewery = async () => {
        const response = await fetch(
            `https://api.openbrewerydb.org/v1/breweries/${id}`
        );
        const json = await response.json();
        setFullDetails(json);
    };

    // const getBreweryLogo = async () => {
    //     const web_url = fullDetails.website_url
    //     console.log(fullDetails)
    //     if (web_url != null) {
    //         const response = await fetch(
    //             `https://logo.clearbit.com/:${fullDetails.website_url}`
    //         )
    //         const json = await response.json();
    //         setBrewLogo(json);
    //     }
    // }

    return (
        fullDetails ?
            <div className="whole-page">
                {fullDetails.website_url ? <div className="Logo">
                    <img src={`https://logo.clearbit.com/:${fullDetails.website_url}`} alt="Beachside Brew Pub Logo"/>
                    <a className="url" href={fullDetails.website_url}>
                        {fullDetails.website_url}
                    </a>
                </div> : null}
                <table className="details">
                    <tbody>
                        <tr>
                            <td width="25%"><p className="table-header-blocks">Name: </p></td>
                            <td width="25%"><p className="table-header-blocks">Type </p></td>
                            <td width="25%"><p className="table-header-blocks">Address: </p></td>
                            <td width="25%"><p className="table-header-blocks">Phone: </p></td>
                        </tr>
                        <tr>
                            <td width="25%"><p className="table-data-blocks">{fullDetails.name}</p></td>
                            <td width="25%"><p className="table-data-blocks">{fullDetails.brewery_type}</p></td>
                            <td width="25%"><p className="table-data-blocks">{fullDetails.address_1}, {fullDetails.city}</p></td>
                            <td width="25%"><p className="table-data-blocks">{fullDetails.phone}</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            : <div>"Not a valid brewery"</div>
    )
}

export default BrewInfo;