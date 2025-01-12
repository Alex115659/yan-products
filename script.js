const popularProductFormEl = document.querySelector('.popularProduct');

popularProductFormEl.addEventListener('submit', function (event) {
    event.preventDefault();

    var form = {
        'name': document.querySelector('.name').value,
        'description': document.querySelector('.description').value
    }

    fetch('http://127.0.0.1:5000/add_popularProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(data => {
        alert(data[0])
    })
    .catch(err => alert('something went wrong'))
})

const newsFormEl = document.querySelector('.addNews');

newsFormEl.addEventListener('submit', function (event){
    event.preventDefault();
    var i = document.querySelector('.addNews input').value;

    var form2 = {
        'description': i
    }
    fetch('http://127.0.0.1:5000/add_news', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form2)
    })
    .then(resp => resp.json())
    .then(data => alert(`${data.message}`))
    .catch(err => console.log(err))
})

let productsFormEl = document.querySelector('.products');

productsFormEl.addEventListener('submit', function (event){
    event.preventDefault();
    let input1 = document.querySelector('.name-product').value;
    let input2 = document.querySelector('.description-product').value;

    var form3 = {
        'name': input1,
        'description': input2
    };

    fetch('http://127.0.0.1:5000/add_product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form3)
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(err => console.log(err))
})

let clientContainer = document.querySelector('.clients');
var clients = [];

async function getClientsData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        data.forEach(elem => {
            const container = document.createElement('div');
            container.classList.add(`client-container${elem.id}`);

            container.innerHTML = `
                <p>name: ${elem.name}</p><br />
                <p>surname: ${elem.surname}</p> <br />
                <p>product: ${elem.product}</p> <br />
                <p>price: ${elem.price}</p> <br />
                <p>description: ${elem.description}</p> <br />
                <p>phone number: ${elem.phoneNumber}</p><br />
                <p>email: ${elem.email}</p>
                <div>
                    <button class='doneButton' data-id='${elem.id}' style='background-color: green; border: 1px solid white; width: 50px; height: 50px; border-radius: 5px; cursor: pointer'>Solved</button>
                </div>
            `;

            const doneButton = container.querySelector('.doneButton');
            doneButton.addEventListener('click', async function () {
                const clientData = {
                    id: elem.id,
                    name: elem.name,
                    surname: elem.surname,
                    price: elem.price,
                    product: elem.product,
                    email: elem.email,
                    phoneNumber: elem.phoneNumber,
                    description: elem.description
                };

                try {
                    const deleteResponse = await fetch('http://127.0.0.1:5000/deleteClient', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: clientData.id })
                    });

                    if (deleteResponse.ok) {
                        console.log(`Client with ID ${clientData.id} deleted successfully.`);
                        container.remove();
                    } else {
                        console.error('Failed to delete client');
                    }
                } catch (error) {
                    console.error('Error deleting client:', error);
                }
            });

            clientContainer.appendChild(container);
        });
    } catch (error) {
        console.error('Error fetching client data:', error);
    }
}

getClientsData('http://127.0.0.1:5000/clients');

const bt = document.querySelector('.deleteProduct'); 

bt.addEventListener('submit', function (event){
    event.preventDefault();

    const v = document.querySelector('.deleteProduct input').value;

    fetch('http://127.0.0.1:5000/delete_product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': 1, 'name': v})
    })
    .then(response => response.json())
    .catch(err => console.log(err))

})

const form4 = document.querySelector('.deleteNews');

form4.addEventListener('submit', function (event){
    event.preventDefault();

    let input = document.querySelector('.deleteNews input').value;
    
    fetch('http://127.0.0.1:5000/delete_news', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': 1, 'name': input})
    })
    .then(response => response.json())
    .catch(err => console.log(err))

})

const form5 = document.querySelector('.deletePopularProducts');

form5.addEventListener('submit', function (event){
    event.preventDefault();

    const input = document.querySelector('.deletePopularProducts input').value;

    fetch('http://127.0.0.1:5000/delete_popularProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': 1, 'name': input})
    }
    )
    .then(response => response.json())
    .catch(err => console.log(err))

})

export default clients