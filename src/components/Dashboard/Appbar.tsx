import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import PersonList from './List';
import { person } from '../../types';
import { getUsersQuery } from '../../react-query/queries/getUsersQuery';
import { useQuery } from 'react-query';
import { Logout } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import socket from '../../socket';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '500px',
    },
  },
}));

interface props {
  page: string;
}
export default function MyAppBar(props: props) {
  const { page } = props;
  const router = useRouter();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <Logout></Logout>
        </IconButton>
        Logout
      </MenuItem>
    </Menu>
  );

  const [key, setKey] = React.useState('');
  const [persons, setPersons] = React.useState<person[]>([]);
  const [hidden, setHidden] = React.useState<boolean>(true);

  const fetch = async () => {
    if (key) {
      const res = await getUsersQuery(key);
      setPersons(res);
      setHidden(false);
    } else setHidden(true);
  };
  const handleChange = async (event: any) => {
    setKey(event.target.value);
    if (event.target.value) {
      const res = await getUsersQuery(event.target.value);
      setPersons(res);
      setHidden(false);
    } else setHidden(true);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Chatverse
          </Typography>
          {page === 'dashboard' && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
                value={key}
                onChange={(event) => {
                  handleChange(event);
                }}
              />
              {persons && (
                <PersonList hidden={hidden} data={persons} refetch={fetch} />
              )}
            </Search>
          )}
          <Box sx={{ flexGrow: 2 }} />
          <Box
            sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '10px' }}
          >
            {page === 'friend' && (
              <Button
                onClick={() => {
                  router.push('/dashboard');
                }}
                variant='text'
                color='secondary'
              >
                Go to Dashboard
              </Button>
            )}
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='inherit'
              onClick={() => {
                socket.disconnect();
              }}
            >
              <Logout />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
