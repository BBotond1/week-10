const form = document.querySelector("#add-category");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const product = {
        name: document.querySelector("#name").value,
        category: document.querySelector("#category").value,
        price: parseInt(document.querySelector("#price").value),
    };

    const formData = new FormData();
    formData.append('fileName',document.querySelector('#file-name').value)
    formData.append('file', document.querySelector('#file').files[0]) // files arrayt ad vissza
    //append - adattal tolti fel a formData-t, kulcsertek parokat fuz hozza

    fetch("/upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),  //mindenkeppen string legyen
    });

    fetch('/upload-image', {
        method: 'POST',
        body: formData
    })
});
