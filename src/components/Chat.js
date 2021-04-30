import { useHistory, useParams } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Button } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import Name from "./Name";
import { useUser } from "../context/UserProvider";


const Chat = () => {
    const { url, user, cookie } = useUser();
    const { section , id } = useParams();
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [err, setErr] = useState(null);
    const [text, setText] = useState('');
    const history = useHistory();
    // const url = `http://localhost:7000/${section}/${id}`;

    useEffect(() => {
        const abortFetch = new AbortController();
        setTimeout(() => {
            const getData = async () => {
                try {
                    const res = await fetch(`${url}/section/${section}/${id}`, {signal: abortFetch.signal})
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
    }, [url, id, section])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            history.push('/login')
        } else {
            const post = {           
                message: text,
                date: new Date(),
            }
            const req = await fetch(`${url}/section/${section}/${id}/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": cookie,
                },
                credentials: 'include',
                body: JSON.stringify(post)
            })
            const result = await req.json();
            setText('');
            setData(result);
        }
    }

    /*
    * We're going to put sendMessage as a dependecy in the array...
    *               OR
    * click on submitting button should trigger a scrollinto view...
    */ 
    
    const viewRef = useCallback( node => {
        // Move the form into view
        if (node) {
            node.scrollIntoView({smooth: true})
        }
    }, [handleSubmit])

    const handleEmotion = async (e, index) => {
        const emotion = e.target.closest('.emotion').dataset.emotion;
        const selectedPost = data.posts[index];
        let newLikes = selectedPost.likes;
        let newDislikes = selectedPost.dislikes;
        if (emotion === 'likes'){
            // if it doesn't contain current user like...
            if (!newLikes.includes(selectedPost.sender)){
                newLikes = [...newLikes, selectedPost.sender]
                newDislikes = selectedPost.dislikes.filter(dislike => dislike !== selectedPost.sender);
            // if it does contain current user like...
            }else {
                newLikes = selectedPost.likes.filter(like => like !== selectedPost.sender);
                newDislikes = [...selectedPost.dislikes]
            }

        } else if (emotion === 'dislikes') {
            if (!newDislikes.includes(selectedPost.sender)) {
                newDislikes = [ ...newDislikes, selectedPost.sender];
                newLikes = selectedPost.likes.filter(like => like !== selectedPost.sender);
            } else {
                newDislikes = selectedPost.dislikes.filter(dislike => dislike !== selectedPost.sender);
                newLikes = [...selectedPost.likes];
            }
        }
        const newPost = {...selectedPost, likes: newLikes, dislikes: newDislikes};
        
        data.posts[index] = newPost;
        const body = {
            title: data.title,
            id: data.id,
            posts: data.posts
        } 

        const res = await fetch(`http://localhost:7000/${section}/${id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })

        const result = await res.json();

        setData(result);    
        // console.log({newLikes});
        // console.log({newDislikes});

        /*
            * Possible Implementation
            *
            * if(!user) history.push('/login');
            * else{
            *   update the UI
            *   set flag to true if contradicting emotion has to be removed on the DB
            *   send the emotion to the backend as a post
            *   if the emotion is created it should carry along a flag that determines if...
            *   ... the opposing emotion should be deleted
            *   if the emotion is to be deleted the flag will not be send the emotion...
            *   ... is simply deleted
            *   backend return backs a success
            * }

        */ 
    }

    const formatDate = date => {
        const dateObj = new Date(date);
        const currentTime = new Date();

        if (dateObj.getFullYear() === currentTime.getFullYear()
            && dateObj.getMonth() === currentTime.getMonth()
            && dateObj.getDate() === currentTime.getDate()
            && dateObj.getHours() === currentTime.getHours()
            && dateObj.getMinutes() === currentTime.getMinutes()
        ){
            return 'Now!'
        }else if (dateObj.getFullYear() === currentTime.getFullYear()
            && dateObj.getMonth() === currentTime.getMonth()
            && dateObj.getDate() === currentTime.getDate()
        ){
            return `Today @ ${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}`:`${dateObj.getMinutes()}`}`
        }else if (dateObj.getFullYear() === currentTime.getFullYear()
            && dateObj.getMonth() === currentTime.getMonth()
            && dateObj.getDate() === currentTime.getDate() - 1
        ){
            return `Yesterday @ ${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}`:`${dateObj.getMinutes()}`}`
        }else {
            return `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`
        }        
    }
   
    return (
        <>
            {
                data && (
                    <div >
                        <h4 className='chat-title'>#{ data.title }</h4>
                        <div className='chat-content'>
                            {data.posts.map( (post, index) => (
                                <div className='card' key={index}>
                                    <div className='chat-flex relative'>
                                        <div className="pix">
                                            <img src='/' alt='Pix Space'/>
                                        </div>
                                        {/* This topic-link is why this section is in the center now in left needs editting and name change... */}
                                        <div className='topic-link' >
                                            {/* <span style={ {color: color[randomGen(color)], fontWeight: 'bold'}} onLoad={console.log(initialRender)} >{post.sender}</span> --  */}
                                            <Name sender={post.sender} />
                                             <small>{formatDate(post.date)}</small>
                                            <p>{post.message}</p>
                                            <div className="emotions">
                                                <Badge badgeContent={post.likes.length} aria-label="toggle likes" color="primary" data-emotion="likes" className='emotion' onClick={(e) => handleEmotion(e, index)} >
                                                    <InsertEmoticonIcon /> 
                                                </Badge>
                                                <Badge badgeContent={post.dislikes.length} aria-label ="toggle dislikes" color="secondary" className='emotion'  data-emotion="dislikes" onClick={(e) => handleEmotion(e, index)}>
                                                    <SentimentVeryDissatisfiedIcon />
                                                </Badge>
                                            </div>     
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='form-control' ref={document.readyState === 'complete'? viewRef: null}>
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Type your message..." value={text} onChange={(e) => setText(e.target.value)} />
                                <Button variant="contained" type='submit' color="secondary" endIcon={<SendIcon />}>
                                    Submit
                                </Button>
                            </form>
                        </div>
                        
                    </div>
                )
            }
            { err && <h1>{err}</h1>}
            { isPending  && <h1>Loading...</h1>}
        </>
    )
}

export default Chat
