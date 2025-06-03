import React, { useState } from 'react';
import { Bell, X, Check, AlertTriangle, Info, CheckCircle, Trash2, Eye } from 'lucide-react';
import '../styles/AdminNotifications.css';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const AdminNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'בחינה חדשה נוצרה',
      message: 'בחינת מתמטיקה לכיתה י\' נוצרה בהצלחה ומחכה לאישור',
      type: 'info',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      priority: 'medium'
    },
    {
      id: 2,
      title: 'התראת מערכת',
      message: 'זוהתה פעילות חשודה במערכת - יש לבדוק את יומני האבטחה',
      type: 'warning',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      priority: 'high'
    },
    {
      id: 3,
      title: 'עדכון מערכת הושלם',
      message: 'עדכון גרסה 2.4.1 הותקן בהצלחה. כל המערכות פעילות כרגיל',
      type: 'success',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      title: 'דוח ציונים זמין',
      message: 'דוח ציונים שבועי מוכן לצפייה ולהורדה',
      type: 'info',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: false,
      priority: 'medium'
    },
    {
      id: 5,
      title: 'בעיה בחיבור לשרת',
      message: 'זוהתה בעיה זמנית בחיבור לשרת הנתונים - צוות הטכני טיפל בבעיה',
      type: 'error',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      read: true,
      priority: 'high'
    }
  ]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="notification-icon" />;
      case 'warning':
        return <AlertTriangle className="notification-icon" />;
      case 'error':
        return <AlertTriangle className="notification-icon" />;
      default:
        return <Info className="notification-icon" />;
    }
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `לפני ${minutes} דקות`;
    if (hours < 24) return `לפני ${hours} שעות`;
    return `לפני ${days} ימים`;
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setSelectedNotifications(prev => prev.filter(nId => nId !== id));
  };

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)));
    setSelectedNotifications([]);
  };

  const toggleSelection = (id: number) => {
    setSelectedNotifications(prev =>
      prev.includes(id) ? prev.filter(nId => nId !== id) : [...prev, id]
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  return (
    <div className="notifications-container">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="notification-bell"
      >
        <Bell className="bell-icon" />
        
        {unreadCount > 0 && (
          <div className="unread-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
        
        {/* Glow effect for unread notifications */}
        {unreadCount > 0 && (
          <div className="bell-glow" />
        )}
      </button>

      {/* Notifications Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="notifications-backdrop"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="notifications-panel">
            
            {/* Header */}
            <div className="notifications-header">
              <div className="header-top">
                <h3 className="notifications-title">
                  התראות מנהל
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="close-button"
                >
                  <X className="close-icon" />
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="filter-tabs">
                {[
                  { key: 'all' as const, label: 'הכל', count: notifications.length },
                  { key: 'unread' as const, label: 'לא נקראו', count: unreadCount },
                  { key: 'read' as const, label: 'נקראו', count: notifications.length - unreadCount }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Actions */}
              {(unreadCount > 0 || selectedNotifications.length > 0) && (
                <div className="actions-bar">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="action-button mark-read"
                    >
                      <Check className="action-icon" />
                      <span>סמן הכל כנקרא</span>
                    </button>
                  )}
                  
                  {selectedNotifications.length > 0 && (
                    <button
                      onClick={deleteSelected}
                      className="action-button delete-selected"
                    >
                      <Trash2 className="action-icon" />
                      <span>מחק נבחרים ({selectedNotifications.length})</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Notifications List */}
            <div className="notifications-list">
              {filteredNotifications.length === 0 ? (
                <div className="empty-state">
                  <Bell className="empty-icon" />
                  <p>אין התראות להצגה</p>
                </div>
              ) : (
                <div className="notifications-scroll">
                  {filteredNotifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${notification.read ? 'read' : 'unread'} 
                                  priority-${notification.priority} type-${notification.type}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="notification-content">
                        {/* Selection Checkbox */}
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={() => toggleSelection(notification.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="notification-checkbox"
                        />

                        {/* Icon */}
                        <div className={`notification-icon-wrapper type-${notification.type}`}>
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="notification-text">
                          <div className="notification-header-row">
                            <h4 className="notification-title-text">
                              {notification.title}
                            </h4>
                            
                            {/* Unread indicator */}
                            {!notification.read && (
                              <div className="unread-dot" />
                            )}
                          </div>
                          
                          <p className="notification-message">
                            {notification.message}
                          </p>
                          
                          <div className="notification-footer">
                            <span className="notification-time">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            
                            {/* Actions */}
                            <div className="notification-actions">
                              {!notification.read && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  className="notification-action-btn mark-read-btn"
                                  title="סמן כנקרא"
                                >
                                  <Eye className="action-btn-icon" />
                                </button>
                              )}
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="notification-action-btn delete-btn"
                                title="מחק התראה"
                              >
                                <Trash2 className="action-btn-icon" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover glow effect */}
                      <div className="notification-hover-glow" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {filteredNotifications.length > 0 && (
              <div className="notifications-footer">
                <button className="view-all-button">
                  הצג את כל ההתראות
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminNotifications;