const { log } = require("console");
const fs = require("fs");
const filePath = "./tasks.json";

const loadTask = (task) => {
  try {
    // fs.readFileSync(filePath, 'utf8'); => this gives u data buffer not a regular string 
    const databuffer = fs.readFileSync(filePath, 'utf8');
    const dataJSON = JSON.parse(databuffer.toString());
    return dataJSON;
    // fs.writeFileSync(filePath, JSON.stringify(dataJSON));
  } catch (error) {
    return [];
  }
}

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
}

const addTask = (task) => {
  const tasks = loadTask();
  tasks.push({ task });
  saveTasks(tasks);
  console.log("Task added", task)
}

const listTasks = () => {
  const tasks = loadTask();
  tasks.forEach((task,index) => console.log(`${index + 1} - ${task.task}`))
}

const removeTask = (index) => {
  const tasks = loadTask();
  if(index < 1 || index > tasks.length){
    console.log("Invalid task number. Use 'list' to see available tasks.");
    return;
  }
  const removed = tasks.splice(index - 1, 1);
  saveTasks(tasks);
  console.log(`Removed task: ${removed[0].task}`);
}


// To access cmd line arguments
const command = process.argv[2];
const argument = process.argv[3];

if(command === 'add'){
  addTask(argument)
} else if(command === 'list'){
  listTasks();
}else if(command === 'remove'){
  removeTask(parseInt(argument))
}else {
  console.log("Command not found!");
}
