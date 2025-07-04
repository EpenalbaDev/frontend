// Ejemplos de uso de los servicios API
// Este archivo muestra cómo usar los diferentes servicios

import {
  authService,
  usersService,
  clientsService,
  projectsService,
  tasksService,
  timeEntriesService,
  reportsService,
  dashboardService
} from './index';

// ============================================================================
// EJEMPLOS DE AUTENTICACIÓN
// ============================================================================

export async function authExamples() {
  try {
    // Login
    const token = await authService.login({
      username: 'admin@example.com',
      password: 'password123'
    });
    console.log('Login successful:', token);

    // Get current user
    const currentUser = await authService.getCurrentUser();
    console.log('Current user:', currentUser);

    // Check if authenticated
    const isAuth = authService.isAuthenticated();
    console.log('Is authenticated:', isAuth);

  } catch (error) {
    console.error('Auth error:', error);
  }
}

// ============================================================================
// EJEMPLOS DE USUARIOS
// ============================================================================

export async function usersExamples() {
  try {
    // Get users with pagination and filters
    const users = await usersService.getUsers(
      { page: 1, limit: 10 },
      { search: 'john', is_active: true }
    );
    console.log('Users:', users);

    // Get user by ID
    const user = await usersService.getUserById(1);
    console.log('User details:', user);

    // Create new user
    const newUser = await usersService.createUser({
      email: 'newuser@example.com',
      username: 'newuser',
      full_name: 'New User',
      password: 'password123',
      is_active: true
    });
    console.log('Created user:', newUser);

    // Get roles
    const roles = await usersService.getRoles();
    console.log('Available roles:', roles);

  } catch (error) {
    console.error('Users error:', error);
  }
}

// ============================================================================
// EJEMPLOS DE CLIENTES
// ============================================================================

export async function clientsExamples() {
  try {
    // Get clients
    const clients = await clientsService.getClients(
      { page: 1, limit: 10 },
      { search: 'company', is_active: true }
    );
    console.log('Clients:', clients);

    // Create client
    const newClient = await clientsService.createClient({
      name: 'New Company',
      email: 'contact@newcompany.com',
      phone: '+1234567890',
      address: '123 Main St, City, State',
      is_active: true
    });
    console.log('Created client:', newClient);

    // Get client projects
    const clientProjects = await clientsService.getClientProjects(1);
    console.log('Client projects:', clientProjects);

  } catch (error) {
    console.error('Clients error:', error);
  }
}

// ============================================================================
// EJEMPLOS DE PROYECTOS
// ============================================================================

export async function projectsExamples() {
  try {
    // Get projects with filters
    const projects = await projectsService.getProjects(
      { page: 1, limit: 10 },
      { client_id: 1, status_id: 2, is_active: true }
    );
    console.log('Projects:', projects);

    // Get project with details
    const project = await projectsService.getProjectById(1);
    console.log('Project details:', project);

    // Create project
    const newProject = await projectsService.createProject({
      name: 'New Project',
      description: 'Project description',
      client_id: 1,
      project_manager_id: 1,
      status_id: 1,
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      budget: 50000,
      hourly_rate: 100,
      is_active: true
    });
    console.log('Created project:', newProject);

    // Get project statuses
    const statuses = await projectsService.getProjectStatuses();
    console.log('Project statuses:', statuses);

  } catch (error) {
    console.error('Projects error:', error);
  }
}

// ============================================================================
// EJEMPLOS DE TAREAS
// ============================================================================

export async function tasksExamples() {
  try {
    // Get tasks with filters
    const tasks = await tasksService.getTasks(
      { page: 1, limit: 10 },
      { project_id: 1, status_id: 2, assigned_to: 1 }
    );
    console.log('Tasks:', tasks);

    // Get my tasks
    const myTasks = await tasksService.getMyTasks({ page: 1, limit: 10 });
    console.log('My tasks:', myTasks);

    // Create task
    const newTask = await tasksService.createTask({
      title: 'New Task',
      description: 'Task description',
      project_id: 1,
      assigned_to: 1,
      category_id: 1,
      priority_id: 2,
      status_id: 1,
      due_date: '2024-02-01',
      estimated_hours: 8,
      is_active: true
    });
    console.log('Created task:', newTask);

    // Get task with subtasks
    const taskWithSubtasks = await tasksService.getTaskWithSubtasks(1);
    console.log('Task with subtasks:', taskWithSubtasks);

    // Update task status
    await tasksService.updateTaskStatus(1, 2);
    console.log('Task status updated');

  } catch (error) {
    console.error('Tasks error:', error);
  }
}

