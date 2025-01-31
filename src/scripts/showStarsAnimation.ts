import { getMilestonesPosition } from './getMilestonesPosition'

export function showStarsAnimation() {
  const mainElement = document.getElementById('main')!
  const milestonePosition = getMilestonesPosition().first

  const player = document.createElement('lottie-player')

  player.setAttribute('src', '/really-raffle-landing/lottie/stars.json')
  player.setAttribute('autoplay', '')

  player.classList.add('stars-player')
  player.style.height = `${(milestonePosition.y * 1.05) / 2}px`
  player.style.left = `${milestonePosition.x}px`

  mainElement.append(player)
}
