console.log("Project: TODO");

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  const task = taskInput.value;

  if (task.trim() === "") return;

  const li = document.createElement("li");

  li.innerText = task;

  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✅";
  completeBtn.style.marginLeft = "5px";
  completeBtn.onclick = function () {
    li.classList.toggle("completed");
  };
  li.appendChild(completeBtn);
  
  // need to update edit func

  const editBtn = document.createElement("button");
  editBtn.innerText = "🖋️";
  editBtn.style.marginLeft = "5px";
  editBtn.onclick = function () {
    const btn = document.getElementById("addTask");
    li.innerText = replaceWith(task);
  };
  li.appendChild(editBtn);

  //end of edit func

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.style.marginLeft = "5px";
  deleteBtn.onclick = function () {
    li.remove();
  };
  li.appendChild(deleteBtn);

  taskList.appendChild(li);

  taskInput.value = "";
}

function filterTasks() {
  const search = document.getElementById("searchInput").value;
  const lists = document.querySelectorAll("ul#taskList li");
  lists.forEach((list) => {
    list.style.display = list.innerText
      .toLowerCase()
      .includes(search.toLowerCase())
      ? "block"
      : "none";
  });
}


// Edit func declare