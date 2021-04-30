import { useState, useEffect } from 'react';

const useGet = (url) => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const abortFetch = new AbortController();
        const getData = async () => {
            try {
                const req = await fetch(url, {
                    signal: abortFetch.signal,
                    credentials: 'include',
                    method: 'GET'
                });
                if (!req.ok){
                    throw Error("Couldn't get resources!")
                }
                const res = await req.json();
                // console.log(res)
                setData(res);
                setStatus(req.status);
            } catch (err) {
                console.log(err);
            }
        }
        getData();

    }, [url])

    return { data, status }
}

export default useGet