export function getAccessToken() {
  return JSON.parse(localStorage.getItem('user'))?.access || ''
}
