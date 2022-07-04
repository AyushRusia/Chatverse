import { NextPage } from 'next';
import { useQuery, useQueryClient } from 'react-query';
import { viewerQuery } from '../../react-query/queries/viewerQuery';

const Dashoboard: NextPage = () => {
  const { data, isLoading, error } = useQuery('user', viewerQuery);
  console.log('friends', data);
  return (
    <>
      <h1> My Friends</h1>
    </>
  );
};

export default Dashoboard;
