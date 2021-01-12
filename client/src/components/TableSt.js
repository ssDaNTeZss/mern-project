import React from 'react';

const LEVELOFEDUCATION = require('../dataForSelect/levelOfEducation');
const FORMOFEDUCATION = require('../dataForSelect/formOfEducation');

export const TableSt = ({ arr }) => {
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
            if (item.value === arr.levelOfEducation) {
                return (
                   <>{item.label}</>
                )
            }
        }, this);

    let formOfEducationList = FORMOFEDUCATION.length > 0
        && FORMOFEDUCATION.map((item) => {
            if (item.value === arr.formOfEducation) {
                return (
                    <>{item.label}</>
                )
            }
        }, this);

    let sourceOfFinancinList = sourceOfFinancingArr.length > 0
        && sourceOfFinancingArr.map((item) => {
            if (item.value === arr.sourceOfFinancing) {
                return (
                    <>{item.label}</>
                )
            }
        }, this);

    let statusList = statusArr.length > 0
        && statusArr.map((item) => {
            if (item.value === arr.status) {
                return (
                    <>{item.label}</>
                )
            }
        }, this);

            return (
                <tr>
                    <td>{levelOfEducationList}</td>
                    <td>{formOfEducationList}</td>
                    <td>{sourceOfFinancinList}</td>
                    <td>{arr.directionOrSpecialty}</td>
                    <td>{statusList}</td>
                </tr>
            )
};