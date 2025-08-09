document.getElementById("taskForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        dueDate: document.getElementById("dueDate").value
    };

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        const responseMsg = document.getElementById("responseMsg");
        responseMsg.innerText = result.message;
        responseMsg.className = response.status === 200 ? 'success show' : 'error show';

        if (response.status === 200) {
            // Clear form after successful submission
            document.getElementById("taskForm").reset();
            // Fetch and display tasks
            await fetchTasks();
        }
    } catch (error) {
        const responseMsg = document.getElementById("responseMsg");
        responseMsg.innerText = "Error submitting task!";
        responseMsg.className = 'error show';
        console.error(error);
    }
});

async function fetchTasks() {
    try {
        const response = await fetch('/tasks');
        const tasks = await response.json();
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = ''; // Clear previous tasks
        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            taskDiv.innerHTML = `
                <p><strong>Name:</strong> ${task.name}</p>
                <p><strong>Email:</strong> ${task.email}</p>
                <p><strong>Title:</strong> ${task.title}</p>
                <p><strong>Description:</strong> ${task.description}</p>
                <p><strong>Due Date:</strong> ${task.dueDate}</p>
            `;
            taskList.appendChild(taskDiv);
            // Trigger animation
            setTimeout(() => taskDiv.classList.add('show'), 10);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Fetch tasks on page load
fetchTasks();