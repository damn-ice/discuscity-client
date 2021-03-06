import {  useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useUser } from '../context/UserProvider';
import { useFilter } from '../context/FilterProvider';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  
  grow: {
    flexGrow: 1,
    marginBottom: '10vh',
  },
  apps: {
    backgroundColor: 'black',
    zIndex: 1000,
  },
  title: {
    display: 'block',
    marginRight: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(12),
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const { homeUrl, user } = useUser();

  const { changeFilter } = useFilter();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    // It wont display bcos menu anchorE1 is initially null and open is false...
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >{
      user ? <div>
        <MenuItem onClick={handleMenuClose}><Link to='/profile'>Profile</Link> </MenuItem>
        <MenuItem onClick={handleMenuClose}><Link to='/logout'>Logout</Link></MenuItem>
      </div>: <div>
        <MenuItem onClick={handleMenuClose}><Link to='/register'>Register</Link> </MenuItem>
        <MenuItem onClick={handleMenuClose}><Link to='/login'>Login</Link></MenuItem>
      </div>
    }
      
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={user && user.totalLikes.length} color="secondary">
            <InsertEmoticonIcon />
          </Badge>
        </IconButton>
        <p>Likes</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={user && user.totalDislikes.length} color="secondary">
            <SentimentVeryDissatisfiedIcon />
          </Badge>
        </IconButton>
        <p>Dislikes</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {
            user ? <Avatar alt={`${user.first_name}`} src={`${homeUrl}${user.pix}`} />:
            <AccountCircle />
          }
        </IconButton>
        <p>User Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.apps}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap >
            Discuscity
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={(e) => changeFilter(e.target.value.toLowerCase())}
              placeholder="Search Topic ..???"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show likes" color="inherit">
              <Badge badgeContent={user && user.totalLikes.length} color="secondary">
                <InsertEmoticonIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show dislikes" color="inherit">
              <Badge badgeContent={user && user.totalDislikes.length} color="secondary">
                <SentimentVeryDissatisfiedIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {
                user ? <Avatar alt={`${user.first_name}`} src={`${homeUrl}${user.pix}`} />:
              <AccountCircle />
              }
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
