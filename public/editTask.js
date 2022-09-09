const params = window.location.search
const id = new URLSearchParams(params).get("id");
const taskIdDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompleteDOM = document.querySelector(".task-edit-completed");

console.log(id);

const showTask = async () => {
    try {
        const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
        const { _id, completed, name } = task;
        taskIdDOM.textContent = _id;
        taskNameDOM.value = name;
        if (completed) {
            taskCompleteDOM.checked = true;
        }

    } catch (err) {
        console.log(err);
    }
}

showTask();

//タスクの編集
editFormDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompleteDOM.checked;

        const { data: task } = await axios.patch(`/api/v1/tasks/${id}`,
            {
                name: taskName,
                completed: taskCompleted
            });
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "編集完了";
        formAlertDOM.classList.add("text-success");
        
    } catch (err) {
        console.log(err);
    }

    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});

//完了未完了