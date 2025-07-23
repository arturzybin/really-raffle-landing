export function showStarsAnimation() {
  const mainElement = document.getElementById('main')!

  const player = document.createElement('lottie-player')

  player.setAttribute('src', '/really-treasure-chinajoy/lottie/stars.json')
  player.setAttribute('autoplay', '')

  player.classList.add('stars-player')

  mainElement.append(player)

  setTimeout(() => player.remove(), 2000)
}
