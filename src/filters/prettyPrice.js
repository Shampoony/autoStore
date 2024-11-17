export default function prettyPrice(value) {
  value = parseFloat(value)
  return value.toLocaleString('ru')
}
