import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory } from 'react-router-dom';



const TopicHeader = ({ section }) => {

    const history = useHistory();

    const head = {
        display: 'flex',
        justifyContent: 'space-around',
    }

    const btn = {
        margin: '20px',
    }
    return (
        <div style={head}>
            <h2>{section.charAt(0).toUpperCase()+section.slice(1)}</h2>

            <Button
                variant="contained"
                color="secondary"
                size="medium"
                style={btn}
                // only if user exists...
                onClick={() => history.push({
                    pathname: '/create',
                    state: section,
                })}
                startIcon={<AddCircleIcon />}
            >
                create
            </Button>
        </div>
    )
}

export default TopicHeader
