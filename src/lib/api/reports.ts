import api from "./client";
import {
  TimeSummaryReport,
  UserProductivityReport,
  ProjectProgressReport,
  CostAnalysisReport,
  DashboardMetrics,
  ExportRequest,
  ReportFilter
} from "@/types";

// Reports service
export const reportsService = {
  // Get time summary report
  async getTimeSummaryReport(
    startDate: string,
    endDate: string,
    projectId?: number,
    userId?: number
  ): Promise<TimeSummaryReport> {
    const params = new URLSearchParams();
    params.append("start_date", startDate);
    params.append("end_date", endDate);
    if (projectId) params.append("project_id", projectId.toString());
    if (userId) params.append("user_id", userId.toString());
    
    const response = await api.get(`/reports/time-summary?${params.toString()}`);
    return response.data;
  },

  // Get user productivity report
  async getUserProductivityReport(
    startDate: string,
    endDate: string
  ): Promise<UserProductivityReport[]> {
    const params = new URLSearchParams();
    params.append("start_date", startDate);
    params.append("end_date", endDate);
    
    const response = await api.get(`/reports/user-productivity?${params.toString()}`);
    return response.data;
  },

  // Get project progress report
  async getProjectProgressReport(
    startDate?: string,
    endDate?: string,
    projectId?: number
  ): Promise<ProjectProgressReport[]> {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (projectId) params.append("project_id", projectId.toString());
    
    const response = await api.get(`/reports/project-progress?${params.toString()}`);
    return response.data;
  },

  // Get cost analysis report
  async getCostAnalysisReport(
    startDate: string,
    endDate: string
  ): Promise<CostAnalysisReport> {
    const params = new URLSearchParams();
    params.append("start_date", startDate);
    params.append("end_date", endDate);
    
    const response = await api.get(`/reports/cost-analysis?${params.toString()}`);
    return response.data;
  },

  // Export report
  async exportReport(exportRequest: ExportRequest): Promise<Blob> {
    const response = await api.post("/reports/export", exportRequest, {
      responseType: 'blob'
    });
    return response.data;
  }
};

// Dashboard service
export const dashboardService = {
  // Get dashboard metrics
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const response = await api.get("/dashboard/metrics");
    return response.data;
  }
};

// Export individual functions for convenience
export const getTimeSummaryReport = reportsService.getTimeSummaryReport;
export const getUserProductivityReport = reportsService.getUserProductivityReport;
export const getProjectProgressReport = reportsService.getProjectProgressReport;
export const getCostAnalysisReport = reportsService.getCostAnalysisReport;
export const exportReport = reportsService.exportReport;
export const getDashboardMetrics = dashboardService.getDashboardMetrics; 