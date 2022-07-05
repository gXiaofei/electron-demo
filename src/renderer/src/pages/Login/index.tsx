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
                    title="投行承做助手"
                    subTitle="提升承做团队的标准化作业程度、承做效率、承做质量"
                    onFinish={async (values) => {
                        await handleSubmit(values as API.LoginParams);
                    }}
                >
                    <Tabs activeKey={type} onChange={setType}>
                        <Tabs.TabPane key="account" tab="账户密码登录" />
                        <Tabs.TabPane key="mobile" tab="手机号登录" />
                    </Tabs>

                    {status === 'error' && loginType === 'account' && (
                        <LoginMessage content="账户或密码错误" />
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
                                placeholder="请输入用户名: root"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
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
                                placeholder="请输入密码: password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                            />
                        </>
                    )}

                    {status === 'error' && loginType === 'mobile' && (
                        <LoginMessage content="验证码错误" />
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
                                placeholder="请输入手机号"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号！',
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: '手机号格式错误！',
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
                                placeholder="请输入验证码"
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} 获取验证码`;
                                    }
                                    return '获取验证码';
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
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
                                        '获取验证码成功！验证码为：1234',
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
