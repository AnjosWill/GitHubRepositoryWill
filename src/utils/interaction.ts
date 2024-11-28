export const updateCampaignStatus = (campaigns, campaignId, newStatus) => {
  const campaignIndex = campaigns.findIndex((c) => c.id === campaignId)
  if (campaignIndex !== -1) {
    campaigns[campaignIndex].currentStatus = newStatus
  }
  return campaigns
}

export const simulateGetPaymentEarly = (campaigns, campaignId, fee, updateBalance) => {
  // Find and update campaign status to "Available Soon"
  campaigns = updateCampaignStatus(campaigns, campaignId, 'Available Soon')

  // Wait for 10 seconds before updating to "Available to Cash-out"
  setTimeout(() => {
    campaigns = updateCampaignStatus(campaigns, campaignId, 'Available to Cash-out')
    updateBalance(campaigns[campaignId].amount + fee)
  }, 10000)

  return campaigns
}
