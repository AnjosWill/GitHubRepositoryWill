import { ref } from 'vue'

export function useSectionToggle() {
  const expanded = ref(true)

  function toggleSection() {
    expanded.value = !expanded.value
  }

  return {
    expanded,
    toggleSection,
  }
}

export function handleButtonClick(action: string) {
  switch (action) {
    case 'cashOut':
      alert("Cash Out action triggered!");
    case 'getPaymentEarly':
      alert("Get Payment Early action triggered!");
    case 'getViewDetails':
      alert("Get View Details action triggered!");
    default:
      alert("Action not defined.");
  }
}
