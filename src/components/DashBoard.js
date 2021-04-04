import Section from './Section';
import Content from './Content';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    dashboard: {
        display: 'block',
        height: '80vh',
        color: 'white',
        overflow: 'auto',
        paddingBottom: '4px',
        borderBottom: '2px solid white',
        '& a': {
            textDecoration: 'none',
            color: 'white',
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            flexGrow: 1,
        },
    },
    section: {

        backgroundColor: '#332F2E',
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            position: 'fixed',
            flexDirection: 'column',
            overflow: 'auto',
            borderRadius: '0 0 20% 0',
            width: '150px',
            height: '80vh',
        },
        '&::-webkit-scrollbar':{
            width: '10px',
            boxShadow: 'inset 0 0 5px black',
            background: 'black',
            borderRadius: '10px'
        },
        // '&::-webkit-scrollbar-track':{
        //     boxShadow: 'inset 0 0 5px grey',
        //     borderRadius: '10px'

        // },
        '&::-webkit-scrollbar-thumb':{
            background: 'red',
            width: '5px',
            borderRadius: '10px',
        },
        alignItems: 'center',
        zIndex: 100,
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
    },
    content: {
        backgroundColor: '#332F2E',
        padding: '10px 40px',
        margin: '20px',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            margin: 'initial',
            marginLeft: '160px',
            width: '100%',
            overflow: 'auto',
        },
        '&::-webkit-scrollbar':{
            width: '10px',
            boxShadow: 'inset 0 0 5px black',
            background: 'black',
            borderRadius: '10px'
        },
        '&::-webkit-scrollbar-thumb':{
            background: 'red',
            width: '5px',
            borderRadius: '10px',
        },
    },
    active: {
        backgroundColor: 'white',
        borderBottom: '4px solid red',
        [theme.breakpoints.up('sm')]: {
            borderLeft: '4px solid red',
            borderBottom: 'none',
        } 
    },
    listRoot: {
        backgroundColor: '#332F2E',
        display: 'flex',
        flexWrap: 'wrap',
        '&>*':{
            flex: '1 1 20px',
        },
        margin: '0 auto',
        padding: '0 20px',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            width: '100%',
            padding: 'initial',
        }
    }
}));


const DashBoard = () => {
    const classes = useStyles();

    return (
        <div className={classes.dashboard}>
            <Section section={classes.section} active={classes.active} listRoot={classes.listRoot} />
            <Content content={classes.content} />
        </div>
    )
}

export default DashBoard
