let userInput = document.getElementById("toDoInput")
let form = document.getElementById("form")
let toDoContainer = document.getElementById("toDoContainer")

let toDoArray = []
let editingSignal = -1

form.addEventListener("submit",collectToDo)
function collectToDo(event){
event.preventDefault()

let userToDo = userInput.value

if(userToDo.length === 0){
    alert("Add a To-do Item")
}else if(editingSignal >= 0){
    toDoArray = toDoArray.map(function(item,index){
        if(editingSignal === index){
            return{
                toDoItemEntered : userToDo ,
                completed : item.completed
            }
        }else{
            return{
                toDoItemEntered : item.toDoItemEntered ,
                completed : item.completed
            }
        }
    })

}
else{
    const toDoObjectLiteral = {
        toDoItemEntered : userToDo ,
        completed : false
        
    }
    toDoArray.push(toDoObjectLiteral)
    
}
localStorage.setItem("userToDo", JSON.stringify(toDoArray))
form.reset()
fetchToDoItems()
showTodosOnUI()
}

function fetchToDoItems(){
    if(localStorage.getItem("userToDo")){
        JSON.parse(localStorage.getItem("userToDo"))
    }
    showTodosOnUI
}
fetchToDoItems()

function showTodosOnUI(){
    toDoContainer.innerHTML = ''
    toDoArray.forEach(function(item,index){
        toDoPrinted = item.toDoItemEntered

        let toDoItemDiv = document.createElement('div')
        toDoItemDiv.classList.add('toDoItem')
        toDoItemDiv.setAttribute('id',`${index}`)

        let leftSideDiv = document.createElement('div')
        leftSideDiv.classList.add('leftSide')

        let rightSideDiv = document.createElement('div')
        rightSideDiv.classList.add('rightSide')

        let checkedIcon = document.createElement('i')
        checkedIcon.classList.add('fa-solid','fa-circle-check')
        checkedIcon.setAttribute('data-action','check')
        checkedIcon.style.color = '#888888'
        checkedIcon.style.cursor = 'pointer'
        checkedIcon.setAttribute('title','Unheck')
        
        let uncheckedIcon = document.createElement('i')
        uncheckedIcon.classList.add('fa-regular','fa-circle')
        uncheckedIcon.setAttribute('data-action','check')
        uncheckedIcon.style.color = '#888888'
        uncheckedIcon.style.cursor = 'pointer'
        uncheckedIcon.setAttribute('title','Check')

        let editIcon = document.createElement('i')
        editIcon.classList.add('fa-solid','fa-pen')
        editIcon.setAttribute('data-action','edit')
        editIcon.style.color = '#888888'
        editIcon.style.cursor = 'pointer'
        editIcon.setAttribute('title','Edit')
        
        let deleteIcon = document.createElement('i')
        deleteIcon.classList.add('fa-solid','fa-trash')
        deleteIcon.setAttribute('data-action','delete')
        deleteIcon.style.color = '#888888'
        deleteIcon.style.cursor = 'pointer'
        deleteIcon.setAttribute('title','Delete')
        

        let toDoText = document.createElement('p')
        toDoText.textContent = toDoPrinted
        toDoText.setAttribute('data-action','check')
        toDoText.style.color = 'white'


       
        

        if(!item.completed){
            leftSideDiv.append(uncheckedIcon,toDoText)
            rightSideDiv.append(editIcon,deleteIcon)
            toDoItemDiv.append(leftSideDiv,rightSideDiv)
            toDoContainer.append(toDoItemDiv)
        }else{
            leftSideDiv.append(checkedIcon,toDoText)
            rightSideDiv.append(editIcon,deleteIcon)
            toDoItemDiv.append(leftSideDiv,rightSideDiv)
            toDoContainer.append(toDoItemDiv)
        }
    })
}

toDoContainer.addEventListener("click", targetToDo)
function targetToDo(event){
let targetOfUser = event.target
let grandParentElement = targetOfUser.parentElement.parentElement
if(!grandParentElement.classList.contains('toDoItem')) return



let toDoId = Number(grandParentElement.id)
let clickedAction = targetOfUser.dataset.action
console.log(clickedAction)


if(clickedAction === "check"){
    checkAToDo(toDoId)
}else if(clickedAction === "edit"){
    editAToDo(toDoId)
}else if(clickedAction === "delete"){
    deleteAToDo(toDoId)
}

}

function checkAToDo(ID){
    toDoArray = toDoArray.map(function(item, index){
        if(ID === index){
            return{
                toDoItemEntered : item.toDoItemEntered ,
                completed : !item.completed
            }
        }else{
            return{
                toDoItemEntered : item.toDoItemEntered ,
                completed : item.completed
            }
        }
    })
    showTodosOnUI()
}

function editAToDo(ID){
    userInput.value = toDoArray[ID].toDoItemEntered
    editingSignal = ID
}

function deleteAToDo(ID){

toDoArray.forEach(function(item,index){
    if(index === ID){
        toDoArray.splice(index,1)
    }
})
   showTodosOnUI()
}