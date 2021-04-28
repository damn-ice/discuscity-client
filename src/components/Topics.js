import {useParams} from 'react-router-dom';
import { useUser } from '../context/UserProvider';
import useFetch from '../useFetch';
import Topic from './Topic';


const Topics = () => {
    const { section } = useParams();

    const { url } = useUser();

    const { data, isPending, err } = useFetch(`${url}/section/${section}`)
    

    /**
     * Implementation of Search Topic...
     * 
     * 1. I don't understand this implementation anymore ... lol ...28/4/21
     * send a query to search for all topic that includes that params...
     *  const value = search result ? searchresult: data
     * <Topic topics={value}/>
     * 
     * 2. 28/4/21
     * We need to place a Topic provider that what is send here will...
     * be what is filtered by search in navbar using onChange
     * TopicProvider
     * const [topics, setTopics] = data
     * NavBar --> search --> onChange...
     * setTopics(prevs => prevs.map(prev => prev.title.include(e.target.value)))
     * e.target.value is the text in the search...
     * 
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
