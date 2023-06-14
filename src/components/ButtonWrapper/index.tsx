import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

import { MainContainer } from './styles';

const ButtonWrapper: FC = () => {
  return (
    <MainContainer>
      <Tooltip title='Click to go back to dashboard page'>
        <Link to='/'><Button type='dashed' size='large' icon={<RollbackOutlined rev />}>Back to dashboard</Button></Link>
      </Tooltip>
    </MainContainer>
  );
};

export default ButtonWrapper;