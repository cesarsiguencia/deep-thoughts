import React from 'react';

// the query filters from queries.js
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList'; //will generate our thoughts components

const Home = () => {
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_THOUGHTS);
    // loading shows it is async, it will show that the request isn't done yet, when it is finished, the information returned will be shoreed in data

    const thoughts = data?.thoughts || [];
    // this is optional chaining/ data won't exist until it is created after the request, so add the ? above. 
    console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>{
          loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )
        }</div>
      </div>
    </main>
  );
};

export default Home;
