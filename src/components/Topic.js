import { Link } from "react-router-dom"
import TopicHeader from "./TopicHeader"

const Topic = ({topics, section}) => {

    return (
        <div>
            { section && <TopicHeader section={section} /> }
            {topics.map(topic => (
                <Link to={`${section? section: topic.section}/${topic.id}`} key={topic.id} >
                    <div className='card'>
                        { topic.title }
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Topic
