import { ElNotification } from 'element-plus';

type NotificationType = 'success' | 'warning' | 'info' | 'error';

export function showNotification(type: NotificationType, message: string) {
  const title = type.charAt(0).toUpperCase() + type.slice(1);
  ElNotification({
    title,
    message,
    type,
  });
}
