export function color (index, opacity = 1.0) {
  return CHART_COLORS[index % CHART_COLORS.length].replace('1.0', opacity.toFixed(4))
}

export const CHART_COLORS = [
  'rgb(255, 99, 132, 1.0)',
  'rgb(255, 159, 64, 1.0)',
  'rgb(255, 205, 86, 1.0)',
  'rgb(75, 192, 192, 1.0)',
  'rgb(54, 162, 235, 1.0)',
  'rgb(153, 102, 255, 1.0)',
  'rgb(201, 203, 207, 1.0)'
]
