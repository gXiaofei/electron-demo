import { Notification, NotificationConstructorOptions } from 'electron';

function showNotification(options: NotificationConstructorOptions) {
    const { silent = true } = options;
    return new Notification({
        ...options,
        silent,
    }).show();
}

export default showNotification;
