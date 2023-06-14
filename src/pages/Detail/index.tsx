import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Descriptions, Image, Tag, Typography, List, Button, Skeleton } from 'antd';

import { fetchUserData } from '../../actions/detail';
import ButtonWrapper from '../../components/ButtonWrapper';
import { IAgent, IReview } from '../../type';
import {
  DetailContainer,
  InformationPad,
  PhotoHolder,
  DetailSector,
  AddressSector,
  ReviewContainer,
  ReviewCard,
  AboutContainer
} from './styles';

const Detail: FC = () => {

  const { agent_id } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState({} as IAgent);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewModalOpened, setViewModalOpened] = useState(false);
  const [currentReview, setCurrentReview] = useState<IReview>({} as IReview);

  useEffect(() => {
    setLoading(!!!agent.id);
  }, [agent])

  useEffect(() => {
    if (agent_id) {
      const agentId = agent_id.charAt(1);
      fetchUserData(agentId)
        .then(result => {
          const {
            id,
            firstName,
            lastName,
            photoUrl,
            agentLicence,
            address,
            practiceAreas,
            aboutMe
          } = result?.agent;
          setAgent({
            id,
            firstName,
            lastName,
            photoUrl,
            agentLicence,
            address,
            practiceAreas,
            aboutMe
          });
          setReviews(result?.reviews);
        });
    } else {
      navigate(-1);
    };
  }, [agent_id]);

  const handleOpenReview = (index: string) => {
    setCurrentReview(reviews.filter(review => review.id === index)[0]);
    setViewModalOpened(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpened(false);
  };

  const hanldeAddingReview = () => {
    navigate(`/add-review/:${agent.id}`)
  };

  return (
    <DetailContainer>
      <ButtonWrapper />
      <InformationPad>
        <DetailSector>
          <Skeleton loading={loading} active avatar round>
            <PhotoHolder>
              <Image src={agent.photoUrl} alt={agent.firstName} width={300} height={300} />
            </PhotoHolder>
            <AddressSector>
              <Typography.Title>{`${agent.firstName} ${agent.lastName}`}</Typography.Title>
              <Descriptions
                bordered
                title="Information"
                layout="vertical"
                column={2}
              >
                <Descriptions.Item label="Agent Licence">{agent.agentLicence}</Descriptions.Item>
                <Descriptions.Item label="Address">{agent.address}</Descriptions.Item>
                <Descriptions.Item label="Practice Areas">
                  {
                    agent.practiceAreas && agent.practiceAreas.map(city => <Tag>{city}</Tag>)
                  }
                </Descriptions.Item>
              </Descriptions>
            </AddressSector>
          </Skeleton>
        </DetailSector>
        <AboutContainer>
          <h2>About</h2>
          <p>{agent.aboutMe}</p>
        </AboutContainer>
        <ReviewContainer>
          <h2>Reviews</h2>
          <List
            dataSource={reviews}
            bordered
            renderItem={item => (
              <List.Item onClick={() => { handleOpenReview(item.id) }}>
                <ReviewCard>
                  <h5>{item.title}</h5>
                  <p>{item.content}</p>
                </ReviewCard>
              </List.Item>
            )}
          />
          <Button onClick={hanldeAddingReview} style={{marginTop: '30px'}} type='primary'>Add</Button>
        </ReviewContainer>
      </InformationPad>
      <Modal
        title={<h2 style={{ textAlign: 'center' }}>{currentReview.title}</h2>}
        open={viewModalOpened}
        onCancel={handleCloseViewModal}
        closable
        footer={null}
      >
        <p style={{ fontSize: '1.2em' }}>{currentReview.content}</p>
      </Modal>
    </DetailContainer>
  );
};

export default Detail;