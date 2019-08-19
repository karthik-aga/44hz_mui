import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowIcon from "@material-ui/icons/KeyboardArrowLeft";
import SearchIcon from "@material-ui/icons/Search";
import QnAIcon from "@material-ui/icons/QuestionAnswer";
import StoryBoardIcon from "@material-ui/icons/Dashboard";
import FlagIcon from "@material-ui/icons/Flag";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AdminIcon from "@material-ui/icons/SupervisorAccount";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    }
}));


export default function Navbar() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const open = Boolean(anchorEl);

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem button key='Search' to={"/search"}>
                    <ListItemIcon><SearchIcon /></ListItemIcon>
                    <ListItemText primary='Search' />
                </ListItem>
                <ListItem button key='Q & A' to={"/qna"}>
                    <ListItemIcon><QnAIcon /></ListItemIcon>
                    <ListItemText primary={'Q & A'} />
                </ListItem>
                <ListItem button key={'Story Board'} to={"/storyboard"}>
                    <ListItemIcon><StoryBoardIcon /></ListItemIcon>
                    <ListItemText primary={'Story Board'} />
                </ListItem>
                <ListItem button key={'Red Flags'} to={"/redflags"}>
                    <ListItemIcon><FlagIcon /></ListItemIcon>
                    <ListItemText primary={'Red Flags'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key='Account' to="/profile">
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary='Account' />
                </ListItem>
                <ListItem button key='Request Admin'>
                    <ListItemIcon><AdminIcon /></ListItemIcon>
                    <ListItemText primary='Request Admin' />
                </ListItem>
            </List>
            <List>
                <Divider />
                <ListItem button key='Logout' 
                    onClick={() => {
                    localStorage.removeItem("JWT");
                    window.location.href = "/login";
                    }}>
                    <ListItemIcon><ArrowIcon /></ListItemIcon>
                    <ListItemText primary='Logout' />
                </ListItem>
            </List>
        </div>
    );

    function handleChange(event) {
        setAuth(event.target.checked);
    }

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <MenuIcon onClick={toggleDrawer('left', true)} />
                    <Typography variant="h6" className={classes.title}>
                        &nbsp; &nbsp;SIA
                    </Typography>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                            {sideList('left')}
                        </Drawer>
                    </IconButton>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
