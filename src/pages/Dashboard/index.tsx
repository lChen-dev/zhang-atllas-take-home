import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { IAgent } from '../../type';
import Agent from '../../components/Agent';
import { MainContainer, ActionPad, AgentsContainer } from './styles';
import { fetchInitialData } from '../../actions/dashboard';

const Dashboard: FC = () => {

  const navigate = useNavigate();
  const [agents, setAgents] = useState<IAgent[] | undefined>([]);

  useEffect(() => {
    fetchInitialData().then((comingAgents) => {
      setAgents(comingAgents);
    });
  }, []);

  const seeDetails = (agentId: string) => {
    navigate(`/detail/:${agentId}`);
  }

  return (
    <MainContainer>
      <AgentsContainer>
        {agents && agents.map((agent) => (
          <Agent key={agent.id} agent={agent} handleViewDetail={seeDetails} />
        ))}
      </AgentsContainer>
      <ActionPad>
        <Link to='/register'><Button type="primary" size="large">Join the team!</Button></Link>
      </ActionPad>
    </MainContainer>
  );
};

export default Dashboard;