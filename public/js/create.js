const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input_name = document.getElementById("name").value;
    const input_description = document.getElementById("description").value;

    fetch("/todos", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: input_name,
            description: input_description,
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.ok == true) {
                window.location.href = "/";
            }
        });
});
