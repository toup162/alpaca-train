import React, { useState } from 'react'
import FavoriteCard from '../components/Cards/FavoriteCard'
import {
    Button
} from '@windmill/react-ui'
import AddFavoriteModal from '../components/AddFavoriteModal/AddFavoriteModal'

const Dashboard = () => {

    const [isAddFavorateModalOpen, setIsAddFavorateModalOpen] = useState(false);

    let favorites = JSON.parse(window.localStorage.getItem('ALPACA_TRAIN_FAVORITES')) || [];   
    
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
            {favorites &&
                <div className="grid gap-4 mb-8 md:grid-cols-2">
                    {favorites.map(fav => <FavoriteCard info={fav} />)}
                </div>
            }

            <AddFavoriteModal
                isOpen={isAddFavorateModalOpen}
                setOpen={setIsAddFavorateModalOpen}
            />

        </div>
    )
}

export default Dashboard;
