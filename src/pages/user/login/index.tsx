import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { Dispatch, connect, useHistory } from 'umi';
import { request } from '@/core/api/useFetcher';
import { parse } from 'qs';
import { StateType } from './model';
import styles from './style.less';
import { LoginParamsType } from './service';
import LoginForm from './components/Login';

const { UserName, Password, Submit } = LoginForm;
interface LoginProps {
  dispatch: Dispatch;
  userAndlogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24
    }}
    message={content}
    type="error"
    showIcon
  />
);
function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
const Login: React.FC<LoginProps> = props => {
  const { userAndlogin = {}, submitting } = props;
  const { status, type: loginType } = userAndlogin;
  const [type, setType] = useState<string>('account');
  const history = useHistory();
  console.log('this init2');
  const handleSubmit = async (values: LoginParamsType) => {
    // const { dispatch } = props;
    const response = await request('login', {
      postData: values
    });
    if (response.status === 'ok') {
      message.success('登录成功！');
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params as { redirect: string };
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = redirect;
          return;
        }
      }
      history.replace(redirect || '/');
    }

    // dispatch({
    //   type: 'userAndlogin/login',
    //   payload: {
    //     ...values,
    //   }
    // });
  };
  console.log('11');
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        {status === 'error' && loginType === 'account' && !submitting && <LoginMessage content="账户或密码错误" />}

        <UserName
          name="userName"
          placeholder="用户名: admin or user"
          rules={[
            {
              required: true,
              message: '请输入用户名!'
            }
          ]}
        />
        <Password
          name="password"
          placeholder="密码: ant.design"
          rules={[
            {
              required: true,
              message: '请输入密码！'
            }
          ]}
        />
        <Submit loading={submitting}>登录</Submit>
      </LoginForm>
    </div>
  );
};

export default connect(
  ({
    userAndlogin,
    loading
  }: {
    userAndlogin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndlogin,
    submitting: loading.effects['userAndlogin/login']
  })
)(Login);