// ============================================================================
// EJEMPLOS DE ENTRADAS DE TIEMPO
// ============================================================================

export async function timeEntriesExamples() {
  try {
    // Get time entries
    const entries = await timeEntriesService.getTimeEntries(
      { page: 1, limit: 10 },
      { project_id: 1, date_from: '2024-01-01', is_billable: true }
    );
    console.log('Time entries:', entries);

    // Start timer
    const timer = await timeEntriesService.startTimer({
      project_id: 1,
      task_id: 1,
      description: 'Working on feature implementation'
    });
    console.log('Started timer:', timer);

    // Get active timer
    const activeTimer = await timeEntriesService.getActiveTimer();
    console.log('Active timer:', activeTimer);

    // Stop timer
    if (activeTimer) {
      await timeEntriesService.stopTimer({
        end_time: '14:30',
        description: 'Completed feature implementation'
      });
      console.log('Timer stopped');
    }

    // Get time summary
    const summary = await timeEntriesService.getTimeSummary();
    console.log('Time summary:', summary);

  } catch (error) {
    console.error('Time entries error:', error);
  }
}

// ============================================================================
// EJEMPLOS DE REPORTES
// ============================================================================

export async function reportsExamples() {
  try {
    // Get dashboard metrics
    const metrics = await dashboardService.getDashboardMetrics();
    console.log('Dashboard metrics:', metrics);

    // Get time summary report
    const timeReport = await reportsService.getTimeSummaryReport(
      '2024-01-01',
      '2024-01-31',
      1, // project_id (optional)
      1  // user_id (optional)
    );
    console.log('Time summary report:', timeReport);

    // Get user productivity report
    const productivity = await reportsService.getUserProductivityReport(
      '2024-01-01',
      '2024-01-31'
    );
    console.log('User productivity report:', productivity);

    // Get project progress report
    const progress = await reportsService.getProjectProgressReport(
      '2024-01-01',
      '2024-01-31',
      1 // project_id (optional)
    );
    console.log('Project progress report:', progress);

    // Export report
    const blob = await reportsService.exportReport({
      report_type: 'time_summary',
      format: 'pdf',
      date_from: '2024-01-01',
      date_to: '2024-01-31'
    });
    console.log('Report exported:', blob);

  } catch (error) {
    console.error('Reports error:', error);
  }
}

// ============================================================================
// EJEMPLO COMPLETO DE FLUJO DE TRABAJO
// ============================================================================

export async function completeWorkflowExample() {
  try {
    // 1. Login
    await authService.login({
      username: 'admin@example.com',
      password: 'password123'
    });

    // 2. Get dashboard metrics
    const metrics = await dashboardService.getDashboardMetrics();
    console.log('Dashboard loaded:', metrics);

    // 3. Get my tasks
    const myTasks = await tasksService.getMyTasks({ page: 1, limit: 5 });
    console.log('My tasks:', myTasks);

    // 4. Start working on first task
    if (myTasks.items.length > 0) {
      const firstTask = myTasks.items[0];
      
      // Start timer
      const timer = await timeEntriesService.startTimer({
        project_id: firstTask.project_id,
        task_id: firstTask.id,
        description: `Working on: ${firstTask.title}`
      });
      console.log('Started working on task:', timer);

      // Simulate work time...
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Stop timer
      await timeEntriesService.stopTimer({
        end_time: new Date().toTimeString().slice(0, 5),
        description: `Completed work on: ${firstTask.title}`
      });
      console.log('Finished working on task');

      // Update task status
      await tasksService.updateTaskStatus(firstTask.id, 2); // In Progress
      console.log('Task status updated');
    }

    // 5. Get updated time summary
    const summary = await timeEntriesService.getTimeSummary();
    console.log('Updated time summary:', summary);

  } catch (error) {
    console.error('Workflow error:', error);
  }
}

// ============================================================================
// EJEMPLO DE MANEJO DE ERRORES
// ============================================================================

export async function errorHandlingExample() {
  try {
    // Intentar acceder a un recurso que no existe
    await usersService.getUserById(999999);
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log('User not found');
    } else if (error.response?.status === 401) {
      console.log('Unauthorized - redirecting to login');
      // Redirect to login
    } else if (error.response?.status === 403) {
      console.log('Forbidden - insufficient permissions');
    } else if (error.response?.status >= 500) {
      console.log('Server error - try again later');
    } else {
      console.log('Unexpected error:', error.message);
    }
  }
} 