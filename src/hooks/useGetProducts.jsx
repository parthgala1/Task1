import React, { useState, useEffect } from 'react';

export const useGetProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://dummyjson.com/products/', {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();
                // console.log('Data: ', (data));
                setProducts(data.products);
                setFilteredData(data.products);
                // console.log('Products: ', products);
                setLoading(false);
            } catch (error) {
                console.log('Error: ', error);
                setLoading(false);
            }
        }
        getProducts();
    }, []);

    return { products, filteredData, setFilteredData, loading };
}
