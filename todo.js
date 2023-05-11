// task model
// {
//   id: number,
//   title: string,
//   isCompleted: boolean,
//   createdAt: DateTime
// }

const tasksList = [];

let isEditable = false;
let activeId = -1;
let taskId = 0;

const userInput = document.getElementById("user-input");

const keyPressListener = (event) => {
  if (event.key === "Enter") {
    // add task
    const { value } = document.getElementById("user-input");

    if (!isEditable) {
      addTask(value);
    } else {
      updateText(value);
    }
  }
};

// adding an event listener
document.addEventListener("keypress", keyPressListener);

const addTask = (taskText) => {
  // create an object for the new task
  // id: ++tasksList[tasksList.length - 1].id,
  const obj = {
    id: ++taskId,
    title: taskText,
    isCompleted: false,
    createdAt: new Date().toLocaleDateString(),
  };
  // push to tasklist array
  tasksList.push(obj);
  const currentId = obj.id;

  // create a new list item (li)
  const taskItem = document.createElement("li")

  // taskItem.classList.add("task-item")
  taskItem.className = "task-item"; 
  taskItem.id = `item_${currentId}`;

  // inner text set
  taskItem.innerHTML = `<div class="checkbox" onclick="markAsComplete(${currentId})"></div>
    <span>${obj.title}</span>
    <button id="edit_${currentId}" onclick="updateTask(${currentId})">Edit</button>
    <button onclick="deleteTask(${currentId})">Delete</button>`;
1
  // acces list (ul)
  const list = document.querySelector(".tasks-list");

  // append the new li to existing ul
  list.appendChild(taskItem);

  resetInputField();
};

const updateTask = (id) => {
  const currentTask = tasksList.find((t) => t.id === id);

  userInput.value = currentTask.title;
  isEditable = true;
  activeId = id;
};

// values modification in terms of UI
const updateText = (taskText) => {
  const currentTask = tasksList.find((t) => t.id === activeId);

  currentTask.title = taskText;

  const activeSpan = document.querySelector(`#item_${activeId} span`);

  activeSpan.innerText = taskText;

  isEditable = false;

  resetInputField();
};

const resetInputField = () => {
  // clearInputField
  userInput.value = "";
};

// mark as complete functionality

const markAsComplete = (id) => {
  const currentTask = tasksList.find((t) => t.id === id);

  // const currentState = currentTask.isCompleted
  currentTask.isCompleted = !currentTask.isCompleted; 

  const currentTaskItem = document.querySelector(`#item_${id}`);
  currentTaskItem.classList.toggle("completed");

  // 1.get desired list item

/*   const activeCheckbox = document.querySelector(`#item_${id} .checkbox`);

  activeCheckbox.classList.toggle("checkbox-filled"); */

};

const deleteTask = (id) => {
  const index = tasksList.findIndex((t) => t.id === id);

  tasksList.splice(index, 1);

  const currentTaskItem = document.querySelector(`#item_${id}`);
  currentTaskItem.remove();
};
