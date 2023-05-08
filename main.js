const linkBot1 =  'https://api.telegram.org/bot6071165883:AAFYM-zttrPM4ees-8-pGMRl1bvfIXwKhcU/'
const linkBot2 =  'https://api.telegram.org/bot6056861148:AAHaJLe1aEOvv7mdgwZ5bFiU4EUTfE9CVAo/'

var userName = ''
var chatAllMessages = []

const renderInterface = () => {
    document.querySelector('.auth-wrapper').style.display = 'none'
    document.querySelector('.chat').style.display = 'flex'
    document.querySelector('.info > p').innerHTML = '<b>your name:</b> ' + userName
}

const auth = () => {
    const lsName = localStorage.getItem('name')
    if(lsName){
        userName = lsName
        renderInterface()
    }else{
        const butAuth = document.querySelector('#auth')
        const inputName = document.querySelector('#name')
        butAuth.onclick = () =>{
            if(inputName.value != ''){
                userName = inputName.value
                localStorage.setItem('name', userName)
                renderInterface()
            }else{
                alert('Введи имя')
            }
        }
    }
}

auth()

const sendMessage = async (message) => data = (await fetch(linkBot2 + 'sendMessage?chat_id=-1001952156038&text=' + message)).json()
const getUpdates = async () => data = (await fetch(linkBot1 + 'getUpdates')).json()

const renderChat = async () =>{
    let chatMessages = await getUpdates()
    let database
    try { database = JSON.parse(await chatMessages.result.pop().channel_post.text) }
    catch { console.log('Error') }

    if(database){
        const chat = document.querySelector('ul')
        chat.innerHTML = ''
        chatAllMessages = database
        database.forEach(message=>{
            const messageXML = message.from == userName ? `<li class="me">${message.text}</li>` : `<li class="from"><div class="sender-name"><b>${message.from}</b>:</div>${message.text}</li>`
            chat.innerHTML += messageXML
        })
    }
    // console.log(database);
}
setInterval(()=>renderChat(), 800)

const inputMsg = document.querySelector('.inputs > input')
const btnSendMsg = document.querySelector('.inputs > button')

btnSendMsg.onclick = () => {
    if(inputMsg.value.length != 0){
        chatAllMessages.push({"from": userName, "text": inputMsg.value})
        console.log(chatAllMessages);
        sendMessage(JSON.stringify(chatAllMessages))
        inputMsg.value = ''
    }else{
        alert('Введи сообщение')
    }
}
