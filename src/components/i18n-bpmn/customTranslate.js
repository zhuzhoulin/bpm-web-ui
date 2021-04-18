import translations from './translations/zn'
// eslint-disable-next-line node/no-deprecated-api
import { isNullOrUndefined } from 'util'
export default function customTranslate(template, replacements) {
  // eslint-disable-next-line no-param-reassign
  replacements = replacements || {}
  // eslint-disable-next-line no-param-reassign
  template = translations[template] || template
  return template.replace(/{([^}]+)}/g, function(_, key) {
    var str = replacements[key]
    if (!isNullOrUndefined(translations[replacements[key]])) {
      str = translations[replacements[key]]
    }
    return str || '{' + key + '}'
  })
}
