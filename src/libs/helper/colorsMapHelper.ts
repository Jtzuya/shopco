const colors = {
  default         : 'rgb(0 0 0 / 10%)',
  'black'         : '#000',
  'blue'          : 'rgb(0 0 255)',
  'navy_blue'     : '#00007C',
  'gray'          : '#7C7C7C',
  'grey'          : '#7C7C7C',
}

export default function colorsMapHelper(color: string) {
  color = color.toLocaleLowerCase().split(' ').join('_')
  return colors[color as keyof typeof colors] || colors.default
}