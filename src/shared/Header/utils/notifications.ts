export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
}

// For now, return empty notifications since we removed mock data
export const getNotifications = (): Notification[] => {
  return [];
};

export const markAsRead = (id: string): void => {
  // Implementation for marking notifications as read
  // This would typically interact with your backend
  console.log(`Marking notification ${id} as read`);
};

export const markAllAsRead = (): void => {
  // Implementation for marking all notifications as read
  console.log('Marking all notifications as read');
};