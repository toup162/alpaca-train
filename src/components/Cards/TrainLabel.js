import React from 'react'
import axios from 'axios';
import moment from "moment";
import { allStops } from '../../utils/constants';
import { useState } from 'react';
import { useEffect } from 'react';

const TrainLabel = ({ mbtaPlaceId, platform }) => {
    const [timeText, setTimeText] = useState('--');
    const [loading, setLoading] = useState(false);

    const formattedTime = (train) => {
        const arr = moment(train.arrivalTime);
        const dep = moment(train.departureTime);
        const now = moment();

        const secondsUntilArr = (arr - now) / 1000;
        const secondsUntilDep = (dep - now) / 1000;   

        let formatted = '--';

        if ((secondsUntilDep < 30 && secondsUntilDep > 0) || (secondsUntilArr < 0 && secondsUntilDep < 0)) {
            formatted = 'BRD'
        } else if (secondsUntilArr < 30) {
            formatted = 'ARR'
        } else if (secondsUntilArr <= 90) {
            formatted = '1 min'
        } else {
            formatted = arr.fromNow(true).replace("minutes", "min").replace('a minute', '1 min').replace("a few seconds", "ARR");
        }

        return formatted;
    }

    const marshalledPrediciton = `${platform.directionId}${platform.mbtaTrainType}${mbtaPlaceId}${platform.routeId}`;

    useEffect(() => {
        setLoading(true);

        if (!timeText || timeText === '--') {
            let lastRefreshes = JSON.parse(window.localStorage.getItem("ALPACA_TRAIN_DASHBOARD_LAST_REFRESHES"));
            if (!lastRefreshes) {
                lastRefreshes = {};
            }
            /* If we've never called for this prediction or it's been longer than 10 seconds since we called for it */
            if (!lastRefreshes[marshalledPrediciton] || ( (moment() - moment(lastRefreshes[marshalledPrediciton])) >= 10000 ) ) {
                lastRefreshes[marshalledPrediciton] = moment().format();
                window.localStorage.setItem("ALPACA_TRAIN_DASHBOARD_LAST_REFRESHES", JSON.stringify(lastRefreshes));
            } else {
                return
            }

            axios.get(`https://api-v3.mbta.com/predictions?include=stop&filter%5Bdirection_id%5D=${
                platform.directionId
            }&filter%5Broute_type%5D=${
                platform.mbtaTrainType
            }&filter%5Bstop%5D=${
                mbtaPlaceId
            }&filter%5Broute%5D=${
                platform.routeId
            }`)
                .then((response) => {
                    
                    let responseTrains = [];
                    // If there are predictions
                    if (response?.data?.data?.length > 0) {
                        
                        response.data.data.forEach(prediction => {
                            // Display only trains with a departure time (meaning it can be boarded by passengers).
                            if (prediction.attributes?.departure_time) {
                                responseTrains.push({
                                    arrivalTime: prediction.attributes?.arrival_time,
                                    departureTime: prediction.attributes?.departure_time,
                                    stopId: prediction.relationships?.stop?.data?.id,
                                    destination: allStops[prediction.relationships?.stop?.data?.id].attributes.platform_name
                                });
                            }
                        });

                        if (responseTrains && responseTrains.length > 0) {
                            setTimeText(formattedTime(responseTrains[0]));
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            

            <div className="train-label">
                <span className="train-name">{platform.routeName}</span>:&nbsp;
                <span className="train-eta">
                    {loading && <div>...</div>}
                    {!loading && timeText}
                </span>
            </div>
            
        </>
    )
        

}

export default TrainLabel;
