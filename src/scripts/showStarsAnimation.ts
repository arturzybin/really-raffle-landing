export function showStarsAnimation() {
  const mainElement = document.getElementById('main')!

  const player = document.createElement('lottie-player')

  player.setAttribute('src', 'https://ply.cdn.persona.ly/really-treasure-chinajoy/chinajoy_cdn/stars.json')
  player.setAttribute('autoplay', '')

  player.classList.add('stars-player')

  mainElement.append(player)

  setTimeout(() => player.remove(), 2000)
}
