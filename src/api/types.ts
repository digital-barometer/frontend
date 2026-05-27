export interface Topic {
  id: string;
  name: string;
  slug: string;
  keywords: string[];
  is_active: boolean;
}

export interface Source {
  id: string;
  name: string;
  source_type: string;
  base_url: string | null;
  is_active: boolean;
}

export interface TopicCreateRequest {
  name: string;
  keywords: string[];
}

export interface TopicUpdateRequest {
  keywords: string[];
}

export interface AnalysisRunRequest {
  topic_id: string;
  date_from: string;
  date_to: string;
  source_ids: string[];
}

export interface AnalysisMetrics {
  total_texts: number;
  positive_count: number;
  neutral_count: number;
  negative_count: number;
  unknown_count: number;
  joy_count: number;
  irritation_count: number;
  fear_count: number;
  trust_count: number;
  surprise_count: number;
  anger_count: number;
  sentiment_score: string | number | null;
  barometer_value: string | number | null;
  barometer_label: string | null;
  summary_short: string | null;
  summary_detailed: string | null;
}

export interface SourceResult {
  source_id: string;
  source_name: string;
  status: string;
  items_found: number;
  items_saved: number;
  metrics: Record<string, unknown>;
  error_message: string | null;
}

export interface Mention {
  id: string;
  source_id: string;
  source_name: string;
  title: string | null;
  text: string | null;
  url: string | null;
  published_at: string | null;
  views: number | null;
  likes: number | null;
  comments: number | null;
  reposts: number | null;
  rating: string | number | null;
  sentiment: string | null;
}

export interface TrendPoint {
  source_id: string;
  source_name: string;
  metric_at: string;
  keyword: string | null;
  region: string | null;
  value: string | number;
  scale: string | null;
  metrics: Record<string, unknown>;
}

export interface AnalysisRun {
  id: string;
  topic: Topic;
  status: string;
  date_from: string;
  date_to: string;
  error_message: string | null;
  metrics: AnalysisMetrics | null;
  source_results: SourceResult[];
  mentions: Mention[];
  trend_points: TrendPoint[];
}

export interface DailyMentionPoint {
  date: string;
  mentions_count: number;
  views_sum: number;
  likes_sum: number;
  comments_sum: number;
  reposts_sum: number;
  positive: number;
  neutral: number;
  negative: number;
  mixed: number;
  unknown: number;
}

export interface SentimentPoint {
  sentiment: string;
  count: number;
}

export interface EmotionPoint {
  emotion: string;
  label: string;
  count: number;
  percent: number;
}

export interface ChartData {
  trend_points: TrendPoint[];
  mentions_by_day: DailyMentionPoint[];
  sentiment: SentimentPoint[];
  emotions: EmotionPoint[];
}
