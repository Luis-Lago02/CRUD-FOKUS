const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('textarea');
const ulTasks = document.querySelector('.app__section-task-list');
const btnCancel = document.querySelector('.app__form-footer__button--cancel');
const paragraphTask = document.querySelector('.app__section-active-task-description');
const btnRemovesCompletedTasks = document.querySelector('#btn-remover-concluidas');
const btnRemoveAllTasks = document.querySelector('#btn-remover-todas');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let taskSelected = null;
let liTaskSelected = null;


const updateTask = () => {
     localStorage.setItem('tasks', JSON.stringify(tasks));
}

const closedForm = () => {
     textArea.value = '';
     formAddTask.classList.toggle('hidden');
}

const addTask = (task) => {
     const li = document.createElement('li');
     li.classList.add('app__section-task-list-item');

     const svg = document.createElement('svg');
     svg.innerHTML = `
     <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
          <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
     </svg>`;

     const p = document.createElement('p');
     p.classList.add('app__section-task-list-item-description');
     p.textContent = task.description;

     const button = document.createElement('button');
     button.classList.add('app_button-edit')

     button.onclick = () => {
          const newDescription = prompt('Qual será a nova tarefa?');
          console.log('Minha nova tarefa é: ', newDescription);
          if (newDescription) {
               p.textContent = newDescription;
               task.description = newDescription;
               updateTask();
          }
     }

     const img = document.createElement('img');
     img.setAttribute('src', 'imagens/edit.png');
     button.append(img);

     li.append(svg);
     li.append(p);
     li.append(button);

     if (task.completa) {
          li.classList.add('app__section-task-list-item-complete');
          button.setAttribute('disabled', 'disabled');
     } else {
          li.onclick = () => {
               document.querySelectorAll('.app__section-task-list-item-active')
                    .forEach(task => {
                         task.classList.remove('app__section-task-list-item-active');
                    });
               if (taskSelected == task) {
                    paragraphTask.textContent = '';
                    taskSelected = null;
                    liTaskSelected = null;
                    return
               };
               taskSelected = task;
               liTaskSelected = li;
               paragraphTask.textContent = task.description;
               li.classList.add('app__section-task-list-item-active');
          }
     }

     return li;
}

btnAddTask.addEventListener('click', () => {
     formAddTask.classList.toggle('hidden');
});

btnCancel.addEventListener('click', closedForm);

formAddTask.addEventListener('submit', (event) => {
     event.preventDefault();
     const task = {
          description: textArea.value
     };
     tasks.push(task);
     const elementTask = addTask(task);
     ulTasks.append(elementTask);
     updateTask();
     textArea.value = '';
     formAddTask.classList.add('hidden');
});

tasks.forEach(task => {
     const elementTaksCreated = addTask(task);
     ulTasks.append(elementTaksCreated);
});

document.addEventListener('focusFinished', () => {
     if (taskSelected && liTaskSelected) {
          liTaskSelected.classList.remove('app__section-task-list-item-active');
          liTaskSelected.classList.add('app__section-task-list-item-complete');
          liTaskSelected.querySelector('button').setAttribute('disabled', 'disabled');
          taskSelected.completa = true;
          updateTask();
     }
});

const removeTasks = (onlyComplete) => {
     const selector = onlyComplete ? ".app__section-task-list-item-complete" : ".app__section-task-list-item";
     document.querySelectorAll(selector).forEach(element => {
          element.remove();
     });

     tasks = onlyComplete ? tasks.filter(task => !task.completa) : [];
     updateTask();
}

btnRemovesCompletedTasks.onclick = () => removeTasks(true);
btnRemoveAllTasks.onclick = () => removeTasks(false);


