export interface Campaign {
  id: number
  title: string
  brand: string
  amount: number
  currentStatus: string
  paymentDate: string
  logo: string
  altText: string
}

export interface Filters {
  searchQuery: string
  statuses: string[]
}

export interface State {
  campaigns: Campaign[]
  availableBalance: number
  filters: Filters
}
