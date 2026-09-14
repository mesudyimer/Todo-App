const taskbtn = document.querySelector("#open-task-form-btn");
const closetaskbtn = document.querySelector("#close-task-form-btn");
const tittle = document.querySelector("#title-input");
const date = document.querySelector("#date-input");
const description = document.querySelector("#description-input");
const addupdatetask = document.querySelector("#add-or-update-task-btn");
const canclebtn = document.querySelector("#cancel-btn");
const discardbtn = document.querySelector("#discard-btn");
const taskcont = document.querySelector("#tasks-container");
const confirmclosedialog = document.querySelector("#confirm-close-dialog");
const opentask = document.querySelector("#task-form");

const taskdata = JSON.parse(localStorage.getItem("data")) || [];

let currenttask = {};

const addOrUpdate = () => {

    if (!tittle.value.trim()) {
        alert("please enter tittle");
        return;
    }

    const taskArrIndex = taskdata.findIndex(
        (item) => item.id === currenttask.id
    );

    const taskObj = {
        id: `${tittle.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        tittle: tittle.value,
        date: date.value,
        description: description.value,
    };

    if (taskArrIndex === -1) {
        taskdata.unshift(taskObj);
    } else {
        taskdata[taskArrIndex] = taskObj;
    }

    localStorage.setItem("data", JSON.stringify(taskdata));

    updateTaskCont();
    reset();
};


const updateTaskCont = () => {

    taskcont.innerHTML = "";

    taskdata.forEach(({ id, tittle, date, description }) => {

        taskcont.innerHTML += `
        <div class="item" id="${id}">
            <p><strong>Tittle: </strong>${tittle}</p>
            <p><strong>Date: </strong>${date}</p>
            <p><strong>Description: </strong>${description}</p>

            <button onclick="edittask(this)" type="button" class="editbut">
                Edit
            </button>

            <button onclick="deletetask(this)" type="button" class="but">
                Delete
            </button>
        </div>
        `;
    });
};


const deletetask = (buttonE) => {

    const taskArrIndex = taskdata.findIndex(
        (item) => item.id === buttonE.parentElement.id
    );

    buttonE.parentElement.remove();

    taskdata.splice(taskArrIndex, 1);

    localStorage.setItem("data", JSON.stringify(taskdata));
};


const edittask = (buttonE) => {

    const taskArrIndex = taskdata.findIndex(
        (item) => item.id === buttonE.parentElement.id
    );

    currenttask = taskdata[taskArrIndex];

    tittle.value = currenttask.tittle;
    date.value = currenttask.date;
    description.value = currenttask.description;

    addupdatetask.innerText = "Update Task";

    opentask.classList.toggle("hidden");
};


const reset = () => {

    addupdatetask.innerText = "Add Task";

    tittle.value = "";
    date.value = "";
    description.value = "";

    opentask.classList.toggle("hidden");

    currenttask = {};
};


// OPEN FORM
taskbtn.addEventListener("click", () => {
    opentask.classList.toggle("hidden");
});


// CLOSE FORM
closetaskbtn.addEventListener("click", () => {

    const inputvalue =
        tittle.value || date.value || description.value;

    const inputvalueupdated =
        tittle.value !== currenttask.tittle ||
        date.value !== currenttask.date ||
        description.value !== currenttask.description;

    if (inputvalue && inputvalueupdated) {
        confirmclosedialog.showModal();
    } else {
        reset();
    }
});


// CANCEL DIALOG
canclebtn.addEventListener("click", () => {
    confirmclosedialog.close();
});


// DISCARD
discardbtn.addEventListener("click", () => {
    confirmclosedialog.close();
    reset();
});


// ADD / UPDATE
addupdatetask.addEventListener("click", (e) => {
    e.preventDefault();
    addOrUpdate();
});