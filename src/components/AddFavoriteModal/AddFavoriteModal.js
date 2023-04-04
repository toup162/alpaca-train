import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from '@windmill/react-ui'
import Select from 'react-select';
import chroma from 'chroma-js';
import { SwitchSelect } from '../SwitchSelect/SwitchSelector';
import { TRAINS, LINES, STATIONS, stationIdNameMap } from '../../utils/constants';
import './AddFavoriteModal.css';

const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
  
    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
});

const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', maxHeight: '30px', }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                    ? data.color
                    : isFocused
                        ? color.alpha(0.1).css()
                        : undefined,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? chroma.contrast(color, 'white') > 2
                        ? 'white'
                        : 'black'
                    : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
            fontWeight: 'bold',
    
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? data.color
                        : color.alpha(0.3).css()
                    : undefined,
            },
            ':before': {
                backgroundColor: color,
                borderRadius: 10,
                content: `"\\2022"`,
                position: 'relative',
                bottom: '-4px',
                fontSize: '2rem',
                lineHeight: 0,
                display: 'inline',
                marginRight: 8,
                height: 10,
                width: 10,
              },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const AddFavoriteModal = ({ isOpen, setOpen }) => {
    const [selectedLine, setSelectedLine] = useState(null);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [selectedStation, setSelectedStation] = useState(null);

    const onClose = () => {
        setSelectedLine(null);
        setSelectedTrain(null);
        setSelectedStation(null);
        setOpen(false);
    }

    const onAccept = () => {

        let favorites = JSON.parse(window.localStorage.getItem('ALPACA_TRAIN_FAVORITES')) || [];
        const stationAlreadyFavorited = favorites.find(fav => fav.mbtaPlaceId === selectedStation.mbtaPlaceId);
        
        const newFavorite = {
            directionId: selectedTrain.directionId,
            mbtaTrainType: selectedTrain.mbtaTrainType,
            routeId: selectedTrain.routeId,
            routeName: selectedTrain.label
        };

        if (stationAlreadyFavorited) {
            stationAlreadyFavorited.platforms.push(newFavorite)
        } else {
            favorites.push({
                mbtaPlaceId: selectedStation.mbtaPlaceId,
                mbtaPlaceName: stationIdNameMap[selectedStation.mbtaPlaceId],
                platforms: [newFavorite]
            });
        }

        window.localStorage.setItem('ALPACA_TRAIN_FAVORITES', JSON.stringify(favorites));
        
        onClose();
    };
    

    const onSelectLine = option => {
        setSelectedLine(option);
        setSelectedTrain(TRAINS[option.value][0]);
        setSelectedStation(null);
    }

    const onSelectTrain = selectedOption => {        
        setSelectedTrain(TRAINS[selectedLine.value].find(o => o.value === selectedOption));
        setSelectedStation(null);
    };

    const onSelectStation = option => {
        setSelectedStation(option);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            
            <ModalHeader>Add Favorite</ModalHeader>

            <ModalBody>
                <div className="add-favorite-modal-body-content px-4 py-3 mb-8 bg-white rounded-lg dark:bg-gray-800">
                    <Label className="mt-4">
                        <div className="mb-1">Subway Line</div>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={null}
                            isLoading={false}
                            isClearable={false}
                            isSearchable={false}
                            name="line"
                            options={LINES}
                            styles={colourStyles}
                            onChange={(o) => onSelectLine(o)} 
                            value={selectedLine}
                        />
                    </Label>

                    {selectedLine && 
                        <Label className="mt-4">
                            <div className="mb-1">Train</div>
                            <SwitchSelect
                                onChange={onSelectTrain}
                                options={TRAINS[selectedLine.value]}
                                controlledValue={selectedTrain}
                            />
                        </Label>
                    }

                    {selectedTrain && 
                        <Label className="mt-4 mb-8">
                            <div className="mb-1">Station</div>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Search/Select..."
                                defaultValue={null}
                                isLoading={false}
                                isSearchable={true}
                                name="station"
                                options={selectedTrain.reverseOptions
                                    ? STATIONS[selectedLine?.value].slice().reverse()
                                    : STATIONS[selectedLine?.value]
                                }
                                onChange={(o) => onSelectStation(o)} 
                                value={selectedStation}
                            />
                        </Label>
                    }

                </div>
            </ModalBody>
            <div className="mb-8 sm:mb-12">
                <ModalFooter>
                    {/* I don't like this approach. Consider passing a prop to ModalFooter
                    * that if present, would duplicate the buttons in a way similar to this.
                    * Or, maybe find some way to pass something like size="large md:regular"
                    * to Button
                    */}
                    <div className="hidden sm:block">
                        <Button layout="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                    <div className="hidden sm:block">
                        <Button onClick={onAccept}>Accept</Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button block size="large" layout="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button block size="large" onClick={onAccept}>
                            Accept
                        </Button>
                    </div>
                </ModalFooter>
            </div>
        </Modal>
    )
}

export default AddFavoriteModal
