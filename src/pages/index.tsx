import * as React from 'react';
import type { NextPage } from 'next';
import { Grid, Typography, Tabs, Tab, Box } from '@mui/material';
import Login from '../components/HomePage/login';
import Register from '../components/HomePage/register';

const Home: NextPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h3' sx={{ textAlign: 'center' }}>
            Chatverse
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='Auth Tab'
              centered
            >
              <Tab sx={{ width: '50%' }} label='Login' id='1' />
              <Tab sx={{ width: '50%' }} label='Register' id='2' />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Login />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Register />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
