export const JobStatus = {
  QUOTED: 'QUOTED',
  SCHEDULED: 'SCHEDULED',
  INSTALLED: 'INSTALLED',
  COMPLETED: 'COMPLETED',
} as const;

export const ComponentType = {
  RAMP: 'RAMP',
  LANDING: 'LANDING',
} as const;

export const ComponentStatus = {
  AVAILABLE: 'AVAILABLE',
  RESERVED: 'RESERVED',
  INSTALLED: 'INSTALLED',
  MAINTENANCE: 'MAINTENANCE',
} as const;

export const ComponentLocation = {
  WAREHOUSE: 'Warehouse',
  JOB_SITE: 'Job Site',
} as const;

export type JobStatus = typeof JobStatus[keyof typeof JobStatus];
export type ComponentType = typeof ComponentType[keyof typeof ComponentType];
export type ComponentStatus = typeof ComponentStatus[keyof typeof ComponentStatus];
export type ComponentLocation = typeof ComponentLocation[keyof typeof ComponentLocation];