import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { Button, message, Image, Typography, Spin, SelectProps } from 'antd';

import ButtonWrapper from '../../components/ButtonWrapper';
import { RegisterContainer, FormPaper } from './styles';
import { getCities, requestNewUserRegister } from '../../actions/register';
import { IAgent, ICity } from '../../type';
import { RANDOM_USER_API } from '../../config';

const Register: FC = () => {

  const [photoUrl, setPhotoUrl] = useState('');
  const [cityOptions, setCityOptions] = useState<SelectProps['options']>([]);
  const [photoPending, setPhotoPending] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [list, setList] = useState([]);
  const [pending, setPending] = useState(false);
  const [selected, setSelected] = useState<string | Array<string>>([]);

  useEffect(() => {
    setCityOptions(list.map((city: ICity) => ({ value: city.name, label: city.name })));
  }, [list]);

  const generateAutoLink = () => {
    setPhotoPending(true);
    fetch(RANDOM_USER_API)
      .then(response => {
        response.json().then((result) => {
          setPhotoPending(false);
          setPhotoUrl(result.results[0].picture.medium);
        });
      })
      .catch(err => {
        setPhotoPending(false);
        console.log('fetch error from https://randomuser.me', err);
      });
  };

  const onSubmit = (values: IAgent) => {
    if (!values.aboutMe) values.aboutMe = '';
    if (!values.photoUrl) values.photoUrl = '';
    if (!values.practiceAreas) values.practiceAreas = [];
    setPending(true);
    requestNewUserRegister({
      ...values,
      photoUrl: photoUrl,
      practiceAreas: selected as string[]
    })
      .then(() => {
        openMessage().then(() => { navigate('/'); });
      });
  };

  const openMessage = async () => {
    await messageApi.open({
      type: 'success',
      key: 'updatable',
      content:
        'Your information is successfully registered in our database.',
      icon: <SmileOutlined rev style={{ color: '#108ee9' }} />,
      duration: 2
    });
  };

  const hanldeSelectChange = (value: string | string[]) => {
    setSelected(value);
  }

  const handleDropdownOpened = () => {
    getCities()
      .then(list => {
        setList(list);
      })
      .catch(async (err) => {
        console.log(err);
        await messageApi.open({
          type: 'error',
          key: 'updatable',
          content:
            'An error has been occured while fetching city names.',
          duration: 3
        });
      });
  };

  return (
    <>
      {contextHolder}
      <RegisterContainer>
        <ButtonWrapper />
        <Typography.Title>Please fill out with your information</Typography.Title>
        <FormPaper>
          <Form
            title={`Dont't miss to join the amazing team!`}
            scrollToFirstError
            style={{ minWidth: '40%', textAlign: 'center', width: '60%' }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            onFinish={onSubmit}
          >
            <Form.Item name='firstName' label='First Name' rules={[{ required: true, message: 'First Name is required!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name='lastName' label='Last Name' rules={[{ required: true, message: 'Last Name is required!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name='photoUrl' label='Photo'>
              {
                photoPending ? <Spin size='large' style={{ margin: '5px' }} /> : photoUrl && <Image src={photoUrl} alt='photo for avatar' />
              }
              <Button onClick={generateAutoLink}>New photo!</Button>
            </Form.Item>
            <Form.Item name='agentLicence' label='Agent Licence' rules={[{ required: true, message: 'The agent licence is required!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name='address' label='Address' rules={[{ required: true, message: 'The address is required!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name='practiceAreas' label='Practice Areas'>
              <Select
                mode='multiple'
                defaultValue={[]}
                placeholder='Please select the relevant areas'
                options={cityOptions}
                onChange={hanldeSelectChange}
                allowClear
                onDropdownVisibleChange={handleDropdownOpened}
              />
            </Form.Item>
            <Form.Item name='aboutMe' label='About Me'>
              <Input.TextArea maxLength={1000} rows={5} />
            </Form.Item>
            <Button type='primary' htmlType='submit' loading={pending}>Submit</Button>
          </Form>
        </FormPaper>
      </RegisterContainer >
    </>
  );
};

export default Register;