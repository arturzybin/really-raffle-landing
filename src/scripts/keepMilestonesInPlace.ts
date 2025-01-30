import { getMilestonesPosition } from './getMilestonesPosition'

export function keepMilestonesInPlace() {
  setMilestonesPosition()

  window.addEventListener('resize', setMilestonesPosition)
}

function setMilestonesPosition() {
  const milestone1 = document.getElementById('milestone-1')!
  const milestone2 = document.getElementById('milestone-2')!

  const position = getMilestonesPosition()

  milestone1.style.left = `${position.first.x}px`
  milestone1.style.top = `${position.first.y}px`

  milestone2.style.left = `${position.second.x}px`
  milestone2.style.top = `${position.second.y}px`
}
