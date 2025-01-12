const currentPath = window.location.pathname;


function func(){
if (currentPath.endsWith('index.html')) {
    document.querySelector('.logo').style.textDecorationLine = 'underline';
    document.querySelector('.logo').style.fontSize = '40px'
} 
}

func()

const navAboutEl = document.querySelector('.navigateAbout');

navAboutEl.addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = './screens/about.html'
})

const modal = document.getElementById("myModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close");

openBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

const modalFormEl = document.getElementById('modal-form');

modalFormEl.addEventListener('submit', function (event) {
    event.preventDefault();

    const form = {
        name: document.querySelector('.name').value,
        email: document.querySelector('.email').value,
        password: document.querySelector('.password').value
    };

    fetch('http://127.0.0.1:5000/getManager', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => {
                throw new Error(err.message || 'Failed to fetch manager details');
            });
        }
        return res.json();
    })
    .then(data => {
        window.location.href = './manager.html'
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
});

fetch('http://127.0.0.1:5000/popular_product')
.then(res => res.json())
.then(data => {
    for(let elem of data) {
        var container = document.createElement('div');

        container.classList.add('product-container')

        container.innerHTML = `
            <h2>${elem.name}<h2/>
            <p>${elem.description}</p>
        `
        document.getElementById('popular-products').appendChild(container)
    }
})