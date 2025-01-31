export function startEngine() {
  const startButton = document.getElementById('start-button')!
  const firstMilestone = document.getElementById('milestone-1')!

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
    formData.set('Form ID', '1')

    if (['Full Name', 'Company', 'Job Title', 'Email'].some((key) => !formData.get(key))) {
      formError.innerHTML = 'Please fill out all the fields'
      return
    }

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
        goToSecondMilestone()
      })
      .catch(() => {
        formError.innerHTML = 'Something went wrong :(<br />Please try again'
      })
      .finally(() => {
        popup.classList.remove('popup_loading')
      })
  })
}

function goToSecondMilestone() {}
