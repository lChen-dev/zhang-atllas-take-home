import axios from 'axios';
import { IReview } from '../type';

export const fetchUserData = async (agentId: string) => {
  try {
    const response = await axios.get(`/agent`, {
      params: {
        id: agentId
      }
    });
    if (response) {
      const { agent, reviews } = response.data;
      return ({
        agent: {
          ...agent,
          practiceAreas: agent.practiceAreas.split(',')
        },
        reviews: reviews
      });
    }

  } catch (err) {
    console.log(err);
  };
};

export const addReview = async (reviewInfo: IReview) => {
  try {
    const response = await axios.post(`/add-review`, reviewInfo)
    if (response) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  };
};