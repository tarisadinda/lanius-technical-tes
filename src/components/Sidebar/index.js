import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { List, ListItem, ListItemButton, Divider } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

const ListMenu = [
    {
      title: <HomeIcon />,
      path: '/home'
    },
    {
      title: 'User',
      path: '/user'
    },
    {
      title: 'Post',
      path: '/post'
    },
];

const activeBtn = {
    backgroundColor: "rgb(136 177 236)",
};

const Sidebar = () => {
    const [activeNav, setActiveNav] = React.useState(ListMenu.title);

    const handleClick = (nav) => {
        setActiveNav(nav);
    }

    return (<>
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    {ListMenu.map((nav, index) => {
                        return (<>
                            <ListItem 
                                button
                                style={activeNav === nav ? activeBtn : null}
                                onClick={() => handleClick(nav)}
                                disablePadding>
                                <ListItemButton className='d-flex justify-content-center'>
                                    <Link to={nav.path} style={{textDecoration: 'none', color: '#000'}}>
                                        <ListItemText style={{textAlign: 'center'}} primary={nav.title} />
                                    </Link>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </>)
                    })}
                </List>
            </Drawer>
        </Box>
    </>)
}

export default Sidebar;