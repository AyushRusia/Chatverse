import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  CircularProgress,
  Tooltip,
  Box,
  IconButton,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQuery } from 'react-query';
import { sentInvitationsQuery } from '../../../react-query/queries/sentInvitationsQuery';
import { deleteInvitation } from '../../../react-query/mutations/deleteInvitation';

interface Props {}

const SentInvitation: React.FC<Props> = ({}) => {
  const { data, isLoading, error, refetch } = useQuery(
    'sentInvitations',
    sentInvitationsQuery
  );

  if (isLoading) return <h1>Loading</h1>;
  const deleteMutation = useMutation(deleteInvitation, {
    onSuccess: () => {
      refetch();
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <>
      <List>
        {data &&
          data.map((invitation) => {
            if (Boolean(invitation))
              return (
                <ListItem key={invitation._id}>
                  <ListItemAvatar>
                    <Avatar alt='Remy Sharp' src={invitation.recieverProfile} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={invitation.recieverName}
                    secondary={invitation.recieverEmail}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title='Delete Invitation'>
                      <IconButton
                        color='secondary'
                        aria-label='delete'
                        onClick={() =>
                          handleDelete(invitation._id ? invitation._id : '')
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            else {
              return null;
            }
          })}
      </List>
    </>
  );
};

export default SentInvitation;
