import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { person } from '../../types';
import { useMutation, useQuery } from 'react-query';
import { getUsersQuery } from '../../react-query/queries/getUsersQuery';
import { Button } from '@mui/material';
import { sendInvitation } from '../../react-query/mutations/sendInvitation';
import { sentInvitationsQuery } from '../../react-query/queries/sentInvitationsQuery';

interface ListProp {
  hidden: boolean;
  data: person[];
  refetch: () => void;
}

export default function PersonList(props: ListProp) {
  const data = Array.isArray(props.data) ? props.data : [];
  const mutatation = useMutation(sendInvitation, {
    onSuccess: (data) => {
      props.refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const sendInvite = async (_id: string) => {
    mutatation.mutate(_id);
  };
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: '#fff',
        borderRadius: '0,0,5px,5px',
        position: 'absolute',
        maxHeight: '500px',
        overflowY: 'auto',
        visibility: props.hidden ? 'hidden' : 'visible',
      }}
    >
      {data &&
        data.map((per, idx) => {
          return (
            <>
              <ListItem sx={{ cursor: 'pointer' }} alignItems='center'>
                <ListItemAvatar>
                  <Avatar alt='Remy Sharp' src={per.profile} />
                </ListItemAvatar>
                <ListItemText>
                  <Typography sx={{ color: 'black' }} component='h3'>
                    {per.name}
                  </Typography>
                  <Typography sx={{ color: 'black' }} component='h5'>
                    {per.email}
                  </Typography>
                </ListItemText>
                <Button
                  onClick={() => {
                    sendInvite(per._id);
                  }}
                  color='secondary'
                  variant='outlined'
                >
                  Send
                </Button>
              </ListItem>
              <Divider variant='inset' component='li' />
            </>
          );
        })}
    </List>
  );
}
