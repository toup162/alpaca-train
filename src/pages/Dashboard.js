import React, { useState } from 'react'
import FavoriteCard from '../components/Cards/FavoriteCard'
import {
    Button
} from '@windmill/react-ui'
import AddFavoriteModal from '../components/AddFavoriteModal/AddFavoriteModal'
import moment from 'moment';
import EmptyFavoritesContent from '../components/EmptyFavoritesContent/EmptyFavoritesContent';

const Dashboard = () => {

    const [isAddFavorateModalOpen, setIsAddFavorateModalOpen] = useState(false);
    const [forcedManualRefresh, triggerForcedManualRefresh] = useState(true);

    const onRefresh = () => {triggerForcedManualRefresh(moment())};
    let favorites = JSON.parse(window.localStorage.getItem('ALPACA_TRAIN_FAVORITES')) || [];   
    
    return (
        <div className="mb-12 mt-6">
            {favorites && favorites.length > 0 &&
                <>
                    <div className="flex justify-between mb-8">
                        <div className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-300 flex items-center">
                            Favorite Platforms
                        </div>
                        <div className="flex">
                            <div className="mr-2">
                                <Button className="h-full" layout="outline" onClick={onRefresh}>
                                    <i className="fa-solid fa-refresh" /><span className="ml-2 hidden sm:inline">Refresh</span>
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => setIsAddFavorateModalOpen(true)}>
                                    <i className="fa-solid fa-plus" /><span className="ml-2 hidden sm:inline">Add Favorite</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 mb-8 md:grid-cols-2">
                        {favorites.map((fav, i) => <FavoriteCard info={fav} key={i} forcedManualRefresh={forcedManualRefresh} />)}
                    </div>
                </>
            }

            <AddFavoriteModal
                isOpen={isAddFavorateModalOpen}
                setOpen={setIsAddFavorateModalOpen}
            />

            {(!favorites || favorites.length === 0) &&
                <div className="pt-12">
                    <EmptyFavoritesContent setIsAddFavorateModalOpen={setIsAddFavorateModalOpen} />
                </div>
            }

        </div>
    )
}

export default Dashboard;
