import { useState, useEffect } from 'react';
import FilesTable from './FilesTable';

const PAGE_SIZE = 15;

export const PaginatedTable = ({ initialData, initialPage, total }: {initialData: any, initialPage: number, total: number}) => {

    const [totalData, setTotalData] = useState([]);
    const [data, setData] = useState<File[]>(initialData.slice(0, PAGE_SIZE));
    const [page, setPage] = useState<number>(initialPage);

    useEffect(() => {
        const dataTotal = initialData ? initialData : [];
        setTotalData(dataTotal);
        // Prefetch the next page if the user is on the current page
        if (page * PAGE_SIZE < total) {
            fetch(`/api/public/v1/pagination?page=${page + 1}&limit=${PAGE_SIZE}`, {
                method: 'POST',
                body: JSON.stringify({data: totalData}),
            })
                .then(res => res.json())
                .then(result => {
                    // Optionally store the pre-fetched data if needed
                    console.log("PREFETCH", result);
                });
        }
    }, [page, data]);

    const handleNext = async () => {
        const nextPage = page + 1;
        const res = await fetch(`/api/public/v1/pagination?page=${nextPage}&limit=${PAGE_SIZE}`, {
            method: 'POST',
            body: JSON.stringify({data: totalData}),
        });
        const result = await res.json();

        setData(result.data);
        setPage(nextPage);
    };

    const handlePrev = async () => {
        const prevPage = page - 1;
        const res = await fetch(`/api/public/v1/pagination?page=${prevPage}&limit=${PAGE_SIZE}`, {
            method: 'POST',
            body: JSON.stringify({data: totalData}),
        });
        const result = await res.json();

        setData(result.data);
        setPage(prevPage);
    };

    return (
        <div>
            <h1>Paginated Data</h1>
            <FilesTable rows={data} ></FilesTable>
            <button onClick={handlePrev} disabled={page === 1} className="m-3">Previous</button>
            <button onClick={handleNext} disabled={page * PAGE_SIZE >= total}>Next</button>
        </div>
    );
};
