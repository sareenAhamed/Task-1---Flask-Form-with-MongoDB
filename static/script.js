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
    } catch (error) {
        const responseMsg = document.getElementById("responseMsg");
        responseMsg.innerText = "Error submitting task!";
        responseMsg.className = 'error show';
        console.error(error);
    }
});