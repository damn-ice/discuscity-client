import { useState, useEffect } from 'react';


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const abortFetch = new AbortController();
        setTimeout(() => {
            const getData = async () => {
                try {
                    const res = await fetch(url, {signal: abortFetch.signal})
                    if (!res.ok){
                        throw Error("Couldn't get resources!")
                    }
                    const data = await res.json();
                    setData(data);
                    setIsPending(false);
                    setErr(null);
                }
                catch (err) {
                    if (err.name === 'AbortError'){
                        console.log('Fetch Cancelled!')
                    }else {
                        setIsPending(false);
                        setData(null);
                        setErr(err.message);
                    }
                    
                }
            }
            getData();
        }, 1000)
        return () => {
            setIsPending(true);
            setData(null);
            setErr(null);
            abortFetch.abort();
        }
    }, [url])

    return {data, isPending, err};
}

export default useFetch
