import type { FC } from 'react';

import ProgressGif from '../../assets/icons/loading.gif';

const Loading: FC = () => (
  <div style={{ 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }}>
    <img src={ProgressGif} alt={`Please wait, it's loading`} width={80} height={80} />
  </div>
);


export default Loading;