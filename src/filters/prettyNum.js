export default function prettyNum(value) {
  value = parseFloat(value)
  return value.toLocaleString('ru')
}
