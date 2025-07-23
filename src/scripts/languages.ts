let selectedLanguage: 'english' | 'second' = 'second'

const translations = [
  { isElement: true, id: 'challenge-1-title', english: 'Challenge 1:', secondLanguage: '挑战一：' },
  {
    isElement: true,
    id: 'challenge-1-text',
    english: ' Guess the number of coins in the treasure chest',
    secondLanguage: ' 猜猜宝箱里有多少金币',
  },
  { isElement: true, id: 'challenge-2-title', english: 'Challenge 2:', secondLanguage: '挑战二：' },
  { isElement: true, id: 'challenge-2-text', english: 'Enter your details', secondLanguage: '填写你的信息' },
  {
    isElement: true,
    id: 'take-a-chance',
    english: 'Take a chance to win an ',
    secondLanguage: '参与这个游戏，就有机会赢取 ',
  },
  { isElement: true, id: 'playing-this-game', english: ' playing this game', secondLanguage: ' !' },
  {
    isElement: false,
    id: 'error-complete-form',
    english: 'Please complete the form before submitting',
    secondLanguage: '请在提交前完成表格',
  },
  {
    isElement: false,
    id: 'error-coins-number',
    english: 'Please enter a valid number of coins',
    secondLanguage: '请填入金币数量',
  },
  {
    isElement: false,
    id: 'error-email',
    english: 'Please enter a valid email address',
    secondLanguage: '请填入有效邮箱',
  },
  {
    isElement: false,
    id: 'error-something-went-wrong',
    english: 'Something went wrong :(<br />Please try again',
    secondLanguage: 'ops!出了点问题 :(<br />请重新尝试',
  },
] as const

const placeholders = [
  { elementId: 'input-coins-amount', english: 'Your answer', secondLanguage: '你的回答' },
  { elementId: 'input-full-name', english: 'Full Name', secondLanguage: '姓名' },
  { elementId: 'input-company', english: 'Company', secondLanguage: '公司' },
  { elementId: 'input-job-title', english: 'Job Title', secondLanguage: '职位' },
  { elementId: 'input-email', english: 'Email', secondLanguage: '邮箱' },
] as const

const images = [
  {
    elementId: 'header-button',
    english: '/really-treasure/images/header_button.webp',
    secondLanguage: '/really-treasure/images/header_button.webp',
  },
  {
    elementId: 'popup-1-background',
    english: '/really-treasure/images/popup_1_background.webp',
    secondLanguage: '/really-treasure/images/popup_1_background.webp',
  },
  {
    elementId: 'popup-2-background',
    english: '/really-treasure/images/popup_2_background.webp',
    secondLanguage: '/really-treasure/images/popup_2_background.webp',
  },
  {
    elementId: 'popup-3-background',
    english: '/really-treasure/images/popup_3_background.webp',
    secondLanguage: '/really-treasure/images/popup_3_background.webp',
  },
] as const

function setLanguage() {
  translations.forEach((translation) => {
    if (!translation.isElement) return

    const element = document.getElementById(translation.id)
    if (!element) return

    element.innerHTML = selectedLanguage === 'english' ? translation.english : translation.secondLanguage
  })

  placeholders.forEach((placeholder) => {
    const element = document.getElementById(placeholder.elementId) as HTMLInputElement
    if (!element) return

    element.placeholder = selectedLanguage === 'english' ? placeholder.english : placeholder.secondLanguage
  })

  images.forEach((image) => {
    const element = document.getElementById(image.elementId) as HTMLImageElement
    if (!element) return

    element.src = selectedLanguage === 'english' ? image.english : image.secondLanguage
  })
}

setLanguage()

export function initializeLanguageToggle() {
  const languageToggle = document.getElementById('language-toggle') as HTMLInputElement
  if (!languageToggle) return

  languageToggle.addEventListener('change', () => {
    selectedLanguage = languageToggle.checked ? 'second' : 'english'
    setLanguage()
  })
}

export function getTranslatedText(id: (typeof translations)[number]['id']) {
  const translation = translations.find((translation) => translation.id === id)!
  return selectedLanguage === 'english' ? translation.english : translation.secondLanguage
}
