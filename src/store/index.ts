import { createStore } from 'vuex'
import { State, Campaign, Filters } from '@/types/store'
import { CAMPAIGN_STATUSES } from '@/config/constants'

export default createStore<State>({
  state: {
    campaigns: [
      {
        id: 1,
        title: 'Fall Launch',
        brand: 'Autumn Bliss',
        amount: 500,
        currentStatus: CAMPAIGN_STATUSES.APPROVED,
        paymentDate: 'December 9, 2024',
        logo: '/images/autumn-bliss.PNG',
        altText: 'Autumn Bliss Logo',
      },
      {
        id: 2,
        title: 'Summer Collection 2024',
        brand: 'Summer Glow',
        amount: 800,
        currentStatus: CAMPAIGN_STATUSES.APPROVED,
        paymentDate: 'January 15, 2025',
        logo: '/images/summer-glow.PNG',
        altText: 'Summer Glow Logo',
      },
      {
        id: 3,
        title: 'Holiday Campaign',
        brand: 'Festiva',
        amount: 1200,
        currentStatus: CAMPAIGN_STATUSES.AVAILABLE_FOR_CASHOUT,
        paymentDate: 'November 25, 2024',
        logo: '/images/festiva.PNG',
        altText: 'Festiva Logo',
      },
      {
        id: 4,
        title: 'Summer Series',
        brand: 'Lume Atelier',
        amount: 700,
        currentStatus: CAMPAIGN_STATUSES.AVAILABLE_SOON,
        paymentDate: 'December 20, 2024',
        logo: '/images/lume-atelier.PNG',
        altText: 'Lume Atelier Logo',
      },
      {
        id: 5,
        title: 'Completed Series',
        brand: 'EverTrend Co.',
        amount: 900,
        currentStatus: CAMPAIGN_STATUSES.COMPLETED,
        paymentDate: 'November 13, 2024',
        logo: '/images/ever-trend.PNG',
        altText: 'EverTrend Co. Logo',
      },
    ],
    availableBalance: 0,
    filters: {
      searchQuery: '',
      statuses: [],
    },
  },
  mutations: {
    setCampaigns(state, campaigns: Campaign[]) {
      state.campaigns = campaigns
    },
    updateCampaignStatus(state, { id, status, total }) {
      const campaignIndex = state.campaigns.findIndex((c) => c.id === id)
      if (campaignIndex !== -1) {
        const updatedCampaign = {
          ...state.campaigns[campaignIndex],
          currentStatus: status,
          ...(total && { amount: total }),
        }
        state.campaigns.splice(campaignIndex, 1, updatedCampaign)
      }
    },
    addToAvailableBalance(state, amount) {
      state.availableBalance += amount
    },
    resetAvailableBalance(state) {
      state.availableBalance = 0
    },
    setFilters(state, filters: Filters) {
      state.filters = filters
    },
  },
  actions: {
    fetchCampaigns({ commit }) {
      commit('setCampaigns', this.state.campaigns)
    },
    updateCampaign({ commit }, { id, status }: { id: number; status: string }) {
      commit('updateCampaignStatus', { id, status })
    },
    cashOut({ commit, state }) {
      const completedCampaigns = state.campaigns.map((campaign) => {
        if (campaign.currentStatus === CAMPAIGN_STATUSES.AVAILABLE_FOR_CASHOUT) {
          campaign.currentStatus = CAMPAIGN_STATUSES.COMPLETED
        }
        return campaign
      })
      commit('setCampaigns', completedCampaigns)
      commit('resetAvailableBalance')
    },
  },
  getters: {
    totalAvailableForCashOut(state) {
      return state.campaigns
        .filter((campaign) => campaign.currentStatus === CAMPAIGN_STATUSES.AVAILABLE_FOR_CASHOUT)
        .reduce((sum, campaign) => sum + campaign.amount, 0)
    },
    filteredCampaigns(state) {
      const { searchQuery, statuses } = state.filters

      const hasActiveFilters = statuses.length > 0

      return state.campaigns.filter((campaign) => {
        const matchesSearch =
          !searchQuery ||
          campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (campaign.brand && campaign.brand.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesStatus = !hasActiveFilters || statuses.includes(campaign.currentStatus)

        return matchesSearch && matchesStatus
      })
    },
    eligibleCampaigns(state) {
      const campaigns = state.campaigns.filter(
        (campaign) => campaign.currentStatus === CAMPAIGN_STATUSES.APPROVED
      )
      return campaigns
    },
    pendingCampaigns(state) {
      const campaigns = state.campaigns.filter(
        (campaign) =>
          campaign.currentStatus === CAMPAIGN_STATUSES.PENDING_APPROVAL ||
          campaign.currentStatus === CAMPAIGN_STATUSES.AVAILABLE_SOON ||
          campaign.currentStatus === CAMPAIGN_STATUSES.AVAILABLE_FOR_CASHOUT
      )
      return campaigns
    },
    completedCampaigns(state) {
      const campaigns = state.campaigns.filter(
        (campaign) => campaign.currentStatus === CAMPAIGN_STATUSES.COMPLETED
      )
      return campaigns
    },
  },
})
