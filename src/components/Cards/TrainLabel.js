import React from 'react'
import moment from "moment";
import { allStops } from '../../utils/constants';
import { useState } from 'react';
import { useEffect } from 'react';
import { axiosInstance } from "../../utils/cached-axios";

const TrainLabel = ({ mbtaPlaceId, platform, forcedManualRefresh }) => {
   
    const marshalledPrediciton = `${platform.directionId}${platform.mbtaTrainType}${mbtaPlaceId}${platform.routeId}`;
    let lastRefresh = JSON.parse(window.sessionStorage.getItem(marshalledPrediciton));
    
    const [timeText, setTimeText] = useState(lastRefresh ? lastRefresh.timeText : '--');
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

    

    useEffect(() => {        
        /* If we've already called for this prediction in the last 15 seconds, don't try again */
        if (lastRefresh && ( (moment() - moment(lastRefresh.timeStamp)) < (15 * 1000) ) ) {
            return;
        }

        const getPrediction = async () => {
            setLoading(true);
            const response = await axiosInstance.get(`https://api-v3.mbta.com/predictions?include=stop&filter%5Bdirection_id%5D=${
                platform.directionId
            }&filter%5Broute_type%5D=${
                platform.mbtaTrainType
            }&filter%5Bstop%5D=${
                mbtaPlaceId
            }&filter%5Broute%5D=${
                platform.routeId
            }`);
        
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
                    window.sessionStorage.setItem(marshalledPrediciton, JSON.stringify({
                        timeText: formattedTime(responseTrains[0]),
                        timeStamp: moment().format()
                    }));
                }
            }

            setLoading(false);
        };

        getPrediction();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forcedManualRefresh])


    return (
        <>
            <div className="train-label">
                <span className="train-name">{platform.routeName}</span>:&nbsp;
                <span className="train-eta">
                    {loading && <span>...</span>}
                    {!loading && timeText}
                </span>
            </div>
        </>
    )
}

export default TrainLabel;
