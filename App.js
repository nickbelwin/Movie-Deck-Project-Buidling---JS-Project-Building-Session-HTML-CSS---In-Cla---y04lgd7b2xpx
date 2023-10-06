let all = true;
let sortByDate = false;
let sortByRate = false;
let favorite = false;

let pageNumber = 1;
const movieList = document.getElementById("movie-list");

// Render home page movies..............
async function getMovie() {
    let getData = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${pageNumber}`);
    let data = await getData.json();
    if(sortByRate === true){
        sortByRating(data.results);
        document.getElementById("all").classList.remove("active-tab");
    }
    else if(sortByDate === true){
        sortWithDate(data.results);
        console.log('sortByDate')
        document.getElementById("all").classList.remove("active-tab");
    }
    else{
        allMovie(data.results);
        document.getElementById("all").classList.add("active-tab");
    }
}
function allMovie(movieData) {
    // console.log(movieData);
    movieList.innerHTML = "";
    if(pageNumber===1){
        document.getElementById("backbtn").disabled = true;
        document.getElementById("backbtn").classList.remove("prev");
        document.getElementById("backButton").disabled = true;
        document.getElementById("backButton").classList.remove("prev");
    }
    else{
        document.getElementById("backbtn").disabled = false;
        document.getElementById("backbtn").classList.add("prev");
        document.getElementById("backButton").disabled = false;
        document.getElementById("backButton").classList.add("prev");
    }
    if(pageNumber===3){
        document.getElementById("nextbtn").disabled = true;
        document.getElementById("nextbtn").classList.remove("next");
    }
    else{
        document.getElementById("nextbtn").disabled = false;
        document.getElementById("nextbtn").classList.add("next");
    }
    movieData.forEach((val) => {
        movieList.innerHTML += `<li>
        <div id="${val.id}" class="movie-card" onclick="clickFunc(event)" >
            <img src="https://image.tmdb.org/t/p/original${val.poster_path}" alt="Images"/>
            <h3>${val.title}</h3>
            <span class="heart" id="${val.id+1}" onclick="liked(event)"><i class="ri-heart-line"></i></span>
            <h4>Votes: ${val.vote_count}</h4>
            <h4>Rating: ${val.vote_average}</h4>
        </div>
    </li>`;
    });
}
getMovie();

// searching movies code........................
let checkData = "";
window.addEventListener("click",()=>{
    document.getElementById("searching").classList.remove("searchtag")
});

function search() {
    if(checkData){
        searchFromApi();
    }
}

function searchData() {
    document.getElementById("searching").classList.add("searchtag");
    console.log("search val: ", document.getElementById("searching").value);
    if (document.getElementById("searching").value == ""){
        getMovie();
    }
    else {
        checkData = document.getElementById("searching").value;
    }
}

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

// Sorting code...............................................
let rCount=0;
let dCount=0
let allCount=0;
// Render all movies by all button..............................
function allPage(){
    all = true;
    sortByDate = false;
    sortByRate = false;
    favorite = false;
    rCount=0;
    dCount=0;
    document.getElementById("byrate").classList.remove("active-tab");
    document.getElementById("bydate").classList.remove("active-tab");
    document.getElementById("like").classList.remove("active-tab");
    document.querySelector(".filter").style.display="flex";
    document.querySelector(".pagination").style.display="flex";
    getMovie();
}

// Sort by date code..........................................
function sortByD(){
    if(dCount===0){
        all = false;
        sortByDate = true;
        sortByRate = false;
        favorite = false;
        dCount++;
        document.getElementById("bydate").classList.add("active-tab");
        document.getElementById("byrate").classList.remove("active-tab");
        rCount=0;
        getMovie();
    }
    else{
        all = true;
        sortByDate = false;
        sortByRate = false;
        favorite = false;
        dCount--;
        document.getElementById("bydate").classList.remove("active-tab");
        getMovie();
    }
}

function sortWithDate(data){
    let date= data.sort((a,b)=>{
        let first=a.release_date;
        let second=b.release_date;
        first=parseInt(first.split("-"));
        second=parseInt(second.split("-"));
        return first - second;
    });
    if(pageNumber===1){
        document.getElementById("backbtn").disabled = true;
        document.getElementById("backbtn").classList.remove("prev");
    }
    else{
        document.getElementById("backbtn").disabled = false;
        document.getElementById("backbtn").classList.add("prev");
    }
    if(pageNumber===3){
        document.getElementById("nextbtn").disabled = true;
        document.getElementById("nextbtn").classList.remove("next");
    }
    else{
        document.getElementById("nextbtn").disabled = false;
        document.getElementById("nextbtn").classList.add("next");
    }
    movieList.innerHTML="";
    date.forEach((val)=>{
        movieList.innerHTML += `<li>
        <div class="movie-card addedDate" >
            <img src="https://image.tmdb.org/t/p/original${val.poster_path}" alt="Images"/>
            <h3>${val.title}</h3>
            <span class="heart"><i class="ri-heart-line"></i></span>
            <h4>Votes: ${val.vote_count}</h4>
            <h4>Rating: ${val.vote_average}</h4>
            <h4>Date: ${val.release_date}</h4>
        </div>
    </li>`;
    });

    // console.log("sortWithDate",date);
}

// Sort by rating code...............................................
function sortByR(){
    if(rCount===0){
        all = false;
        sortByDate = false;
        sortByRate = true;
        favorite = false;
        rCount++;
        document.getElementById("byrate").classList.add("active-tab");
        document.getElementById("bydate").classList.remove("active-tab");
        dCount=0;
        getMovie();
    }
    else{
        all = true;
        sortByDate = false;
        sortByRate = false;
        favorite = false;
        rCount--;
        document.getElementById("byrate").classList.remove("active-tab");
        getMovie();
    }
}

function sortByRating(data){
    let rate= data.sort((a,b)=>{
        return a.vote_average - b.vote_average;
    });
    console.log("Rating= ",rate);
    if(pageNumber===1){
        document.getElementById("backbtn").disabled = true;
        document.getElementById("backbtn").classList.remove("prev");
    }
    else{
        document.getElementById("backbtn").disabled = false;
        document.getElementById("backbtn").classList.add("prev");
    }
    if(pageNumber===3){
        document.getElementById("nextbtn").disabled = true;
        document.getElementById("nextbtn").classList.remove("next");
    }
    else{
        document.getElementById("nextbtn").disabled = false;
        document.getElementById("nextbtn").classList.add("next");
    }
    movieList.innerHTML="";
    rate.forEach((val)=>{
        movieList.innerHTML += `<li>
        <div class="movie-card" >
            <img src="https://image.tmdb.org/t/p/original${val.poster_path}" alt="Images"/>
            <h3>${val.title}</h3>
            <span class="heart"><i class="ri-heart-line"></i></span>
            <h4>Votes: ${val.vote_count}</h4>
            <h4>Rating: ${val.vote_average}</h4>
        </div>
    </li>`
    });
}

// favorite movies code---------------------------------------------
let arrFevorite=[];
let favoriteId=[];
function liked(e){
    e.stopPropagation();
    favorite=true;
    let loveId=e.target.parentElement.offsetParent.id;
    favoriteId.push(loveId);
    document.getElementById(e.target.offsetParent.id).innerHTML=`<i class="ri-heart-fill"></i>`;
    console.log(favoriteId);
    console.log(loveId);
    likedMovi(loveId);
}

function fevList(movieData){
}

async function likedMovi(loveId){
    let getData = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${pageNumber}`);
    let data = await getData.json();
    let userData=data.results;
    userData.forEach((val)=>{
        if(val.id == loveId){
            arrFevorite.push(val);
        }
    });
    console.log(arrFevorite);
}
function favoriteMovie(){
    document.querySelector(".pagination").style.display="none";
    document.getElementById("like").classList.add("active-tab");
    document.getElementById("back").style.display="block";
    document.getElementById("all").style.display="none";
    document.querySelector(".filter").style.display="none";
    document.getElementById('headingLine').style.display="flex";
    movieList.innerHTML="";
    arrFevorite.forEach((val)=>{
        movieList.innerHTML += `<li>
        <div id="${val.id}" class="movie-card" onclick="clickFunc(event)" >
            <img src="https://image.tmdb.org/t/p/original${val.poster_path}" alt="Images"/>
            <h3>${val.title}</h3>
            <span class="heart" id="${val.id+1}" onclick="liked(event)"><i class="ri-heart-fill"></i></span>
            <h4>Votes: ${val.vote_count}</h4>
            <h4>Rating: ${val.vote_average}</h4>
        </div>
    </li>`
    });
}

