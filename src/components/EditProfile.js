import { Button, FormControl, FormGroup, Input, InputAdornment, InputLabel } from "@material-ui/core"
import {  Face} from "@material-ui/icons";
import SendIcon from '@material-ui/icons/Send';
import EmailIcon from '@material-ui/icons/Email';
import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
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

const EditProfile = ({ edit }) => {
    const classes = useStyles();

    const { url, user } = useUser();

    const [ err, setErr] = useState(null);

    const {register, handleSubmit, formState: { errors }, reset} = useForm();

    const history = useHistory()


    const onSubmit = async (data, e) => {  
        const req = await fetch(`${url}/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
            })
        await req.json();
        reset('', {
            keepValues: false,
        })
        
    }
    return (
        <div className='card form'>
            <span className='center'><h3>Edit Profile</h3></span>
            {err && <p className='center red'>{err}</p>}
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <FormControl>
                        <InputLabel classes={{focused: classes.authForm}} htmlFor="input-with-icon-adornment">Email</InputLabel>
                        <Input
                            name="email"
                            {...register('email', {
                                required: 'Email is required.',
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: 'Email is not valid.'
                                }
                            })}
                            classes={{focused: classes.authForm}}
                            id="input-with-icon-adornment"
                            startAdornment={
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        }
                        />
                        {errors.email && <small className='red'>{errors.email.message}</small>}
                    </FormControl>
                    <FormControl>
                        <InputLabel classes={{focused: classes.authForm}} htmlFor="input-with-icon-adornment">First Name</InputLabel>
                        <Input
                            name="first_name"
                            {...register('first_name', {
                                required: 'First name is required.'
                            })}
                            classes={{focused: classes.authForm}}
                            id="input-with-icon-adornment"
                            startAdornment={
                            <InputAdornment position="start">
                                <Face />
                            </InputAdornment>
                        }
                        />
                        {errors.first_name && <small className='red'>{errors.first_name.message}</small>}
                    </FormControl>
                    <FormControl>
                        <InputLabel classes={{focused: classes.authForm}} htmlFor="input-with-icon-adornment">Last Name</InputLabel>
                        <Input
                            name="last_name"
                            {...register('last_name', {
                                required: 'Last name is required.'
                            })}
                            classes={{focused: classes.authForm}}
                            id="input-with-icon-adornment"
                            startAdornment={
                            <InputAdornment position="start">
                                <Face />
                            </InputAdornment>
                        }
                        />
                        {errors.last_name && <small className='red'>{errors.last_name.message}</small>}
                    </FormControl>
                    <Button  style={{marginTop: '2px'}} variant="contained" type='submit' color="secondary" endIcon={<SendIcon />}>
                        Submit
                    </Button>
                    <span className='center'>
                        <p>Are you sure about this? 
                        <Link style={{textDecoration: 'underline', fontWeight: 'bold'}} onClick={(e) => edit(e, true)}> Back to Profile.</Link>
                        </p>
                    </span>
                </FormGroup>
            </form>
        </div>
    )
}

export default EditProfile
