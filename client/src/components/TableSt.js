import React from 'react';

const LEVELOFEDUCATION = require('../dataForSelect/levelOfEducation');
const FORMOFEDUCATION = require('../dataForSelect/formOfEducation');

export const TableSt = ({arr}) => {
    const sourceOfFinancingArr = [
        {value: 'budget', label: 'Бюджет'},
        {value: 'offBudget', label: 'Внебюджет'},
    ];

    const statusArr = [
        {value: 'inProcessing', label: 'В обработке'},
        {value: 'denied', label: 'Отказано'},
        {value: 'performed', label: 'Выполнено'}
    ];

    let levelOfEducationList = LEVELOFEDUCATION.length > 0
        && LEVELOFEDUCATION.map((item) => {
            for (let i = 0; i < arr.length; i++) {
                if (item.value === arr[i].levelOfEducation) {
                    return (
                        <>{item.label}</>
                    )
                }
            }
        }, this);

    let formOfEducationList = FORMOFEDUCATION.length > 0
        && FORMOFEDUCATION.map((item) => {
            for (let i = 0; i < arr.length; i++) {
                if (item.value === arr[i].formOfEducation) {
                    return (
                        <>{item.label}</>
                    )
                }
            }
        }, this);

    let sourceOfFinancinList = sourceOfFinancingArr.length > 0
        && sourceOfFinancingArr.map((item) => {
            for (let i = 0; i < arr.length; i++) {
                if (item.value === arr[i].sourceOfFinancing) {
                    return (
                        <>{item.label}</>
                    )
                }
            }
        }, this);

    let statusList = statusArr.length > 0
        && statusArr.map((item) => {
            for (let i = 0; i < arr.length; i++) {
                if (item.value === arr[i].status) {
                    return (
                        <>{item.label}</>
                    )
                }
            }
        }, this);

    let dos = arr.length > 0
        && arr.map((item) => {
                    return (
                        <>{arr[0].directionOrSpecialty}</>
                    )
        }, this);

    return (
        <tr>
            <td>{levelOfEducationList}</td>
            <td>{formOfEducationList}</td>
            <td>{sourceOfFinancinList}</td>
            <td>{dos}</td>
            <td>{statusList}</td>
        </tr>
    )
};