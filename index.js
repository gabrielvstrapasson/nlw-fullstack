const app = document.getElementById("app")
const users = [
  {
    email: 'test@test.com',
    phone: '999999990',
    ref: 100,
    refby: null
  },
  {
    email: 'tust@tust.com',
    phone: '9999999999',
    ref: 200,
    refBy: 200
  },
    {
    email: 'tost@tost.com',
    phone: '9999999999',
    ref: 300,
    refBy: 100
  },
]

const getUser = (userData) =>{
  return users.find((user) => {
    return user.email == userData.email
  })
}

const getTotalSubscribers = (userData) =>{
  const subs = users.filter((user) => {
    return user.refBy == userData.ref
  })
  return subs.length
}

const showInvite = (userData) => {
  app.innerHTML = `
        <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>
    <div id="stats">
      <h4>
        ${getTotalSubscribers(userData)}
      </h4>
    <p>
      Inscrições feitas
    </p>
    </div>
  `
}

const saveUser = (userData) => {
  const newUser = {
    ...userData,
    ref: Math.rond(Math.random() * 4000),
    refBy: 100
  }

  users.push(newUser)
  console.log(users)
  return newUser
}

const formAction = () => {
    const form = document.getElementById('form')
    form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const userData = {
          email: formData.get('email'),
          phone: formData.get('phone')
        }

        const user = getUser(userData)
        if (user){
          showInvite(user)
        } else {
          const newUser = saveUser(userData)
            showInvite(newUser)
        }        
    }
}

const startApp = () => {
    const content = `
    <form id="form">
        <input type="email" name="email" placeholder="E-mail" />
        <input type="text" name="phone" placeholder="Telefone"/>
        <button>
            Confirmar
        </button>
    </form>
    `

    app.innerHTML = content

    formAction()
}

startApp()

document.getElementedById("logo").onclick = () => startApp()