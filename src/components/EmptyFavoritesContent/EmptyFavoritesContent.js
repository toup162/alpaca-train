import React from "react";
import './EmptyFavoritesContent.css';
import {
    Button
} from '@windmill/react-ui';

const EmptyFavoritesContent = ({ setIsAddFavorateModalOpen }) => {
    return (
        <div className="emptystate__container">
            <div className="illustration__container">
                <div className="illustration__elements">
                    <div className="illustration__element illustration__element--right illustration__element--1">
                        <div className="illustration__elementType red-bg">...</div>
                        <div className="illustration__elementWireframe"></div>
                    </div>
                    <div className="illustration__element illustration__element--left illustration__element--2">
                        <div className="illustration__elementType green-bg">...</div>
                        <div className="illustration__elementWireframe"></div>
                    </div>
                    <div className="illustration__element illustration__element--right illustration__element--3">
                        <div className="illustration__elementType orange-bg">...</div>
                        <div className="illustration__elementWireframe"></div>
                    </div>
                </div>
            </div>
            <div className="emptystate__body">
                <h2 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Start by adding a <strong>Favorite</strong>.</h2>
                <p className="text-gray-500" >
                    Your favorited platforms will display here in the Dashboard, where you'll be able to see incoming/outgoing trains at a glance.
                </p>
                <div className="mt-8">
                    <Button onClick={() => setIsAddFavorateModalOpen(true)}>
                        <i className="fa-solid fa-plus" /><span className="ml-2">Add Favorite</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EmptyFavoritesContent;
