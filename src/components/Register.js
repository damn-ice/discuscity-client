import { Button, FormControl, FormGroup, Input, InputAdornment, InputLabel } from "@material-ui/core"
import { AccountCircle, Face, Lock, Visibility, VisibilityOff } from "@material-ui/icons";
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

const Register = () => {
    const classes = useStyles();

    const { url } = useUser();

    const [ err, setErr] = useState(null);

    const {register, watch, handleSubmit, formState: { errors }, reset} = useForm();

    const history = useHistory();
    const section = history.location.state;
    const cookie = localStorage.getItem('discuscity-token')

    const password = watch('password')

    const [visible, setVisible] = useState(false);
    const handleVisibility = e => {
        setVisible(!visible)
    }
    // if logged in go back...
    cookie && (section ? history.push(section.from): history.push('/'));

    const onSubmit = async (data, e) => {  
        const req = await fetch(`${url}/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
            })
        const res = await req.json();
        reset('', {
            keepValues: false,
        })
        
        if (res === 'success'){
            history.push({
                pathname: '/login',
                state: {
                    from: '/register',
                    value: 'User Created!'
                }
            })
        }else if(res.username){
            setErr(res.username[0]);
        } else if (res.email){
            setErr(res.email);
        }
    }
    return (
        <div className='card form'>
            <span className='center'><h3>Registration Form</h3></span>
            {err && <p className='center red'>{err}</p>}
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <FormControl>
                        <InputLabel  classes={{focused: classes.authForm}} htmlFor="input-with-icon-adornment">Username</InputLabel>
                        <Input
                            defaultValue=''
                            name="username"
                            {...register('username', {
                                required: 'Username is required.'
                            })}
                            classes={{focused: classes.authForm}}
                            id="input-with-icon-adornment"
                            startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                            }
                        />
                        {errors.username && <small className='red'>{errors.username.message}</small>}
                    </FormControl>
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
                    <FormControl>
                        <InputLabel classes={{focused: classes.authForm}} htmlFor="input-with-icon-adornment">Password</InputLabel>
                        <Input
                            name="password"
                            {...register('password', {
                                required: 'Password is required.',
                                minLength: {
                                    value: 6,
                                    message: 'Password should be at least 6 characters.'
                                },
                                pattern: {
                                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
                                    message: 'Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol(!@#$*).'
                                }
                            })}
                            classes={{focused: classes.authForm}}
                            type={visible? 'text': 'password'}
                            id="input-with-icon-adornment"
                            startAdornment={
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment className="pointer" onClick={handleVisibility} position="end">
                                    {visible? <VisibilityOff />: <Visibility />}
                                </InputAdornment>
                            }
                        />
                        {errors.password && <small className='red'>{errors.password.message}</small>}
                    </FormControl>
                    <FormControl >
                        <InputLabel classes={{focused: classes.authForm}} htmlFor="input-with-icon-adornment">Confirm Password</InputLabel>
                        <Input
                            name='password2'
                            {...register('password2', {
                                required: 'Confirm Password is required.',
                                validate: value => value === password || 'The passwords doesn\'t match.'
                            })}
                            classes={{focused: classes.authForm}}
                            type={visible? 'text': 'password'}
                            id="input-with-icon-adornment"
                            startAdornment={
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                            }
                        />
                        {errors.password2 && <small className='red'>{errors.password2.message}</small>}
                    </FormControl>
                    <Button  style={{marginTop: '2px'}} variant="contained" type='submit' color="secondary" endIcon={<SendIcon />}>
                        Submit
                    </Button>
                    <span className='center'>
                        <p>Already have an account? 
                        <Link style={{textDecoration: 'underline', fontWeight: 'bold'}} to='/login'> Login</Link>
                        </p>
                    </span>
                </FormGroup>
            </form>
        </div>
    )
}

export default Register

// react1: !15rfbDIIItg
// task manager chrome ... Shift +Esc