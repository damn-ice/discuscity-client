import { Button, FormControl, FormGroup, Input, InputLabel, InputAdornment } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import SendIcon from '@material-ui/icons/Send';
import { useUser } from "../context/UserProvider";


const useStyles = makeStyles(theme => ({
    authForm: {
        color: 'white',
        "&.Mui-focused": {
            color: "white"
        }
    }
}
))

const Create = () => {

    const { cookie, url, user } = useUser();

    const classes = useStyles();
    const history = useHistory();

    const section = history.location.state

    !section && history.push('/')

    const [ err, setErr] = useState(null);

    const {register, handleSubmit, formState: { errors }, reset} = useForm();

    const onSubmit = async (data, e) => {
        if (user){
            const newTopic = {
                // sender will be handled server side... request.user
                section,
                title: data.title,
                post: data.post,
                date: new Date(),
            }
            reset('', {
                keepValues: false,
            })
            const req = await fetch(`${url}/create`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": cookie,
                },
                credentials: 'include',
                body: JSON.stringify(newTopic)
            })

            history.push(`/${section}`)
        }else {
            history.push('/register')
        }
    }

    return (
        <div className='card form'>
            <span className='center'><h3>Create Topic Form</h3></span>
            {err && <p className='center red'>{err}</p>}
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <FormControl>
                        <Input
                            classes={{disabled: classes.authForm}}
                            disabled
                            label="Section"
                            defaultValue={section && section.toUpperCase()}
                            variant="filled"
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel  classes={{focused: classes.authForm}} htmlFor="Title of new topic">Title</InputLabel>
                            <Input
                                defaultValue=''
                                name="title"
                                {...register('title', {
                                    required: 'Title is required.',
                                    minLength: {
                                    value: 10,
                                    message: 'Title should be at least 10 characters.'
                                },
                                })}
                                classes={{focused: classes.authForm}}
                                id="input-with-icon-adornment"
                            />
                        {errors.title && <small className='red'>{errors.title.message}</small>}                        
                    </FormControl>
                    <FormControl>
                        <Input
                            defaultValue=''
                            multiline
                            rowsMax={7}
                            name="post"
                            {...register('post', {
                                required: 'Post is required.',
                                minLength: {
                                    value: 10,
                                    message: 'Post should be at least 15 characters.'
                                }
                            })}
                            classes={{focused: classes.authForm}}
                            placeholder="New Post"
                            startAdornment={
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            }
                        />
                        {errors.post && <small className='red'>{errors.post.message}</small>}                        
                    </FormControl>
                    <Button  style={{marginTop: '2px'}} variant="contained" type='submit' color="secondary" endIcon={<SendIcon />}>
                        Submit
                    </Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default Create
