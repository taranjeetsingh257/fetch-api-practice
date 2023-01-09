document.getElementById('button1').addEventListener('click', getText);
document.getElementById('button2').addEventListener('click', getUsers);
document.getElementById('button3').addEventListener('click', getPosts);
document.getElementById('addPost').addEventListener('submit', addPost);

function getText(){
    fetch('test.txt')
        .then((res) => res.text())
        .then((data) => {
            let output = '<h2>Data from local text file: </h2>' + `<p>${data}<p>`;
            document.getElementById('output').innerHTML = output;
        })
        .catch((err) => console.log(err))
}

function getUsers(){
    fetch('users.json')
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            let output = '<h2>Users from Local JSON file: </h2>';
            data.forEach(function(user){
                output += `
                    <ul class="list-group mb-3">
                        <li class="list-group-item"><b>User ID: </b>${user.id}</li>
                        <li class="list-group-item"><b>Name: </b>${user.name}</li>
                        <li class="list-group-item"><b>Email: </b>${user.email}</li>
                    </ul>
                `;
            });
            document.getElementById('output').innerHTML = output;
        })
        .catch((err) => console.log(err))
}

function getPosts(){
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            let output = '<h2>Posts from API: </h2>';
            data.forEach(function(post){
                output += `
                    <div class="card card-body mb-3">
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                    </div>
                `;
            })
            document.getElementById('output').innerHTML = output;
        })
        .catch((err) => console.log(err))
}

//POST request to the server
//Adding title and body of the post to the server
function addPost(e){
    e.preventDefault();

    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({title:title, body:body})
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
}