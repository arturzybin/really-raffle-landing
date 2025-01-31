import { getMilestonesPosition } from './getMilestonesPosition'

type AvatarPosition = 'milestone1' | 'switching' | 'milestone2'
let avatarPosition: AvatarPosition = 'milestone1'

export function keepAvatarInPlace() {
  setAvatarPosition()

  window.addEventListener('resize', () => setAvatarPosition())
}

export function setAvatarPosition(newPosition?: AvatarPosition) {
  if (newPosition) {
    avatarPosition = newPosition
  }

  const avatar = document.getElementById('avatar')!

  const milestonesPosition = getMilestonesPosition()
  const root = document.documentElement

  switch (avatarPosition) {
    case 'milestone1':
      avatar.style.left = `${milestonesPosition.first.x}px`
      avatar.style.top = `${milestonesPosition.first.y}px`
      return

    case 'switching':
      root.style.setProperty('--avatar-animation-start-left', `${milestonesPosition.first.x}px`)
      root.style.setProperty('--avatar-animation-start-top', `${milestonesPosition.first.y}px`)
      root.style.setProperty('--avatar-animation-end-left', `${milestonesPosition.second.x}px`)
      root.style.setProperty('--avatar-animation-end-top', `${milestonesPosition.second.y}px`)
      avatar.classList.add('avatar_switching-milestones')
      return

    case 'milestone2':
      avatar.style.left = `${milestonesPosition.second.x}px`
      avatar.style.top = `${milestonesPosition.second.y}px`
      avatar.classList.remove('avatar_switching-milestones')
      return
  }
}
