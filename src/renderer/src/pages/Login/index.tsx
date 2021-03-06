import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
    LoginForm,
    ProFormCaptcha,
    ProFormText,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/icon.png';
import styles from './index.less';

const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => {
    return (
        <Alert
            style={{
                marginBottom: 24,
            }}
            message={content}
            type="error"
            showIcon
        />
    );
};

type UserLoginState = {
    loginType?: string;
    status?: string;
};

const Login: React.FC = () => {
    const [userLoginState, setLoginState] = useState<UserLoginState>({});
    const [type, setType] = useState<string>('account');

    useEffect(() => {
        setLoginState({});
    }, [type]);

    const handleSubmit = (values: API.LoginParams) => {
        console.log(values);
        const { username, password, mobile, captcha } = values;

        if (type === 'account') {
            if (!(username === 'root' && password === 'password')) {
                setLoginState({
                    status: 'error',
                    loginType: type,
                });
                return;
            }
        } else if (captcha !== '1234') {
            setLoginState({
                status: 'error',
                loginType: type,
            });
            return;
        }

        window.electron.ipcRenderer.sendMessage('login', [true]);

        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/home');
    };

    const { status, loginType } = userLoginState;
    return (
        <div className={styles.container}>
            <div className={styles.drag} />
            <div className={styles.loginBox}>
                <LoginForm
                    logo={logo}
                    title="??????????????????"
                    subTitle="????????????????????????????????????????????????????????????????????????"
                    onFinish={async (values) => {
                        await handleSubmit(values as API.LoginParams);
                    }}
                >
                    <Tabs activeKey={type} onChange={setType}>
                        <Tabs.TabPane key="account" tab="??????????????????" />
                        <Tabs.TabPane key="mobile" tab="???????????????" />
                    </Tabs>

                    {status === 'error' && loginType === 'account' && (
                        <LoginMessage content="?????????????????????" />
                    )}
                    {type === 'account' && (
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: (
                                        <UserOutlined
                                            className={styles.prefixIcon}
                                        />
                                    ),
                                }}
                                placeholder="??????????????????: root"
                                rules={[
                                    {
                                        required: true,
                                        message: '??????????????????!',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: (
                                        <LockOutlined
                                            className={styles.prefixIcon}
                                        />
                                    ),
                                }}
                                placeholder="???????????????: password"
                                rules={[
                                    {
                                        required: true,
                                        message: '??????????????????',
                                    },
                                ]}
                            />
                        </>
                    )}

                    {status === 'error' && loginType === 'mobile' && (
                        <LoginMessage content="???????????????" />
                    )}
                    {type === 'mobile' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: (
                                        <MobileOutlined
                                            className={styles.prefixIcon}
                                        />
                                    ),
                                }}
                                name="mobile"
                                placeholder="??????????????????"
                                rules={[
                                    {
                                        required: true,
                                        message: '?????????????????????',
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: '????????????????????????',
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: (
                                        <LockOutlined
                                            className={styles.prefixIcon}
                                        />
                                    ),
                                }}
                                phoneName="mobile"
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder="??????????????????"
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} ???????????????`;
                                    }
                                    return '???????????????';
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: '?????????????????????',
                                    },
                                ]}
                                onGetCaptcha={async (phone) => {
                                    // const result = await getFakeCaptcha({
                                    //     phone,
                                    // });
                                    // if (result === false) {
                                    //     return;
                                    // }
                                    message.success(
                                        '???????????????????????????????????????1234',
                                    );
                                }}
                            />
                        </>
                    )}
                </LoginForm>
            </div>
        </div>
    );
};

export default Login;
