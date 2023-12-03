import React from 'react';

import '../global.scss'

const LoadingRing = () => {
  return (
    <div className='transparent-background d-flex justify-content-center align-items-center'>
      <div className='loading-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default LoadingRing;