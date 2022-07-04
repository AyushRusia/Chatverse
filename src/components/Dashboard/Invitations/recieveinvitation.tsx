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
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQuery } from 'react-query';
import { recievedInvitationsQuery } from '../../../react-query/queries/recievedInvitationQuery';
import { deleteInvitation } from '../../../react-query/mutations/deleteInvitation';
import { acceptInvitation } from '../../../react-query/mutations/acceptInvitation';

const ReceivedInvitation: React.FC = ({}) => {
  const deleteMutation = useMutation(deleteInvitation, {
    onSuccess: () => {
      refetch();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const acceptMutation = useMutation(acceptInvitation, {
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

  const handleAccept = (id: string) => {
    acceptMutation.mutate(id);
  };
  const { data, isLoading, error, refetch } = useQuery(
    'recievedInvitation',
    recievedInvitationsQuery
  );

  if (isLoading) return <h1>Loading</h1>;
  return (
    <>
      <List>
        {data &&
          data.map((invitation) => {
            if (Boolean(invitation))
              return (
                <ListItem key={invitation._id}>
                  <ListItemAvatar>
                    <Avatar alt='Remy Sharp' src={invitation.senderProfile} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={invitation.senderName}
                    secondary={invitation.senderEmail}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title='Accept Invitation'>
                      <IconButton
                        color='primary'
                        aria-label='Check'
                        onClick={() => {
                          //accept invitation
                          handleAccept(invitation._id);
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                    &nbsp;&nbsp;
                    <Tooltip title='Reject Invitation'>
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
            else return null;
          })}
      </List>
    </>
  );
};

export default ReceivedInvitation;
