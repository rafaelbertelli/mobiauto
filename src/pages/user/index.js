import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Container } from '@styles/style';

const User = () => {
  const [redirect, setRedirect] = useState(false);

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <div className="wrapper">
        <h1>I am an user</h1>
        <button onClick={() => setRedirect(true)}>goBack</button>
      </div>
    </Container>
  );
};

export default User;
