let inputs = document.getElementById("inp");
let timeInput = document.getElementById("time"); // Reference to time input field
let text = document.querySelector(".text");

function Add(){
    if(inputs.value == ""){
        alert("Please Enter Task")
    }else{
        let newEle = document.createElement("ul");
        let taskText = `${inputs.value}`;
        if (timeInput.value !== "") { // Check if time is provided
            taskText += ` (Due: ${timeInput.value})`; // Append time to task text
            setNotification(inputs.value, timeInput.value); // Set notification for the task
        }
        newEle.innerHTML = `${taskText} <i class="fa-solid fa-trash"></i>`;
        text.appendChild(newEle);
        inputs.value = "";
        timeInput.value = ""; // Clear input fields
        newEle.querySelector("i").addEventListener("click", remove);
        function remove(){
            newEle.remove();
        }
    }
}

function setNotification(task, time) {
    // Implement notification functionality here using browser APIs (e.g., Notification API)
    // This might involve requesting permission from the user
    // Below is just a basic example (not functional in all browsers)

    if (!("Notification" in window)) {
        alert("This browser does not support desktop notifications");
    }

    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        new Notification(`Task Reminder: ${task}`, {
            body: `Don't forget to complete your task by ${time}`
        });
    }

    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification(`Task Reminder: ${task}`, {
                    body: `Don't forget to complete your task by ${time}`
                });
            }
        });
    }
}
