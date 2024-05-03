import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Pagination from './Pagination.jsx';

import { useGetProducts } from '../hooks/useGetProducts';
import * as XLSX from 'xlsx';


export default function BasicTable() {
    const { products, filteredData, setFilteredData, loading } = useGetProducts();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // console.log(filteredData);

    const downloadSheet = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'data');
        XLSX.writeFile(workbook, 'data.csv');
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
        const filteredItems = products.filter((product) =>
            product.brand.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredData(filteredItems);
    }
    console.log('Search: ', search);


    return (

        <div className='flex flex-col justify-center items-center w-full'>
            <div className=' font-monsterrat text-6xl text-white'>Tabular Data</div>
            <h1 className='mt-7 text-white font-monsterrat text-xl'>Rows Per Page</h1>
            <input type="number" name="search" placeholder='' value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)} className='mb-5 px-3 py-1 rounded-lg' />
            <input type="text" name="search" placeholder='Search' value={search} onChange={handleChange} className='my-5 px-3 py-1 rounded-lg' />
            <div className='w-4/5 h-4/5 flex flex-col items-center\ justify-center '>
                <div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold mb-12 py-2 px-4 rounded' onClick={downloadSheet}>Download</button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 1530, maxHeight: 1000 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Sr. No.</TableCell>
                                <TableCell align='center'>Brand</TableCell>
                                <TableCell align='center'>Name</TableCell>
                                <TableCell align='center'>Description</TableCell>
                                {/* <TableCell align='center'>Image</TableCell> */}
                                <TableCell align='center'>Price&nbsp;(₹)</TableCell>
                                {/* <TableCell align='center'>Thumbnail</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ?
                                <TableRow>
                                    <TableCell align='center'>
                                        <Skeleton variant="text" width={100} />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Skeleton variant="text" width={100} />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Skeleton variant="text" width={100} />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Skeleton variant="text" width={100} />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Skeleton variant="text" width={100} />
                                    </TableCell>
                                </TableRow>
                                :
                                <>
                                    {
                                        filteredData.map((row) => (
                                            <TableRow
                                                key={row.id}
                                            >
                                                {/* <TableCell align="right">{row.brand}</TableCell> */}
                                                <TableCell align="center">{row.id}</TableCell>
                                                <TableCell align='center' >{row.brand}</TableCell>
                                                <TableCell align="center">{row.title}</TableCell>
                                                <TableCell align="left">{row.description}</TableCell>
                                                <TableCell align="center">{row.price}</TableCell>
                                                {/* <TableCell align="right">
                                        <img className='size-48' src={row.thumbnail} alt="" />
                                    </TableCell> */}
                                            </TableRow>
                                        ))
                                    }
                                </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div>
                <Pagination count={10} length={products.length} rowsPerPage={rowsPerPage} />
            </div>
        </div>
    );
}
