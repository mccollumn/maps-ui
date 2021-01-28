import React from 'react';

export const DataTable = ({data = [{}]}) => {
    const headers = Object.keys(data[0]);
    const Headers = headers.map((h, index) => {
        return (
            <div key={index}>{h}</div>
        );
    });
    return (
        <div>
            <div className='header-row'>
                {Headers}
            </div>
        </div>
    );
}