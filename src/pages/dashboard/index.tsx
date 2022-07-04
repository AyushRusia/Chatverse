import { Grid, Paper, Tabs, Tab, Divider } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import MyAppBar from '../../components/Dashboard/Appbar';
import ReceivedInvitation from '../../components/Dashboard/Invitations/recieveinvitation';
import SentInvitation from '../../components/Dashboard/Invitations/sendinvitation';
import { viewerQuery } from '../../react-query/queries/viewerQuery';
import { person } from '../../types';

const Dashoboard: NextPage = () => {
  // query chalai {data, loading ,error} = viewerQuery(

  const { data, isLoading, error } = useQuery('user', viewerQuery);
  console.log('dashboard', data);

  const [tab, setTab] = React.useState<Number>(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };
  return (
    <>
      <Grid className='root'>
        <MyAppBar />
        <Grid container component='main'>
          <Grid item xs={12} md={7}>
            <h1>Hello Ayush</h1>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper elevation={6} sx={{ height: '' }}>
              <Tabs
                value={tab}
                onChange={handleChange}
                textColor='inherit'
                indicatorColor='primary'
                variant='fullWidth'
              >
                <Tab label='Sent Invitations' />
                <Tab label='Received Invitations' />
                classsName='tab'
              </Tabs>
              <Divider />
              {tab === 0 ? <SentInvitation /> : <ReceivedInvitation />}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashoboard;
