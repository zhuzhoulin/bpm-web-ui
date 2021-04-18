// translate router.meta.title, be used in breadcrumb sidebar tagsview
// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  var hasKey = this.$te('route.' + title)
  var lowHasKey = false
  if (!hasKey) {
    lowHasKey = this.$te('route.' + title.charAt(0).toLowerCase() + title.slice(1))
  }
  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title)
    return translatedTitle
  }
  if (lowHasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title.charAt(0).toLowerCase() + title.slice(1))
    return translatedTitle
  }
  return title
}

