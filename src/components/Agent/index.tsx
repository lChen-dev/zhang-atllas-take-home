import type { FC } from 'react';
import { Button, Tag, Avatar } from 'antd';

import type { AgentProps } from '../../type';
import {
  AvatarHolder,
  Container,
  AgentBody,
  AgentAddress,
  AgentAreas
} from './styles';

const Agent: FC<AgentProps> = ({ agent, handleViewDetail }) => (
  <Container onClick={() => { handleViewDetail(agent.id) }}>
    <AvatarHolder>
      <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        src={agent.photoUrl}
        alt={agent.firstName}
      />
      <h4>{agent.firstName + ' ' + agent.lastName}</h4>
    </AvatarHolder>
    <AgentBody>
      <div>
        {
          `${agent.aboutMe.trim()}...`
        }
      </div>
      {agent.aboutMe.length > 500 && <Button type='link'>Read more</Button>}
    </AgentBody>
    <AgentAddress>
      {agent.address}
    </AgentAddress>
    <AgentAreas>
      {
        agent.practiceAreas && agent.practiceAreas.map((cityName: string, index: number) => <Tag key={index}>{cityName}</Tag>)
      }
    </AgentAreas>
  </Container>
);

export default Agent;
