const APIURL= 'http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMGPATH= 'https://image.tmdb.org/t/p/w1280'
const SEARCHAPI= 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const form =document.getElementById('form')
const main =document.getElementById('main')
const search = document.getElementById('search')
getMovies(APIURL)

async function getMovies (url) {
    const res =await fetch(url)
    const data =await res.json()

    showMovies(data.results);
}

function showMovies (movies) {
    main.innerHTML =''
    movies.forEach((movie) => {
        const {title,poster_path, vote_average, overview} = movie

        const movieEl= document.createElement ('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML =`
        <img src="${IMGPATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class=${getClassByRate(vote_average)}>${vote_average}</span>
        </div>
        <div class="Overview">
            <h3>Overview</h3>
            ${overview} 
        </div>
        `
        main.appendChild(movieEl)
    })
}
function getClassByRate(vote) {
    if (vote>=8){
        return 'green'
    }
    else if (vote>=5){
        return 'orange'
    } else {
        return 
    }
}

form.addEventListener('submit',(e) => {
    e.preventDefault()

    const searchTerm = search.value
    if(searchTerm && searchTerm !=='' ) {
        getMovies(SEARCHAPI + searchTerm)
        search.value =''
    } else {
        window.location.reload()
    }
})

