import React from 'react'

const Pagination = ({ length, rowsPerPage, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (e) => {
        const page = e.target.textContent;
        onPageChange(page);
    }

    return (
        <div className='my-12 p-2 rounded-full bg-blue-600'>
            {pageNumbers.map((number) => (
                <button key={number} onClick={handleClick} className='px-3 py-1 mx-2 bg-blue-500 text-white rounded-full'>
                    {number}
                </button>
            ))}
        </div>
    )
}

export default Pagination