import { useHistory, useParams } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Button } from "@material-ui/core";
import TextareaAutosize from 'react-textarea-autosize';
import { useCallback, useEffect, useRef, useState } from "react";
import Name from "./Name";
import { useUser } from "../context/UserProvider";
import io from 'socket.io-client';
import useFetch from "../useFetch";


const Chat = ({ changeProfile }) => {
    const { url, user, homeUrl, formatDate } = useUser();
    const { section , id } = useParams();
    const [text, setText] = useState('');
    const [socket, setSocket] = useState(null);
    const history = useHistory();
    const room = window.location.pathname.toLowerCase();
    // const cookie = localStorage.getItem('discuscity-token')
    

    const { data, setData, isPending, err } = useFetch(`${url}/section/${section}/${id}`)

     // connect to the server socket and join room...
    useEffect(() => {
        // anyone who joins the chat will also get message irrespective of if logged in...
        // if (!user) return;
        const newSocket = io(homeUrl)
        newSocket.emit('join', room)
        setSocket(newSocket)
        // close connection if unmounted...
        return () => newSocket.close()
    }, [homeUrl, room])

    // socket receive message handler...
    useEffect(() => {
        if (socket == null) return;
        socket.on('receive-msg', (message) => {
            setData(message.msg)
        })
        return () => socket.off('receive-msg')
    }, [socket, setData])

    // socket emotion receive handler...
    useEffect(() => {
        if (socket == null) return;
        socket.on('receive-emotion', (emotion) => {
            setData(data => (
                    {...data, posts: data.posts.map((post, i) => (
                        emotion.index === i ? emotion.post: post 
                    ))}
                ))
        })
        return () => socket.off('receive-emotion')
    }, [socket, setData])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!user || !cookie) {
        //     history.push({
        //         pathname: '/login',
        //         state: {
        //             from: `/${section}/${id}`,
        //         }
        //     })
        // } else {
        //     const post = {           
        //         message: text,
        //         date: new Date(),
        //     }
        //     setText('');
        //     const req = await fetch(`${url}/section/${section}/${id}/`, {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/json",
        //             "X-CSRFToken": cookie,
        //         },
        //         credentials: 'include',
        //         body: JSON.stringify(post)
        //     })
        //     const result = await req.json();
        //     // emit message to everyone currently in the room...
        //     socket.emit('sendMsg', {result, room})
        //     setData(result);
        // }
        console.log(text)
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
    }, [])

    const inputRef = useRef();

    const executeScroll = () => {
        setTimeout(() => {
            if (inputRef.current) inputRef.current.scrollIntoView({behavior: 'smooth'})
        }, 1500)
    }

    const handleEmotion = async (e, index) => {

       if (user) {
            const emotion = e.target.closest('.emotion').dataset.emotion;
            const selectedPost = data.posts[index];
            let likes = selectedPost.likes;
            let dislikes = selectedPost.dislikes;
            let opposing = false; 
            let updatePost;
            let create;

            // Check if who clicked is not the sender of the post...
            if (selectedPost.sender.username !== user.user){
                if (emotion === 'likes'){
                    // create new like if no prev like ...
                    if (!likes.find(like => like.like === user.user)){
                        likes = [...likes, {like: user.user}];
                        // If a dislike exists remove it...
                        if (dislikes.find(dislike => dislike.dislike === user.user)){
                            opposing = true;
                            dislikes = dislikes.filter(dislike => dislike.dislike !== user.user);
                        }
                        create = true;
                  
                    // Remove like if a previous like exists...
                    }else {
                        likes = likes.filter(like => like.like !== user.user)
                        create = false;
                    }
                    
                } else if (emotion === 'dislikes'){
                    // new dislike created if no prev dislike exists...
                    if (!dislikes.find(dislike => dislike.dislike === user.user)){
                        dislikes = [...dislikes, {dislike: user.user}];
                        // If a like exists remove...
                        if (likes.find(like => like.like === user.user) ){
                            opposing = true;
                            likes = likes.filter(like => like.like !== user.user);
                        }
                        create = true;
                    // Remove dislike if a prev dislike exists...
                    }else {
                        dislikes = dislikes.filter(dislike => dislike.dislike !== user.user)
                        create = false;
                    }
                }
                updatePost = {...selectedPost, likes, dislikes}
                // updating the UI...
                // Why didn't we use post.id?
                setData(data => (
                    {...data, posts: data.posts.map((post, i) => (
                        index === i ? updatePost: post 
                    ))}
                ))
                // Emit the updatePost index and room...
                socket.emit('sendEmotion', {updatePost, index, room})

                const body = {
                    emotion, 
                    opposing,
                    create,
                    post_id: selectedPost.id,
                    reacted_user: user.user,
                }
               
                await fetch(`${url}/emotion`, {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                })
            }
            
       } else {
            history.push({
                pathname: '/login',
                state: {
                    from: `${section}/${id}`,
                }
            })
       }
    }
   
    const viewUser = (e, index) => {
        let selectedUser = data.posts[index].sender
        changeProfile(selectedUser)
        history.push('/user')
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
                                        <div>
                                            <img onClick={(e) => viewUser(e, index)} className='pix' src={`${homeUrl}${post.sender.person.pix}`} alt='Profile' width="50" height="50"/>
                                        </div>
                                        {/* This topic-link is why this section is in the center now in left needs editting and name change... */}
                                        <div className='topic-link' >
                                            {/* <span style={ {color: color[randomGen(color)], fontWeight: 'bold'}} onLoad={console.log(initialRender)} >{post.sender}</span> --  */}
                                            <Name sender={post.sender.username} />
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
                        {/* when the document is done loading it should scroll into view...  */}
                        <div className='form-control' ref={document.readyState === 'complete'? viewRef: null}>
                            <form onSubmit={handleSubmit}>
                                <TextareaAutosize placeholder="Type your message..." minRows={2} maxRows={6} style={{resize: 'none', width: '80%'}} ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} required />
                                {/* <input ref={inputRef} type="text" placeholder="Type your message..." value={text} onChange={(e) => setText(e.target.value)} required/> */}
                                <Button onClick={ executeScroll } variant="contained" type='submit' color="secondary" endIcon={<SendIcon />}>
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


        // LEGACY

            // We should have use useFetch hook here? Honestly, tired of working on this component...
    // Ans: setData is used on some other callbacks such as handleSubmit and handleEmotion...

    // useEffect(() => {
    //     const abortFetch = new AbortController();
    //     const getData = async () => {
    //         try {
    //             const res = await fetch(`${url}/section/${section}/${id}`, {signal: abortFetch.signal})
    //             if (!res.ok){
    //                 throw Error("Couldn't get resources!")
    //             }
    //             const data = await res.json();
    //             setData(data);
    //             setIsPending(false);
    //             setErr(null);
    //         }
    //         catch (err) {
    //             if (err.name === 'AbortError'){
    //                 console.log('Fetch Cancelled!')
    //             }else {
    //                 setIsPending(false);
    //                 setData(null);
    //                 setErr(err.message);
    //             }
                
    //         }
    //     }
    //     getData();
        
    //     return () => {
    //         setIsPending(true);
    //         setData(null);
    //         setErr(null);
    //         abortFetch.abort();
    //     }
    // }, [url, id, section])


                    /**
                 *  Solution 1
                 *  send a post request to the server with the following....
                 *  let body = {
                 *      emotion,
                 *      opposing,
                 *      create,
                 *      post_id: post.id,
                 *      reacted_user: user.user,
                 *  }
                 * 
                 * The emotion is in the emotion field, opposing whether to delete the opposing,
                 * create whether it is to create else delete, post_id the id of the post that the emotion belongs to, 
                 * reacted_user the user that clicked on an emotion... 
                 * */ 

      /**
                         * Send a fetch request to the server (POST)
                         * TO create a new emotion and delete opposing
                         * if opposing is true
                         * */ 
              /**
                         * Send a request to the server (DELETE)
                         * to delete the emotion 
                         * */ 