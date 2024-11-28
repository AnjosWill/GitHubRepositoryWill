export const CAMPAIGN_STATUSES = {
  PENDING_APPROVAL: 'Pending Approval',
  APPROVED: 'Approved',
  AVAILABLE_SOON: 'Available Soon',
  AVAILABLE_FOR_CASHOUT: 'Available to Cash-out',
  COMPLETED: 'Completed',
} as const

export const ALL_STATUSES = Object.values(CAMPAIGN_STATUSES)
