window.addEventListener('DOMContentLoaded', (event) => {
    const input = document.querySelector('input');
    const ul = document.querySelector('ul');

    // Load tasks from localStorage on page load
    loadTasks();

    if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../service-worker.js').then(() => {
      console.log('Service Worker registered!');
    }).catch(err => {
      console.error('Service Worker registration failed:', err);
    });
  });
}


    document.addEventListener('click', function (event) {
        switch (event.target.id) {
            case 'add':
                addTask();
                break;
            case 'delete':
                deleteTask(event);
        }
    });

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (input.value.trim() !== "") {
                addTask();
            }
        }
    });

    

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            createTaskElement(task);
        });
    }

    function addTask() {
        const inputValue = input.value.trim();
        if (inputValue !== "") {
            createTaskElement(inputValue);
            saveTaskToLocalStorage(inputValue);
            input.value = "";
            input.focus();
        }
    }

    function createTaskElement(task) {
        const li = document.createElement("li");
        const deleteTaskButton = document.createElement("button");

        li.innerText = task;
        deleteTaskButton.innerHTML = "Remove";
        deleteTaskButton.id = "delete";
        li.appendChild(deleteTaskButton);

        ul.appendChild(li);
    }

    function deleteTask(event) {
        if (event.target.id === 'delete') {
            const removeLi = event.target.parentElement;
            const taskText = removeLi.innerText.replace("Remove", "").trim();
            removeTask(removeLi);
            removeTaskFromLocalStorage(taskText);
            input.focus();
        }
    }

    function removeTask(taskElement) {
        ul.removeChild(taskElement);
    }

    function saveTaskToLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
