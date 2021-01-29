import React from 'react';

export const DataTable = ({ data = [{}] }) => {
    const headers = Object.keys(data[0]);
    const Headers = headers.map((h, index) => {
        return (
            <div key={index}>{h}</div>
        );
    });

    const Rows = data.map((row, index) => {
        const cells = getCells(row);
        return (
            <div className='table-row' key={index}>
                {cells}
            </div>
        );
    });
    return (
        <div>
            <div className='header-row'>
                {Headers}
            </div>
            <div>
                {Rows}
            </div>
        </div>
    );
}

const getCells = (row) => {
    return Object.entries(row).map(([key, value]) => {
        return (
            <div className='table-cell' key={key}>
                {value}
            </div>
        )
    });
}