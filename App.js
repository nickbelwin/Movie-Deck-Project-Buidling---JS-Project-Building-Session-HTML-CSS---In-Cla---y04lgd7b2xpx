let all = true;
let sortByDate = false;
let sortByRate = false;
let fevorite = false;


const heart = document.querySelectorAll(".heart");
console.log(heart);
let count = 0;
let favorite = 0;
heart.forEach((val) => {
    val.addEventListener("click", (e) => {
        if (count >= 0) {
            val.innerHTML = `<i class="ri-heart-fill"></i>`;
            val.classList.add("love");
            favorite++;
            count = count + 1;
        }
        else {
            val.innerHTML = `<i class="ri-heart-line"></i>`;
            val.classList.remove("love");
            favorite--;
            count--;
        }
    });
});
console.log(count)
console.log(favorite);
let pageNumber = 1;
const movieList = document.getElementById("movie-list");
async function getMovie() {
    let getData = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${pageNumber}`);
    let data = await getData.json();
    allMovie(data.results);
}
function allMovie(movieData) {
    console.log(movieData);
    movieList.innerHTML = "";
    if(pageNumber===1){
        document.getElementById("backbtn").disabled = true;
    }
    else{
        document.getElementById("backbtn").disabled = false;
    }
    movieData.forEach((val) => {
        movieList.innerHTML += `<li>
        <div class="movie-card" >
            <img src="https://image.tmdb.org/t/p/original${val.poster_path}" alt="Images"/>
            <h3>${val.title}</h3>
            <span class="heart"><i class="ri-heart-line"></i></span>
            <h4>Votes: ${val.vote_count}</h4>
            <h4>Rating: ${val.vote_average}</h4>
        </div>
    </li>`
    })
}
getMovie();
let checkData = "";

const nextbtn = document.getElementById("nextbtn");
const backbtn = document.getElementById("backbtn");
nextbtn.addEventListener("click", () => {
    if (pageNumber >= 1 && pageNumber < 3) {
        pageNumber = pageNumber + 1;
        if(pageNumber===1){
            document.getElementById("backbtn").disabled = true;
        }
    }
    document.getElementById("pageNum").innerText = `Current Page: ${pageNumber}`;
    getMovie();
});
backbtn.addEventListener("click", () => {
    if (pageNumber > 1) {
        pageNumber = pageNumber - 1;
        document.getElementById("pageNum").innerText = `Current Page: ${pageNumber}`;
        getMovie();
    }
});

async function searchFromApi() {
    movieList.innerHTML = "";
    for (let i = 1; i <= 3; i++) {
        console.log("i= ", i);
        let getDat = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${i}`);
        let dat = await getDat.json();
        console.log("dat.result= ", dat.results);
        showData(dat.results);
    }
}

function showData(page) {
    console.log("page= ", page);
    console.log("checkData= ", checkData);
    page.forEach((val) => {
        // The Godfather===val.title
        // T h e ==checkData
        let c= val.title.toLowerCase();
        let c2= checkData.toLowerCase();
        let titles = c.split(" "); //[The, Godfather]
        let title2 = c2.split(" "); //[The]
        let found=false;
        for (let val11 of titles) {
            if(found === true){
                break;
            }
            for (let val2 of title2) {
                if (val11 == val2) {
                    found=true;
                    movieList.innerHTML += `<li>
                    <div class="movie-card">
                        <img src="https://image.tmdb.org/t/p/original${val.poster_path}" alt="Images"/>
                        <h3>${val.title}</h3>
                        <span class="heart"><i class="ri-heart-line"></i></span>
                        <h4>Votes: ${val.vote_count}</h4>
                        <h4>Rating: ${val.vote_average}</h4>
                    </div>
                </li>`              
                }
            }
        }
    });
    if(movieList.innerHTML===""){
        movieList.innerHTML=`<div class="notFound">Result not found !!!</div>`;
    }
}

function searchData() {
    document.getElementById("searching").classList.add("searchtag");
    console.log("search val: ", document.getElementById("searching").value);
    if (document.getElementById("searching").value == "") {
        getMovie();
    }
    else {
        checkData = document.getElementById("searching").value;
    }
}
function search() {
    if(checkData){
        searchFromApi();
    }
}
window.addEventListener("click",()=>{
    document.getElementById("searching").classList.remove("searchtag")
})

// fevorite list of movie----------------------------------------





