import React from 'react';
import SwitchSelector from "react-switch-selector";

export const SwitchSelect = ({
    controlledValue,
    onChange,
    options,
    initialSelectedIndex
}) => {
    return (
        <div style={{height: 30}}>
            <SwitchSelector
                onChange={onChange}
                options={options}
                initialSelectedIndex={initialSelectedIndex ? initialSelectedIndex : 0}
                forcedSelectedIndex={options.findIndex(o => o.value === controlledValue.value)}
                backgroundColor={"#353b48"}
                fontColor={"#f5f6fa"}
            />
        </div>
    );
}