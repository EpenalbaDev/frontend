// Report types
export interface TimeSummaryReport {
  period: string;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  total_hours: number;
  billable_hours: number;
  total_cost: number;
  entries_count: number;
  by_project: Array<{
    id: number;
    name: string;
    hours: number;
    billable_hours: number;
    cost: number;
  }>;
  by_user: Array<{
    id: number;
    name: string;
    hours: number;
    billable_hours: number;
    cost: number;
  }>;
}

export interface UserProductivityReport {
  user_id: number;
  user_name: string;
  total_hours: number;
  billable_hours: number;
  projects_count: number;
  tasks_completed: number;
  avg_hours_per_day: number;
  productivity_score: number;
}

export interface ProjectProgressReport {
  project_id: number;
  project_name: string;
  estimated_hours?: number;
  actual_hours: number;
  progress_percentage: number;
  budget?: number;
  actual_cost: number;
  cost_variance?: number;
  tasks_total: number;
  tasks_completed: number;
}

export interface CostAnalysisReport {
  period: string;
  total_cost: number;
  billable_cost: number;
  non_billable_cost: number;
  by_project: Array<{
    id: number;
    name: string;
    cost: number;
    hours: number;
    billable_cost: number;
  }>;
  by_client: Array<{
    id: number;
    name: string;
    cost: number;
    hours: number;
    billable_cost: number;
  }>;
  hourly_rate_avg: number;
}

export interface DashboardMetrics {
  active_projects: number;
  total_users: number;
  today_hours: number;
  week_hours: number;
  month_revenue: number;
  active_timers: number;
  recent_activities: Array<{
    id: number;
    user_name: string;
    project_name: string;
    task_name: string;
    hours: number;
    is_running: boolean;
    created_at: string; // ISO datetime string
  }>;
}

export interface ExportRequest {
  report_type: 'time_summary' | 'user_productivity' | 'project_progress' | 'cost_analysis';
  format: 'pdf' | 'excel';
  date_from: string; // ISO date string
  date_to: string; // ISO date string
  filters?: Record<string, any>;
}

// Report filter types
export interface ReportFilter {
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  project_id?: number;
  user_id?: number;
  client_id?: number;
  category_id?: number;
  status_id?: number;
  is_billable?: boolean;
}

// Report export types
export interface ReportExport {
  report_type: string;
  format: 'pdf' | 'excel' | 'csv';
  filters: ReportFilter;
  filename?: string;
}

// Report chart data types
export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesDataPoint {
  date: string; // ISO date string
  value: number;
  label?: string;
}

export interface PieChartData {
  data: ChartDataPoint[];
  title: string;
  total: number;
}

export interface BarChartData {
  data: ChartDataPoint[];
  title: string;
  xAxis: string;
  yAxis: string;
}

export interface LineChartData {
  data: TimeSeriesDataPoint[];
  title: string;
  xAxis: string;
  yAxis: string;
  series: Array<{
    name: string;
    data: number[];
    color?: string;
  }>;
}

// Report widget types
export interface ReportWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'list';
  title: string;
  data: any;
  config?: Record<string, any>;
  refresh_interval?: number; // in seconds
}

// Report dashboard
export interface ReportDashboard {
  id: string;
  name: string;
  description?: string;
  widgets: ReportWidget[];
  layout: Array<{
    widget_id: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
} 