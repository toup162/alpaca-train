import React, { useState } from 'react'
import StationCard from '../components/Cards/StationCard'
import {
    Button
} from '@windmill/react-ui'
import AddFavoriteModal from '../components/AddFavoriteModal/AddFavoriteModal'
/*import { stops, lightStops, STATIONS } from '../utils/constants';*/

const Dashboard = () => {

    const [isAddFavorateModalOpen, setIsAddFavorateModalOpen] = useState(false);


    
    /*
    STATIONS.orange.forEach(s => {
        let found = stops.find(z => {
            return z?.attributes?.name === s.label;
        })
        let placeName = found?.relationships?.parent_station?.data?.id;

        if (placeName) {
            console.log("------\n");
            s.mbtaPlaceId = placeName;
            s.mbtaId = found.id;
            s.latitude = found.attributes.latitude;
            s.longitude = found.attributes.longitude;

            //console.log(x.relationships.parent_station.data.id);
            console.log("--------\n");
        } else {
            console.log("------\nCouldn't find");
            console.log(s);
            console.log("--------\n");
        }
    })

    console.log(STATIONS.orange);

    */


    return (
        <div className="mb-12 mt-6">
            <div className="flex justify-between mb-8">
                <div className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-300 flex items-center">
                    Favorite Stations
                </div>
                <div>
                    <Button onClick={() => setIsAddFavorateModalOpen(true)}>
                        <i className="fa-solid fa-plus mr-2" /><span>Add Favorite</span>
                    </Button>
                </div>
            </div>
            
            
            {/* <!-- Cards --> */}
            <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <StationCard stationName="Haymarket" value="6389">
                </StationCard>

                <StationCard stationName="Downtown Crossing" value="$ 46,760.89">
                </StationCard>

                <StationCard stationName="Back Bay" value="376">
                </StationCard>

                <StationCard stationName="Porter" value="35">
                </StationCard>
            </div>

            <AddFavoriteModal
                isOpen={isAddFavorateModalOpen}
                setOpen={setIsAddFavorateModalOpen}
            />

        </div>
    )
}

export default Dashboard;
