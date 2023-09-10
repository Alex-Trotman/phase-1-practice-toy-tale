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

// Global Variables
const toyCollection = document.getElementById('toy-collection')
const getToyName = () => {
  const inputName = document.getElementsByTagName('input')[0].value;
  console.log(inputName);
};
});

