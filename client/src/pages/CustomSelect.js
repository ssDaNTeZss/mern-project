import React from 'react';
import Select from 'react-select'

export default ({onChange, options, value, className}) => {

    const dafaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : ""
    };

    return(
        <Select
            value={dafaultValue(options, value)}
            onChange={value => onChange(value)}
            options={options}
            className={className}
        />
    )
}