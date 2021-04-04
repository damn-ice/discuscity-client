import {useParams} from 'react-router-dom';
import useFetch from '../useFetch';
import Topic from './Topic';


const Topics = () => {
    const { section } = useParams();

    const { data, isPending, err } = useFetch(`http://localhost:7000/${section}`)

    /**
     * Implementation of Search Topic...
     * 
     * send a query to search for all topic that includes that params...
     *  const value = search result ? searchresult: data
     * <Topic topics={value}/>
     */
    
    return (
        <div>
            { err && <h1>{err}</h1>}
            { isPending && <h1>Loading...</h1>}
            { data && <Topic topics={data} section={section}/>}
        </div>
    )
}

export default Topics
