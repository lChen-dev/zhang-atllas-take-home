import type { FC } from 'react';
import { Typography } from 'antd';

import { HeaderContainer } from './styles';

const Header: FC = () => {
  return (
    <HeaderContainer>
      <Typography.Title className='glow' level={1}>
        Welcome to Atllas-Take-Home!
      </Typography.Title>
    </HeaderContainer>
  )
}

export default Header;