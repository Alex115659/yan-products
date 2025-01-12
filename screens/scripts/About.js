const currentPath = window.location.pathname;


function func(){
 if (currentPath.endsWith('about.html')) {
    document.querySelector('.about-navigate').style.textDecorationLine = 'underline';
    document.querySelector('.about-navigate').style.fontSize = '30px'
} 
}

func()

const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const swapButton = document.getElementById('swapButton2');
const swapButton2 = document.getElementById('swapButton1');

swapButton.addEventListener('click', function (event){

if(box1.style.display == 'none'){
  box1.style.display = 'block';
  box2.style.display = 'none'
} else {

box1.style.display = 'none';
box2.style.display = 'block';
}
})

swapButton2.addEventListener('click', function (event){

  if(box1.style.display == 'none'){
    box1.style.display = 'block';
    box2.style.display = 'none'
  } else {
  
  box1.style.display = 'none';
  box2.style.display = 'block';
  }
  })

  const nav = document.querySelector('.nav1');

  nav.addEventListener('click', function (){
    window.location.href = './products.html'
  })

  fetch('http://127.0.0.1:5000/get_news')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    var el = document.querySelector('.sub-container22');

    data.forEach(newsItem => {
      let container = document.createElement('div');
      container.classList.add('news-container');

      container.innerHTML = `
        <p>${newsItem.description}</p>
      `;

      let line = document.createElement('div');
      line.classList.add('line');

      container.appendChild(line);
      el.appendChild(container);
    });
  })
  .catch(error => console.error('Error fetching news:', error));
