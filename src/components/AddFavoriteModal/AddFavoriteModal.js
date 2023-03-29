import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, HelperText, Label, Textarea } from '@windmill/react-ui'
import Select from 'react-select';
import chroma from 'chroma-js';

const lineOptions = [
    { value: 'red', label: 'Red', color: '#da291c' },
    { value: 'blue', label: 'Blue', color: '#003da5' },
    { value: 'orange', label: 'Orange', color: '#d67d00' },
    { value: 'greenb', label: 'Green Line B', color: '#00843d' },
    { value: 'greenc', label: 'Green Line C', color: '#00843d' },
    { value: 'greend', label: 'Green Line D', color: '#00843d' },
    { value: 'greene', label: 'Green Line E', color: '#00843d' },
];

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
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
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
    return (
        <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
            
            <ModalHeader>Add Favorite</ModalHeader>

            <ModalBody>
                <div className="px-4 py-3 mb-8 bg-white rounded-lg dark:bg-gray-800">
                    <Label className="mt-4">
                        <div className="mb-1">Subway Line</div>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={null}
                            isLoading={false}
                            isClearable={false}
                            isSearchable={false}
                            name="color"
                            options={lineOptions}
                            styles={colourStyles}
                        />
                    </Label>

                    <Label className="mt-4">
                        <span>Disabled</span>
                        <Input disabled className="mt-1" placeholder="Jane Doe" />
                    </Label>

                    <div className="mt-4">
                        {/* TODO: Check if this label is accessible, or fallback */}
                        {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
                        <Label>Account Type</Label>
                        <div className="mt-2">
                            <Label radio>
                                <Input type="radio" value="personal" name="accountType" />
                                <span className="ml-2">Personal</span>
                            </Label>
                            <Label className="ml-6" radio>
                                <Input type="radio" value="business" name="accountType" />
                                <span className="ml-2">Business</span>
                            </Label>
                            <Label disabled className="ml-6" radio>
                                <Input disabled type="radio" value="disabled" name="accountType" />
                                <span className="ml-2">Disabled</span>
                            </Label>
                        </div>
                    </div>
                </div>
            </ModalBody>
            
            
            
            
            
            
            
            <ModalFooter>
                {/* I don't like this approach. Consider passing a prop to ModalFooter
                * that if present, would duplicate the buttons in a way similar to this.
                * Or, maybe find some way to pass something like size="large md:regular"
                * to Button
                */}
                <div className="hidden sm:block">
                    <Button layout="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </div>
                <div className="hidden sm:block">
                    <Button>Accept</Button>
                </div>
                <div className="block w-full sm:hidden">
                    <Button block size="large" layout="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </div>
                <div className="block w-full sm:hidden">
                    <Button block size="large">
                        Accept
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default AddFavoriteModal
