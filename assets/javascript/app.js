// animals button data set
var animalName = new Set(['cats', 'dogs', 'owls', 'parrots'])
//  URL parameters 
var queryURL = {
  url: 'https://api.giphy.com/v1/gifs/search?',
  apiKey: 'dPpl7UOgQGTahGN4CvOjZ6CWsBd46zQE',
  limit: 10,
  q:'cats'
}

// function to fetch images from giphy
function fetchImgs() {
  var x = queryURL.q
  var _url = "https://api.giphy.com/v1/gifs/search?q=" + x + '&api_key=dPpl7UOgQGTahGN4CvOjZ6CWsBd46zQE' + '&limit=10&rating=pg13';

  console.log('NNNNNNNNNNNNNN',queryURL.q)
  //console.log("NNNNNNNNNNNNNN",queryURL.url);
  console.log('UUUUUUUUUUUUUU',_url)
    if (window.fetch) {
      fetch(_url)
        .then((_response) => _response.json())
        .then((_jsonObj) => _jsonObj.data)
      .then(attachImgs)
  }
  
  
  else {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', _url)
      xhr.onload = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
          var _response = JSON.parse(xhr.responseText)
          var _result = _response.data

          attachImgs(_result)

        } else {
          console.log('Error loadin data')
        }
      }
    }
    
    xhr.send()
  }
}


document.querySelector('#myButtons').addEventListener('click', displayImg)
document.querySelector('#gifArea').addEventListener('click', displayAnimation)
document.querySelector('#addanimal').addEventListener('click', addAnimalBtn)

// function to create a new button
function createBtn(userInput) {
   var btn = document.createElement('button')
   btn.setAttribute('class', 'btn btn-primary m-2')
   btn.innerHTML = userInput
   return btn
}

// function to create a new img element, the passed argument to this function                                      
function createImg(animalImgObj, alt) {
  var _col = document.createElement('div')
  _col.setAttribute('class', 'col-xl-2 col-lg-3 col-md-4 col-sm-6 col-7 p-1')
  var myCard = document.createElement('div')
  myCard.setAttribute('class', 'card p-1 gif-card')
  var myCardTitle = document.createElement('h4')
  myCardTitle.setAttribute('class', 'card-title p-2 mx-2  text-light')
  myCardTitle.innerHTML = 'rating:' + animalImgObj.rating
  animalImgObj = animalImgObj.images
  var myImag = document.createElement('img')
  // Image Attributes
  myImag.setAttribute('src', animalImgObj.fixed_height_still.url)
  myImag.setAttribute('data-still', animalImgObj.fixed_height_still.url)
  myImag.setAttribute('data-animate', animalImgObj.fixed_height.url)
  myImag.setAttribute('data-state', 'still')
  myImag.setAttribute('class', 'px-1 m-1')
  myImag.setAttribute('alt', alt)
  myCard.appendChild(myCardTitle)
  myCard.appendChild(myImag)
  _col.appendChild(myCard)

  return _col
}
// function will read each element from animalName and create a button
// for each animal
function displayButtons() {
  // Clear  current buttons
  document.querySelector('#myButtons').innerHTML = ''
  
  for (var animal of animalName) {
    var _btn = createBtn(animal)
    document.querySelector('#myButtons').appendChild(_btn)
  }
}

  // function to attach images
function attachImgs(myImg) {
  var _parent = document.querySelector('#gifArea')
    for (var _key of Object.keys(myImg)) {
      var _newCard = createImg(myImg[_key], queryURL.q)
      _parent.append(_newCard)
  }
}

// function that will add images cards to view
function displayImg(event) {
 document.querySelector('#gifArea').innerHTML = ''
  var _currentAnimal = event.target.innerHTML
  queryURL.q = _currentAnimal.trim().split(/\s/).join('+')
  fetchImgs()
}
// // function that will will display the animation on image
function displayAnimation(event) {
  if (event.target.tagName === 'IMG') {
    var _currentImg = event.target
        if (_currentImg.dataset.state === 'still') {
        _currentImg.src = _currentImg.dataset.animate
        _currentImg.dataset.state = 'animate'
    }
  
    else {

      _currentImg.src = _currentImg.dataset.still
  
      _currentImg.dataset.state = 'still'
    }
  }
}
// function that will add the text input to button
function addAnimalBtn(event) {
    event.preventDefault()
    var _inputElement = document.querySelector('#animalInput')
    if (_inputElement.value) {
    animalName.add(_inputElement.value)
    console.log('adddddddddddd',animalName)
    displayButtons()
  } else {
    alert('Please Enter an animal name')
  }
  // clear  input
  _inputElement.value = ''
}

displayButtons()
