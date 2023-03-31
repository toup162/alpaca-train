import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'
import { LINE_COLORS } from '../../utils/constants';

import './StationCard.css';

const StationCard = ({ stationName, favoritedTrains }) => {
    favoritedTrains = [
        {name: 'Forest Hills', eta: '4 min', line: 'orange'},
        {name: 'Oak Grove', eta: '7 min', line: 'orange'},     
        {name: 'Boston College', eta: '12 min', line: 'green'},       
    ];

    return (
        <Card>
            <CardBody className="station-card flex items-center p-0 justify-between">
                <div className="station-name-container pt-4 pb-4 pl-4">
                    <p className="text-md font-semibold text-gray-700 dark:text-gray-200">{stationName}</p>
                </div>
                <div className="favorited-trains-container p-4">
                    {favoritedTrains.map((train, i) => {
                        return (
                            <div className="flex justify-end" key={i}>
                                <div
                                    className="train-dot mr-1"
                                    style={{color: LINE_COLORS[train.line]}}
                                >
                                    &#x2022;
                                </div>
                                <div className="train-label">
                                    <span className="train-name">{train.name}</span>: <span className="train-eta">{train.eta}</span>
                                </div>
                            </div>
                        )
                    }) }
                </div>
            </CardBody>
        </Card>
    )
}

export default StationCard
