import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'
import { LINE_COLORS } from '../../utils/constants';

import './FavoriteCard.css';
import TrainLabel from './TrainLabel';

const FavoriteCard = ({ info }) => {
    return (
        <Card>
            <CardBody className="station-card flex items-center p-0 justify-between">
                <div className="station-name-container pt-4 pb-4 pl-4">
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-400">{info.mbtaPlaceName}</p>
                </div>
                <div className="favorited-trains-container p-4">
                    {info.platforms.map((p, i) => {
                        return (
                            <div className="flex justify-end" key={i}>
                                <div
                                    className="train-dot mr-1"
                                    style={{color: LINE_COLORS[p.routeId]}}
                                >
                                    &#x2022;
                                </div>
                                <div className="train-label">
                                    <TrainLabel mbtaPlaceId={info.mbtaPlaceId} platform={p} />
                                </div>
                            </div>
                        )
                    }) }
                </div>
            </CardBody>
        </Card>
    )
}

export default FavoriteCard
