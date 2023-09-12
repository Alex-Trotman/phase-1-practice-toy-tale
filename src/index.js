let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    toyFormContainer.style.display = addToy ? "block" : "none";
  });

  const toyCollection = document.getElementById('toy-collection');

  fetchToys(); // Fetch and render toys when the DOM loads

  // Function to fetch and render existing toys
  function fetchToys() {
    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(data => {
        data.forEach(toy => {
          createToyCard(toy);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Function to create a new toy card
  function createToyCard(toy) {
    // Code to create a toy card
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

    likeButton.addEventListener('click', () => {
      const toyId = likeButton.id;
      const newNumberOfLikes = toy.likes + 1;
    
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          likes: newNumberOfLikes
        })
      })
        .then(response => response.json())
        .then(data => {
          // Update the like count in the DOM
          likeCount.textContent = `${data.likes} Likes`;
        })
        .catch(error => {
          console.error(error);
        });
    });

    toyElement.appendChild(toyName);
    toyElement.appendChild(toyImage);
    toyElement.appendChild(likeCount);
    toyElement.appendChild(likeButton);

    toyCollection.appendChild(toyElement);
  }

  const createToyForm = document.getElementsByClassName('add-toy-form')[0]
  createToyForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const toyNameBox = document.querySelector('.input-text[name="name"]');
    const toyImageUrlBox = document.querySelector('.input-text[name="image"]');
    
    const newToyData = {
      name: toyNameBox.value,
      image: toyImageUrlBox.value,
      likes: 0
    };
    
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToyData)
    })
    .then(response => response.json())
    .then(data => {
      // Create and append the new toy card
      createToyCard(data);

      // Clear the form inputs
      toyNameBox.value = '';
      toyImageUrlBox.value = '';
    })
    .catch(error => {
      console.error(error);
    });
  })
});
