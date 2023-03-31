import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'

function InfoCard({ stationName, incomingTrains }) {
    return (
        <Card>
            <CardBody className="station-card flex items-center p-0">
                <div className="station-name-container p-4">
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{stationName}</p>
                </div>
            </CardBody>
        </Card>
    )
}

export default InfoCard
