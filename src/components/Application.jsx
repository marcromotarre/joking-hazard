import React, { useContext } from 'react';

import Authentication from './Authentication';
import Main from './Main';
import { UserContext } from '../providers/UserProvider'

const Application = ({ loading }) => {
  const user = useContext(UserContext);
  
  if (loading) return null;

  return (
    <div>
      { user ? <Main {...user} /> : <Authentication />}
    </div>
  )
};

export default Application;
