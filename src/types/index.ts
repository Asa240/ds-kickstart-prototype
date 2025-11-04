export interface AIContext {
  id: string;
  name: string;
  source: 'website' | 'manual';
  website?: string;
  description?: string;
  createdAt: Date;
}

export interface AuthConfig {
  subdomain: string;
  email: string;
  apiToken: string;
}

export interface ScheduleOption {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface ConfigurationOption {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export interface OnboardingState {
  currentStep: number;
  authConfig: AuthConfig | null;
  aiContexts: AIContext[];
  selectedContextId: string | null;
  selectedSchedules: Record<string, string>; // category -> scheduleId
  cleanupSchedule: string | null;
  randomConfigs: Record<string, boolean>;
  importProgress: {
    macros: number;
    fields: number;
    views: number;
    articles: number;
  };
}