// render page after click on movie -----------------------------------------------------
async function clickFunc(e){
    e.stopPropagation();
    let getData = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${pageNumber}`);
    let data = await getData.json();
    let userData=data.results;
    userData?.forEach((val, index)=>{
        if(val.id == e.target.offsetParent.id){
            // let movieInfo=userData[index];
            document.querySelector(".filter").style.display="none";
            document.getElementById('all').style.display="none";
            document.getElementById('like').style.display="none";
            document.querySelector(".pagination").style.display="none";
            document.getElementById('back').style.display="block";
        
            movieList.innerHTML=`
            <div id="${val.id}" class="movie-info">
            <img src="https://image.tmdb.org/t/p/original${val.backdrop_path}" alt="Images"/>
            <div class="pic-info">
            <h3>${val.title}</h3>
            <p>${val.overview}</p>
            <h4>Votes: ${val.vote_count}</h4>
            <h4>Rating: ${val.vote_average}</h4>
            </div>
        </div>`
        }
    })

// console.log(e.target.offsetParent.id);
}

// back button when user enter in favorite movie list and in specific movie---------------------------------
function backPage(){
    document.querySelector(".filter").style.display="flex";
    document.getElementById('all').style.display="flex";
    document.getElementById('like').style.display="flex";
    document.querySelector(".pagination").style.display="flex";
    document.getElementById('back').style.display="none";
    document.getElementById('headingLine').style.display="none";
    document.getElementById("like").classList.remove("active-tab");
    getMovie()
}

// next button, previous button and back button when mobile site open code--------------------------------
const nextbtn = document.getElementById("nextbtn");
const backbtn = document.getElementById("backbtn");
nextbtn.addEventListener("click", () => {
    if (pageNumber >= 1 && pageNumber < 3) {
        pageNumber = pageNumber + 1;
    }
    if(pageNumber>=2){
        document.getElementById("backButton").style.opacity="1";
    }
    document.getElementById("pageNum").innerText = `Current Page: ${pageNumber}`;
    getMovie();
});
// window.addEventListener('beforeunload', () => {
//     console.log('User clicked back button');
//     if (pageNumber > 1) {
//         pageNumber = pageNumber - 1;
//         document.getElementById("pageNum").innerText = `Current Page: ${pageNumber}`;
//         getMovie();
//     }
//   });

backbtn.addEventListener("click", () => {
    if (pageNumber > 1) {
        pageNumber = pageNumber - 1;
        document.getElementById("pageNum").innerText = `Current Page: ${pageNumber}`;
        getMovie();
    }
});

// back button when mobile site open---------------------------------
function backBtn(e) {
    console.log(e)
    if (pageNumber > 1) {
        pageNumber = pageNumber - 1;
        document.getElementById("pageNum").innerText = `Current Page: ${pageNumber}`;
        getMovie();
    }
    if(pageNumber===1){
        document.getElementById("backButton").style.opacity="0";
    }
}




