import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';


const TopicHeader = ({ section }) => {
    const head = {
        display: 'flex',
        justifyContent: 'space-around',
    }
    
    return (
        <div style={head}>
            <h2>{section.charAt(0).toUpperCase()+section.slice(1)}</h2>
            <Button
                variant="contained"
                color="secondary"
                size="medium"
                startIcon={<AddCircleIcon />}
            >
                create
            </Button>
        </div>
    )
}

export default TopicHeader
