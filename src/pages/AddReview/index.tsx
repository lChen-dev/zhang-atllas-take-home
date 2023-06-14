import { useState } from 'react';
import type { FC } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Input, Form, message, Button } from 'antd';

import { IReview } from '../../type';
import {
  MainContainer,
  ActionSector
} from './styles';
import { addReview } from '../../actions/detail';

const AddReview: FC = () => {

  const { agent_id } = useParams();
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pending, setPending] = useState(false);

  const onSubmit = (values: IReview) => {
    if (agent_id) {
      setPending(true);
      addReview({ ...values, agentId: agent_id[1] })
        .then(() => {
          openMessage(true).then(() => { navigate(-1); });
        })
        .catch((err) => {
          openMessage(false).then();
        });
    }
  };

  const openMessage = async (isSuccess: boolean) => {
    if (isSuccess) {
      await messageApi.open({
        type: 'success',
        key: 'updatable',
        content:
          'Your review is successfully added to our database.',
        icon: <SmileOutlined rev style={{ color: '#108ee9' }} />,
        duration: 2
      });
    } else {
      await messageApi.open({
        type: 'error',
        key: 'updatable',
        content:
          'I am sorry to let you know that an error has been occurred. Please try again.',
        icon: <SmileOutlined rev style={{ color: '#108ee9' }} />,
        duration: 2
      });
    }

  };

  const handleBack = () => {
    if (title || content) {
      setIsModalOpened(true);
    } else {
      navigate(-1);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
      {contextHolder}
      <MainContainer>
        <Form
          scrollToFirstError
          style={{ minWidth: '40%', textAlign: 'center', width: '70%', border: '1px solid lightgrey', padding: '30px' }}
          labelCol={{ span: 6 }}
          onFinish={onSubmit}
        >
          <Form.Item name='title' label='Title' rules={[{ required: true, message: 'First Name is required!' }]}>
            <Input onChange={handleTitleChange} />
          </Form.Item>
          <Form.Item name='content' label='Content' rules={[{ required: true, message: 'Last Name is required!' }]}>
            <Input.TextArea rows={20} onChange={handleContentChange} />
          </Form.Item>
          <ActionSector>
            <Button type='primary' onClick={handleBack} danger>Cancel</Button>
            <Button type='primary' htmlType='submit' loading={pending}>Submit</Button>
          </ActionSector>
        </Form>
        <Modal
          title="Are you sure?"
          open={isModalOpened}
          onOk={() => { navigate(`/detail/${agent_id}`) }}
          onCancel={() => { setIsModalOpened(false) }}
        >
          <p>Are you sure to remove the current draft?</p>
        </Modal>
      </MainContainer>
    </>
  );
};

export default AddReview;