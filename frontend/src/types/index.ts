export interface User {
  id: number;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface Standup {
  id: number;
  user_id: number;
  email?: string;           // dari JOIN di admin view
  raw_input: string;
  generated_report: string;
  standup_date: string;     // format: YYYY-MM-DD
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
}