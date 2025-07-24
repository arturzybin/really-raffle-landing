let selectedLanguage: 'english' | 'second' = 'second'

interface ElementTranslation {
  elementId: string
  english: string
  secondLanguage: string
}

interface TextTranslation {
  id: string
  english: string
  secondLanguage: string
}

const texts = [
  {
    id: 'error-complete-form',
    english: 'Please complete the form before submitting',
    secondLanguage: '请在提交前完成表格',
  },
  {
    id: 'error-coins-number',
    english: 'Please enter a valid number of coins',
    secondLanguage: '请填入金币数量',
  },
  {
    id: 'error-email',
    english: 'Please enter a valid email address',
    secondLanguage: '请填入有效邮箱',
  },
  {
    id: 'error-something-went-wrong',
    english: 'Something went wrong :(<br />Please try again',
    secondLanguage: 'ops!出了点问题 :(<br />请重新尝试',
  },
] as const satisfies TextTranslation[]

const elements = [
  { elementId: 'challenge-1-title', english: 'Challenge 1:', secondLanguage: '挑战一：' },
  {
    elementId: 'challenge-1-text',
    english: ' Guess the number of coins in the treasure chest',
    secondLanguage: ' 猜猜宝箱里有多少金币',
  },
  { elementId: 'challenge-2-title', english: 'Challenge 2:', secondLanguage: '挑战二：' },
  { elementId: 'challenge-2-text', english: 'Enter your details', secondLanguage: '填写你的信息' },
  {
    elementId: 'take-a-chance',
    english: 'Take a chance to win an ',
    secondLanguage: '参与这个游戏，就有机会赢取 ',
  },
  { elementId: 'playing-this-game', english: ' playing this game', secondLanguage: ' !' },
] as const satisfies ElementTranslation[]

const placeholders = [
  { elementId: 'input-coins-amount', english: 'Your answer', secondLanguage: '你的回答' },
  { elementId: 'input-full-name', english: 'Full Name', secondLanguage: '姓名' },
  { elementId: 'input-company', english: 'Company', secondLanguage: '公司' },
  { elementId: 'input-job-title', english: 'Job Title', secondLanguage: '职位' },
  { elementId: 'input-wechat', english: 'WeChat', secondLanguage: '微信' },
  { elementId: 'input-email', english: 'Email', secondLanguage: '邮箱' },
] as const satisfies ElementTranslation[]

const images = [
  {
    elementId: 'header-button',
    english: '/really-treasure-chinajoy/images/header_button_en.webp',
    secondLanguage: '/really-treasure-chinajoy/images/header_button_zn.webp',
  },
  {
    elementId: 'popup-1-background',
    english: '/really-treasure-chinajoy/images/popup_1_background_en.webp',
    secondLanguage: '/really-treasure-chinajoy/images/popup_1_background_zn.webp',
  },
  {
    elementId: 'popup-2-background',
    english: '/really-treasure-chinajoy/images/popup_2_background_en.webp',
    secondLanguage: '/really-treasure-chinajoy/images/popup_2_background_zn.webp',
  },
  {
    elementId: 'popup-3-background',
    english: '/really-treasure-chinajoy/images/popup_3_background_en.webp',
    secondLanguage: '/really-treasure-chinajoy/images/popup_3_background_zn.webp',
  },
] as const satisfies ElementTranslation[]

function applyCurrentLanguage() {
  const root = document.querySelector(':root') as HTMLElement
  root.style.setProperty('--font-family', selectedLanguage === 'english' ? 'Lilita One' : 'ZCOOL KuaiLe')
  root.style.setProperty('--font-family-form-inputs', selectedLanguage === 'english' ? 'Lilita One' : 'Noto Sans TC')

  elements.forEach((config) => {
    const element = document.getElementById(config.elementId)
    if (!element) return

    element.innerHTML = selectedLanguage === 'english' ? config.english : config.secondLanguage
  })

  placeholders.forEach((config) => {
    const element = document.getElementById(config.elementId) as HTMLInputElement
    if (!element) return

    element.placeholder = selectedLanguage === 'english' ? config.english : config.secondLanguage
  })

  images.forEach((config) => {
    const element = document.getElementById(config.elementId) as HTMLImageElement
    if (!element) return

    element.src = selectedLanguage === 'english' ? config.english : config.secondLanguage
  })
}

applyCurrentLanguage()

export function initializeLanguageToggle() {
  const languageToggle = document.getElementById('language-toggle') as HTMLInputElement
  if (!languageToggle) return

  languageToggle.addEventListener('change', () => {
    selectedLanguage = languageToggle.checked ? 'second' : 'english'
    applyCurrentLanguage()
  })
}

export function getTranslatedText(id: (typeof texts)[number]['id'] | (typeof elements)[number]['elementId']) {
  const translation = texts.find((config) => config.id === id) || elements.find((config) => config.elementId === id)
  return (selectedLanguage === 'english' ? translation?.english : translation?.secondLanguage) ?? ''
}
