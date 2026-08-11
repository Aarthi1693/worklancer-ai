export type SubmissionStatus =
	| "Assigned"
	| "Draft"
	| "Submitted"
	| "Approved"
	| "Rejected"
	| "Revision Required"
	| string;

export type TaskType = "DIGITAL" | "ON_FIELD";

export interface SubmissionTask {
	id: string;
	title: string;
	provider: string;
	dueDate: string;
	status: SubmissionStatus;
	files: number;
	taskType: TaskType;
	applicationId: string;
	submissionId?: string;
}

export interface SubmissionDetail {
	id: string;
	status: string;
	description?: string;
	feedback?: string;
	reviewedAt?: string;
	reviewedBy?: string;
	approvedAt?: string;
	githubLink?: string;
	deploymentLink?: string;
	reportFile?: string;
	createdAt?: string;
	application?: {
		user?: {
			name?: string;
			email?: string;
		};
		project?: {
			title?: string;
			taskType?: string;
			budget?: number;
			status?: string;
		};
	};
}

export interface SubmissionFormData {
	submissionTitle?: string;
	description?: string;
	workSummary?: string;
	github?: string;
	demoUrl?: string;
	driveLink?: string;
	version?: string;
	completion?: number | string;
	hoursWorked?: string;
	visitDate?: string;
	startTime?: string;
	endTime?: string;
	location?: string;
	expense?: string;
	signature?: string;
	notes?: string;
	files?: File[];
	fileUrls?: string[];
}
