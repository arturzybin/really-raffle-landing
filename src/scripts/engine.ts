type Step = 'beginning' | 'popup1' | 'switchingMilestones' | 'popup2' | 'popup3'

export const appState: { step: Step } = {
  step: 'beginning',
}
