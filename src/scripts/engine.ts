import { setAvatarPosition } from './avatarPosition'
import { showStarsAnimation } from './showStarsAnimation'

export function startEngine() {
  const startButton = document.getElementById('start-button')!
  const firstMilestone = document.getElementById('milestone-1')!

  firstMilestone.classList.add('milestone_active')

  startButton.addEventListener('click', openFirstPopup)
  firstMilestone.addEventListener('click', openFirstPopup)
}

function openFirstPopup() {
  const firstMilestone = document.getElementById('milestone-1')!
  firstMilestone.removeEventListener('click', openFirstPopup)

  const startButton = document.getElementById('start-button')!
  startButton.removeEventListener('click', openFirstPopup)
  startButton.remove()

  const firstPopup = document.getElementById('popup-1')!
  firstPopup.classList.add('popup_visible')

  handleFirstForm()
}

function handleFirstForm() {
  const popup = document.getElementById('popup-1')!
  const form = document.getElementById('popup-1-form') as HTMLFormElement
  const formError = document.getElementById('form-1-error')!

  form?.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    if (['Full Name', 'Company', 'Job Title', 'Email'].some((key) => !formData.get(key))) {
      formError.innerHTML = 'Please fill out all the fields'
      return
    }

    formData.set('Form ID', '1')

    formError.innerHTML = ''
    popup.classList.add('popup_loading')

    fetch(
      'https://script.google.com/macros/s/AKfycby0zLMJeUtlcOQy14SMzQJRdJEM68LvgzjWOcoqInhVr1RJ-HaJZONXEbQGM4V8tpWbIw/exec',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result !== 'success') {
          formError.innerHTML = 'Something went wrong :(<br />Please try again'
          return
        }

        formError.innerHTML = ''
        popup.classList.remove('popup_visible')
        goToSecondMilestone(formData)
      })
      .catch(() => {
        formError.innerHTML = 'Something went wrong :(<br />Please try again'
      })
      .finally(() => {
        popup.classList.remove('popup_loading')
      })
  })
}

function goToSecondMilestone(firstFormData: FormData) {
  const firstMilestone = document.getElementById('milestone-1')!
  const secondMilestone = document.getElementById('milestone-2')!

  showStarsAnimation()
  firstMilestone.classList.remove('milestone_active')

  setTimeout(() => {
    firstMilestone.classList.add('milestone_done')
    setAvatarPosition('switching')
  }, 1000)

  setTimeout(() => {
    setAvatarPosition('milestone2')
    secondMilestone.classList.add('milestone_active')
  }, 2000)

  setTimeout(() => {
    openSecondPopup(firstFormData)
  }, 4000)
}

function openSecondPopup(firstFormData: FormData) {
  const secondPopup = document.getElementById('popup-2')!
  secondPopup.classList.add('popup_visible')

  handleSecondForm(firstFormData)
}

function handleSecondForm(firstFormData: FormData) {
  const popup = document.getElementById('popup-2')!
  const form = document.getElementById('popup-2-form') as HTMLFormElement
  const formError = document.getElementById('form-2-error')!

  form?.addEventListener('submit', (e) => {
    e.preventDefault()

    const secondFormData = new FormData(form)

    if (!secondFormData.get('Answer')) {
      formError.innerHTML = 'Please fill out all the fields'
      return
    }

    const formData = firstFormData
    formData.set('Form ID', '2')
    formData.set('Answer', secondFormData.get('Answer')!)

    formError.innerHTML = ''
    popup.classList.add('popup_loading')

    fetch(
      'https://script.google.com/macros/s/AKfycby0zLMJeUtlcOQy14SMzQJRdJEM68LvgzjWOcoqInhVr1RJ-HaJZONXEbQGM4V8tpWbIw/exec',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result !== 'success') {
          formError.innerHTML = 'Something went wrong :(<br />Please try again'
          return
        }

        formError.innerHTML = ''
        popup.classList.remove('popup_visible')
        openThirdPopup()
      })
      .catch(() => {
        formError.innerHTML = 'Something went wrong :(<br />Please try again'
      })
      .finally(() => {
        popup.classList.remove('popup_loading')
      })
  })
}

function openThirdPopup() {}
