const mainElement = document.getElementById('main')!

interface MilestonePositionInHeightPercents {
  xFromTheCenter: number
  yFromTheTop: number
}

const firstMilestoneRelativePosition: MilestonePositionInHeightPercents = {
  xFromTheCenter: -8.3,
  yFromTheTop: 89,
}

const secondMilestoneRelativePosition: MilestonePositionInHeightPercents = {
  xFromTheCenter: -5.5,
  yFromTheTop: 54,
}

function getMilestoneCenterInPx({ xFromTheCenter, yFromTheTop }: MilestonePositionInHeightPercents) {
  const mainWidth = mainElement.getBoundingClientRect().width
  const mainHeight = mainElement.getBoundingClientRect().height

  const xInPx = mainWidth / 2 + (mainHeight / 100) * xFromTheCenter
  const yInPx = (mainHeight / 100) * yFromTheTop

  return { x: xInPx, y: yInPx }
}

export function getMilestonesPosition() {
  return {
    first: getMilestoneCenterInPx(firstMilestoneRelativePosition),
    second: getMilestoneCenterInPx(secondMilestoneRelativePosition),
  }
}
