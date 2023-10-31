import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import { get } from 'lodash';
import { useState } from 'react';
import { useHistory } from 'react-router';
import ButtonLogin from 'src/components/07.buttons/ButtonLogin';
import { PATHS } from 'src/constants/paths';
import { setStorageJwtToken } from 'src/helpers/storage';
import { AuthServices } from 'src/services/auth-service';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'src/store/actions/user';

const LoginPage = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const authService = new AuthServices();
  const [messageApi, contextHolder] = message.useMessage();

  const msgLoginFailed = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg,
      className: 'login-failed-msg',
      style: {
        // marginTop: '17px',
        paddingRight: '20px !important',
        textAlign: 'right',
      },
    });
  };

  const onFinish = async () => {
    if (!username || !password) return;
    try {
      const res = await authService.login({ username, password });
      const { data } = res.data;
      const { token } = data?.auth;
      setStorageJwtToken(token);
      dispatch(setUserInfo(data));
      history.push(PATHS.upload());
    } catch (error: any) {
      setUsername('');
      setPassword('');
      if (error?.response?.status === 400) {
        msgLoginFailed('Wrong username or password');
      } else {
        msgLoginFailed(get(error, 'message', 'Login fail'));
      }

      return;
    }
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const renderLoginForm = () => {
    return (
      <>
        <Form.Item>
          <Input
            size="large"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            prefix={<UserOutlined className="color-default" />}
          />
        </Form.Item>
        <Form.Item>
          <Input
            size="large"
            value={password}
            type="password"
            onChange={handlePasswordChange}
            placeholder="Password"
            prefix={<LockOutlined className="color-default" />}
          />
        </Form.Item>
        <ButtonLogin disabled={username && password ? false : true} htmlType="submit" />
      </>
    );
  };

  return (
    <div className="login-page">
      {contextHolder}
      <div className="login-page__wrapperLogo">
        <img
          src={require('../../assets/icons/common/logo-bg-login.png')}
          alt=""
        />
      </div>
      <div className="login-page__form">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          {renderLoginForm()}
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
