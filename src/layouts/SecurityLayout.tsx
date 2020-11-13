import React, { useEffect, useState } from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect, ConnectProps } from 'umi';
import { stringify } from 'querystring';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { request } from '@/core/api/useFetcher';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
  children?: React.ReactNode
}

interface SecurityLayoutState {
  isReady: boolean;
}
const SecurityLayout = (props: SecurityLayoutProps) => {
  const { loading, currentUser, children } = props;
  const [ isReady, setIsReady ] = useState(false);
  useEffect(() => {
    setIsReady(true)
    request('fetchCurrent', {});
  }, []);
  const isLogin = currentUser && currentUser.userid;
  const queryString = stringify({
    redirect: window.location.href,
  });

  if ((!isLogin && loading) || !isReady) {
    return <PageLoading />;
  }
  if (!isLogin && window.location.pathname !== '/user/login') {
    return <Redirect to={`/user/login?${queryString}`} />;
  }
  return children;
}

export default connect(({ loading }: ConnectState) => ({
  loading: loading.models.user
}))(SecurityLayout);

// class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
//   state: SecurityLayoutState = {
//     isReady: false,
//   };

//   componentDidMount() {
//     this.setState({
//       isReady: true,
//     });
//     const { dispatch } = this.props;
//     if (dispatch) {
//       dispatch({
//         type: 'user/fetchCurrent',
//       });
//     }
//   }

//   render() {
//     const { isReady } = this.state;
//     const { children, loading, currentUser } = this.props;
//     // You can replace it to your authentication rule (such as check token exists)
//     // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
//     const isLogin = currentUser && currentUser.userid;
//     const queryString = stringify({
//       redirect: window.location.href,
//     });

//     if ((!isLogin && loading) || !isReady) {
//       return <PageLoading />;
//     }
//     if (!isLogin && window.location.pathname !== '/user/login') {
//       return <Redirect to={`/user/login?${queryString}`} />;
//     }
//     return children;
//   }
// }

// export default connect(({ user, loading }: ConnectState) => ({
//   currentUser: user.currentUser,
//   loading: loading.models.user,
// }))(SecurityLayout);
