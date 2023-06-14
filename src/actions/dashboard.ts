import axios from 'axios';

import type { IAgent } from '../type';

export const fetchInitialData = async () => {
  try {
    const response = await axios.get("/agents");
    const agents: Array<IAgent> = response.data.map((agentData: any) => ({
      ...agentData,
      practiceAreas: agentData.practiceAreas.split(',')
    }));
    return agents;
  } catch (err) {
    console.log(err);
  };
};