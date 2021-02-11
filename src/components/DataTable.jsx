import React from 'react';
import './DataTable.css';

export const DataTable = ({ data = [{}], custom = {} }) => {
    const headers = Object.keys(data[0]);
    const Headers = headers.map((h, index) => getHeaderCell(h, index, custom));

    const Rows = data.map((r, index) => getRow(r, index, custom));
    return (
        <div className='table-container'>
            <div className='header-row'>
                {Headers}
            </div>
            <div className='body'>
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

const getHeaderCell = (h, index, custom = {}) => {
    let display = h;
    if (custom[h] && custom[h].name) {
        display = custom[h].name;
    }
    return (
        <div key={index} className='header-cell'>{display}</div>
    );
}

const getRow = (row, index, custom = {}) => {
    const cells = getCells(row);
    const handleRowClick = () => {
        if (typeof custom.rowClick === "function") {
            custom.rowClick(row);
        }
    }
    return (
        <div className='table-row' key={index} onClick={handleRowClick} >
            {cells}
        </div>
    );
}

