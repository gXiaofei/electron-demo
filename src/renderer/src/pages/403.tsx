import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoAuthPage: React.FC = () => (
    <Result
        status="403"
        title="4033"
        subTitle="抱歉，你无权访问该页面"
        extra={
            <Button type="primary" onClick={() => history.push('/home')}>
                返回首页
            </Button>
        }
    />
);

export default NoAuthPage;
