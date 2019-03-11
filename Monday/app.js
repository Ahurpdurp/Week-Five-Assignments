let moviesUL = document.getElementById('moviesUL')
let movieDetail = document.getElementById('movieDetail')
let anchorLink = document.getElementsByClassName('anchor-link')
function loadMovieTitles(){
    let movieURL = "http://www.omdbapi.com/?s=batman&apikey=3546a92f"
    let request = new XMLHttpRequest();
    request.open("GET",movieURL)
    request.send();
    request.onload = function() {   
        let jsonText = JSON.parse(request.responseText);
        displayMovies(jsonText.Search)           
    }
}

function displayMovies(movies){
    let liMovies = movies.map(x => {
        return `<li><img src = ${x.Poster}><a data-index-number = ${x.imdbID} class = 'anchor-link' onclick = "displayIndividual(this)" href = "#">${x.Title}</a></li>`
    })
    moviesUL.innerHTML = liMovies.join('')
    
}


function displayIndividual(element){
    let movieID = element.dataset.indexNumber;
    let movieDetailURL = `http://www.omdbapi.com/?i=${movieID}&apikey=3546a92f`
    let request = new XMLHttpRequest();
    request.open("GET",movieDetailURL)
    request.send();
    request.onload = function() {   
    let movieDetailList = JSON.parse(request.responseText);
    movieDetail.innerHTML = `<div><h1>${movieDetailList.Title}</h1><img src = ${movieDetailList.Poster}></div>
    <div><p>Year: ${movieDetailList.Year}</p>
    <p>Rated: ${movieDetailList.Rated}</p>
    <p>Released: ${movieDetailList.Released}</p>
    <p>Director: ${movieDetailList.Director}</p></div>`
}}
