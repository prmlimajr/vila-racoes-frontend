import React from 'react';
import Spinner from 'react-spinkit';

const Loader = props => {
  return <Spinner name='circle' color={props.color} />;
};

export default Loader;
