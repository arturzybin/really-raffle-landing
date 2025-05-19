import { showStarsAnimation } from './showStarsAnimation'

export function startEngine() {
  const avatar = document.getElementById('avatar')!
  avatar.classList.add('avatar_position_1')

  const firstMilestone = document.getElementById('milestone-1')!
  firstMilestone.classList.add('milestone_active')
  firstMilestone.addEventListener('click', openFirstPopup)

  const header = document.getElementById('header')!
  header.classList.add('header_active')
  header.addEventListener('click', openFirstPopup)
}

function openFirstPopup() {
  const firstMilestone = document.getElementById('milestone-1')!
  firstMilestone.removeEventListener('click', openFirstPopup)

  const header = document.getElementById('header')!
  header.classList.remove('header_active')
  header.removeEventListener('click', openFirstPopup)

  const firstPopup = document.getElementById('popup-1')!
  firstPopup.classList.add('popup_visible')

  handleFirstForm()
}

function handleFirstForm() {
  const popup = document.getElementById('popup-1')!
  const form = document.getElementById('form-1') as HTMLFormElement
  const formError = document.getElementById('form-1-error')!

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const answer = formData.get('Answer') as string

    if (!answer) {
      formError.innerHTML = 'Please complete the form before submitting'
      return
    }

    if (!/^\d+$/.test(answer)) {
      formError.innerHTML = 'Please enter only numbers for your coin guess'
      return
    }

    formError.innerHTML = ''
    popup.classList.remove('popup_visible')

    goToSecondMilestone(answer)
  })
}

function goToSecondMilestone(answer: string) {
  const headerText = document.getElementById('header-text')!
  const headerStarsFirst = document.getElementById('header-stars-first')!
  const headerStarsSecond = document.getElementById('header-stars-second')!
  const firstMilestone = document.getElementById('milestone-1')!
  const secondMilestone = document.getElementById('milestone-2')!
  const avatar = document.getElementById('avatar')!

  showStarsAnimation()
  firstMilestone.classList.remove('milestone_active')
  firstMilestone.classList.add('milestone_done')

  setTimeout(() => {
    avatar.classList.add('avatar_position_switching')
  }, 1000)

  setTimeout(() => {
    avatar.classList.remove('avatar_position_switching')
    avatar.classList.add('avatar_position_2')

    secondMilestone.classList.add('milestone_active')

    headerText.innerHTML = '<span class="header__text-yellow-accent">Challenge 2:</span> Enter your details'
    headerStarsFirst.style.display = 'none'
    headerStarsSecond.style.display = 'block'

    setupSecondPopupOpening(answer)
  }, 2000)
}

function setupSecondPopupOpening(answer: string) {
  const timeoutId = setTimeout(() => {
    secondMilestone.removeEventListener('click', openPopupAndCancelTimeout)

    header.removeEventListener('click', openPopupAndCancelTimeout)
    header.classList.remove('header_active')

    openSecondPopup(answer)
  }, 2000)

  const openPopupAndCancelTimeout = () => {
    clearTimeout(timeoutId)

    secondMilestone.removeEventListener('click', openPopupAndCancelTimeout)

    header.removeEventListener('click', openPopupAndCancelTimeout)
    header.classList.remove('header_active')

    openSecondPopup(answer)
  }

  const secondMilestone = document.getElementById('milestone-2')!
  secondMilestone.addEventListener('click', openPopupAndCancelTimeout)

  const header = document.getElementById('header')!
  header.classList.add('header_active')
  header.addEventListener('click', openPopupAndCancelTimeout)
}

function openSecondPopup(answer: string) {
  const secondPopup = document.getElementById('popup-2')!
  secondPopup.classList.add('popup_visible')

  handleSecondForm(answer)
}

function handleSecondForm(answer: string) {
  const secondMilestone = document.getElementById('milestone-2')!
  const popup = document.getElementById('popup-2')!
  const form = document.getElementById('form-2') as HTMLFormElement
  const formError = document.getElementById('form-2-error')!

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    if (['Full Name', 'Company', 'Job Title', 'Work Email'].some((key) => !formData.get(key))) {
      formError.innerHTML = 'Please complete the form before submitting'
      return
    }

    if (
      !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(
        formData.get('Work Email') as string,
      )
    ) {
      formError.innerHTML = 'Please enter a valid email address'
      return
    }

    formData.set('Answer', answer)

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

        secondMilestone.classList.remove('milestone_active')
        secondMilestone.classList.add('milestone_done')

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

function openThirdPopup() {
  const thirdPopup = document.getElementById('popup-3')!
  thirdPopup.classList.add('popup_visible')

  handleThirdForm()
}

function handleThirdForm() {
  const popup = document.getElementById('popup-3')!
  const form = document.getElementById('form-3') as HTMLFormElement

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    popup.classList.remove('popup_visible')
  })
}
