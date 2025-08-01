const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const completeList = document.querySelector('.list-task')

let myListItens = []

function addNewTask() {

  const task = input.value.trim()
  const errorMsg = document.querySelector('.msg-erro')

  if (task === '') {

    errorMsg.textContent = 'Por favor, digite uma tarefa'
    errorMsg.classList.add('visible')

    setTimeout(() =>{
      errorMsg.classList.remove('visible')
    },3000)
    
    return;
  }

  errorMsg.textContent = ''
  errorMsg.classList.remove('visible')

  myListItens.push({
    tarefa: input.value,
    concluida: false
  })

  input.value = ''

  showTask()
}

function showTask() {

  let newLi = ''

  myListItens.forEach((item, position) => {


    newLi = newLi +
      `
    <li class="task ${item.concluida && "done"}">
        <img src="./img/checked.png" alt="" id="img-task" onclick="completeTask(${position})">
        <p>${item.tarefa}</p>
        <img src="./img/trash.png" alt="" id="img-task" onclick="deleteItem(${position})">
      </li>
    `


  });

  completeList.innerHTML = newLi

  localStorage.setItem('lista', JSON.stringify(myListItens))   /*tranformar meu objeto em string*/
}

function completeTask(position) {
  myListItens[position].concluida = !myListItens[position].concluida
  showTask()
}

function deleteItem(position) {

  myListItens.splice(position, 1)
  showTask()
}


window.completeTask = function (position) {
  myListItens[position].concluida = !myListItens[position].concluida
  showTask()
}

window.deleteItem = function (position) {
  myListItens.splice(position, 1)
  showTask()
}

function manterList() {
  const taskLocalStorage = localStorage.getItem('lista')


  if (taskLocalStorage) {
    myListItens = JSON.parse(taskLocalStorage) /*transformar em objetivo denovo pra manter na tela*/
  }


  showTask()

}

button.addEventListener('click', addNewTask)

manterList()