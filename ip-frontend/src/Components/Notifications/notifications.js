import {notification} from 'antd';
import React from "react";
import {MehOutlined, SmileOutlined} from '@ant-design/icons';

export const NOTIFICATION_TYPES = {
    SUCCESS: 'SUCCESS',
    INFO: 'INFO',
    ERROR: 'ERROR'
};

export const openNotification = (message, description, type) => {
    if (type === NOTIFICATION_TYPES.ERROR) {
        notification.open({
            message: message,
            description:
            description,
            icon: <MehOutlined style={{color: '#63b467'}}/>,
        });
    }
    if (type === NOTIFICATION_TYPES.SUCCESS) {
        notification.open({
            message: message,
            description:
            description,
            icon: <SmileOutlined style={{color: '#63b467'}}/>,
        });
    }
    if (type === NOTIFICATION_TYPES.INFO) {
        notification.open({
            message: message,
            description:
            description,
            icon: <SmileOutlined style={{color: '#63b467'}}/>,
        });
    }
};
