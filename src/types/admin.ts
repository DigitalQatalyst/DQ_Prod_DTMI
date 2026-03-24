// Admin User Management Types
export type UserRole = 'super_admin' | 'admin' | 'content_editor' | 'content_creator' | 'viewer';

export interface AdminUser {
  id: string;
  auth_user_id?: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  department?: string;
  avatar_url?: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface RolePermission {
  id: number;
  role: UserRole;
  resource: string;
  action: string;
  can_perform: boolean;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id?: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// Form & Lead Management Types
export type FormType = 'consultation' | 'demo_request' | 'service_request' | 'tour_request' | 'contact' | 'other';
export type FormStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'closed' | 'spam';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface FormSubmission {
  id: string;
  form_type: FormType;
  status: FormStatus;
  priority: Priority;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  company?: string;
  job_title?: string;
  form_data: Record<string, any>;
  lead_score: number;
  lead_source?: string;
  assigned_to?: string;
  assigned_at?: string;
  followed_up_at?: string;
  next_follow_up?: string;
  notes?: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  created_at: string;
  updated_at: string;
}

export interface FormSubmissionNote {
  id: string;
  submission_id: string;
  user_id?: string;
  note: string;
  created_at: string;
  user?: AdminUser;
}

// Communication & Notifications Types
export type EmailCategory = 'marketing' | 'system' | 'notification';
export type NotificationType = 'application' | 'submission' | 'content' | 'system';
export type EmailStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'bounced';

export interface EmailTemplate {
  id: string;
  name: string;
  slug: string;
  category: EmailCategory;
  subject: string;
  body_html: string;
  body_text?: string;
  variables?: Record<string, string>;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  read_at?: string;
  priority: Priority;
  created_at: string;
}

export interface EmailLog {
  id: string;
  template_id?: string;
  recipient_email: string;
  subject: string;
  status: EmailStatus;
  error_message?: string;
  sent_at?: string;
  delivered_at?: string;
  opened_at?: string;
  clicked_at?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

// Analytics Types
export interface ContentAnalytics {
  id: string;
  content_id: number;
  content_type: string;
  views: number;
  unique_views: number;
  time_on_page?: number;
  bounce_rate?: number;
  shares: number;
  comments: number;
  downloads: number;
  scroll_depth?: number;
  cta_clicks: number;
  date: string;
  created_at: string;
  updated_at: string;
}

// Dashboard Analytics Summary
export interface AnalyticsSummary {
  content: {
    total_views: number;
    total_posts: number;
    avg_time_on_page: number;
    top_performing: Array<{
      id: number;
      title: string;
      views: number;
      engagement_rate: number;
    }>;
  };
  leads: {
    total_submissions: number;
    qualified_leads: number;
    conversion_rate: number;
    by_form_type: Record<FormType, number>;
  };
}


