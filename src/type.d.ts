export interface IReview {
  id: string;
  agentId: string;
  title: string;
  content: string;
}

export interface ICity {
  id: Number;
  name: string;
};

export interface IAgent {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  agentLicence: string;
  address: string;
  practiceAreas: Array<string>;
  aboutMe: string;
};

type AgentProps = {
  agent: IAgent;
  handleViewDetail: (id: string) => void;
};
