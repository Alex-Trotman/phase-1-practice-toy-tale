let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Fetch Andy's Toys


  const toyCollection = document.getElementById('toy-collection')

  fetch('http://localhost:3000/toys', {
  method: 'GET'
  })
  .then(response => response.json())
  .then(data => {
    // Add Toy Info to the Card
    data.forEach(toy => {
      const toyElement = document.createElement('div');
      toyElement.classList.add('card');
    
      const toyName = document.createElement('h2');
      toyName.textContent = toy.name;
    
      const toyImage = document.createElement('img');
      toyImage.src = toy.image;
      toyImage.classList.add('toy-avatar');
    
      const likeCount = document.createElement('p');
      likeCount.textContent = `${toy.likes} Likes`;
    
      const likeButton = document.createElement('button');
      likeButton.classList.add('like-btn');
      likeButton.id = toy.id;
      likeButton.textContent = 'Like ❤️';
    
      toyElement.appendChild(toyName);
      toyElement.appendChild(toyImage);
      toyElement.appendChild(likeCount);
      toyElement.appendChild(likeButton);
    
      toyCollection.appendChild(toyElement);
    });
    console.log(data);
  })
  .catch(error => {
    // Handle any errors here
    console.error(error);
  });

// Add a New Toy

});

// const toyCollection = document.getElementsByClassName('toy-collection')

// const toyNameBox = document.getElementsByClassName('input-text')[0]

// const toyImageUrlBox = document.getElementsByClassName('input-text')[1]

const toyNameBox = document.querySelector('.input-text[name="name"]');
const toyImageUrlBox = document.querySelector('.input-text[name="image"]');


function getToyName() {
  return toyNameBox.value;
};

function getToyUrlImage(){
  return toyImageUrlBox.value;
}

const createToyButton = document.querySelector('.input-text[name="submit"]');

createToyButton.addEventListener('click', () => {
  fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    name: `${toyNameBox.value}`,
    image: `${toyImageUrlBox.value}`,
    likes: 0
  })
})
  .then(response => response.json())
  .then(data => {
    // Code to handle the response
  })
  .catch(error => {
    // Code to handle any errors
  });
})

// http://localhost:3000/toys