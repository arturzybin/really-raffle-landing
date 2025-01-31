import { appState } from './engine'
import { getMilestonesPosition } from './getMilestonesPosition'

export function keepAvatarInPlace() {
  setAvatarPosition()

  window.addEventListener('resize', setAvatarPosition)
}

function setAvatarPosition() {
  const avatar = document.getElementById('avatar')!

  const step = appState.step
  const milestonesPosition = getMilestonesPosition()
  const root = document.documentElement

  switch (step) {
    case 'beginning':
    case 'popup1':
      avatar.style.left = `${milestonesPosition.first.x}px`
      avatar.style.top = `${milestonesPosition.first.y}px`
      return

    case 'switchingMilestones':
      root.style.setProperty('--avatar-animation-start-left', `${milestonesPosition.first.x}px`)
      root.style.setProperty('--avatar-animation-start-top', `${milestonesPosition.first.y}px`)
      root.style.setProperty('--avatar-animation-end-left', `${milestonesPosition.second.x}px`)
      root.style.setProperty('--avatar-animation-end-top', `${milestonesPosition.second.y}px`)
      avatar.classList.add('avatar_switching-milestones')
      return

    case 'popup2':
    case 'popup3':
      avatar.style.left = `${milestonesPosition.second.x}px`
      avatar.style.top = `${milestonesPosition.second.y}px`
      avatar.classList.remove('avatar_switching-milestones')
      return
  }
}
