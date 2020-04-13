import defaultSettings from '@/settings'

const title = defaultSettings.title || 'y9527'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
