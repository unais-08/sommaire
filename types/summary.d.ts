export interface SummaryType {
  id: string;
  user_id?: string; // Optional, as it may not be needed in the frontend
  title: string;
  summary_text: string;
  file_name: string;
  original_file_url: string; // Optional, as it may not be needed in the frontend
  status: string;
  created_at: string;
  updated_at?: string;
}

export type GetSummaryByIdResult =
  | { success: true; data: SummaryType }
  | { success: false; message: string; data: null };

export interface SummaryDetailPageProps {
  summary: SummaryType;
}
