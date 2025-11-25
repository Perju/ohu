function stringToColour(str) {
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour
}

function getContrastingColor(hexColor) {
  hexColor = hexColor.replace('#', '')
  // Convierte a componentes R, G, B
  const r = parseInt(hexColor.substr(0, 2), 16)
  const g = parseInt(hexColor.substr(2, 2), 16)
  const b = parseInt(hexColor.substr(4, 2), 16)
  // Calcula el "luminance" relativo
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  // Si es luminancia alta, devuelve color oscuro; si es baja, devuelve color claro
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

function invertColor(hexColor) {
  hexColor = hexColor.replace('#', '')
  const r = 255 - parseInt(hexColor.substr(0, 2), 16)
  const g = 255 - parseInt(hexColor.substr(2, 2), 16)
  const b = 255 - parseInt(hexColor.substr(4, 2), 16)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}