import { Button, FormControl, FormGroup, Input, InputAdornment, InputLabel } from "@material-ui/core"
import { AccountCircle, Lock, Visibility, VisibilityOff } from "@material-ui/icons";
import SendIcon from '@material-ui/icons/Send';
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


const Login = () => {
    const classes = useStyles();

    const { url, setUser } = useUser();

    const [ err, setErr] = useState(null);

    const {register, handleSubmit, formState: { errors }, reset} = useForm();

    const history = useHistory();
    const section = history.location.state;
    const cookie = localStorage.getItem('discuscity-token');
    const [visible, setVisible] = useState(false);
    const handleVisibility = e => {
        setVisible(!visible)
    }

    cookie && (section ? history.push(section.from): history.push('/'));
    console.log({cookie})
    console.log({section})
    console.log({from: section?.from})
    console.log('section ? history.push(section.from): history.push(/)')

    const onSubmit = async (data, e) => {
        const req = await fetch(`${url}/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify(data)
        })
        console.log(req)
        const res = await req.json();
        reset('', {
            keepValues: false,
        })
        // If bad request...
        if (req.status === 400) {
            setErr(res)
        }else {
            // useUser context function to set user on app...
            localStorage.setItem('discuscity-token', res.csrfToken)
            setErr(null);
            setUser(res);

            // if previous page was register... history.push(/)
            // what if the person accessed login as first point?
            // the above went directly to '/'...
            section? (section.from !== '/register' && history.push(section.from) ): history.push('/');
        }
    }
    return (
        <div className='card form'>
            <span className='center'><h3>Login Form</h3></span>
            <p className="center">{section && section.from === '/register' && section.value }</p>
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
                        <InputLabel classes={{focused: classes.authForm}} htmlFor="input-with-icon-adornment">Password</InputLabel>
                        <Input
                            name="password"
                            {...register('password', {
                                required: 'Password is required.',
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
                    
                    <Button  style={{marginTop: '2px'}} variant="contained" type='submit' color="secondary" endIcon={<SendIcon />}>
                        Submit
                    </Button>
                    <span className='center'>
                        <p>Don't have an account? 
                        <Link style={{textDecoration: 'underline', fontWeight: 'bold'}} to='/register'> Register</Link>
                        </p>
                    </span>
                </FormGroup>
            </form>
        </div>
    )
}

export default Login

// react1: !15rfbDIIItg
// react-moz: Reactmoz!1
// afteriotest: After!o73s7
