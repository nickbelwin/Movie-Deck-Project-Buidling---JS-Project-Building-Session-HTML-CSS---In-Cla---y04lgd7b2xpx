let all = true;
let sortByDate = false;
let sortByRate = false;
let fevorite = false;

const heart = document.querySelectorAll(".heart");
// console.log(heart);
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
// console.log(count)
// console.log(favorite);
let pageNumber = 1;
const movieList = document.getElementById("movie-list");

// movieList.addEventListener("click",clickFunc);
// const allCard=Array.from(document.querySelectorAll(".movie-card"));
// allCard.forEach((val)=>{
//     val.addEventListener("click", (e)=>{
//         console.log(e.target.id);
//     })
//     console.log(val);
// })

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

async function clickFunc(e){
    e.stopPropagation();
    let getData = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${pageNumber}`);
    let data = await getData.json();
    let userData=data.results;
    userData.forEach((val, index)=>{
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
// let back=document.getElementById("back");
// back.addEventListener("click", backPage);
    console.log(e.target.offsetParent.id);
}

function backPage(){
    document.querySelector(".filter").style.display="flex";
    document.getElementById('all').style.display="flex";
    document.getElementById('like').style.display="flex";
    document.querySelector(".pagination").style.display="flex";
    document.getElementById('back').style.display="none";
    getMovie()
}

function allMovie(movieData) {
    // console.log(movieData);
    movieList.innerHTML = "";
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
    movieData.forEach((val) => {
        movieList.innerHTML += `<li>
        <div id="${val.id}" class="movie-card" onclick="clickFunc(event)" >
            <img src="https://image.tmdb.org/t/p/original${val.poster_path}" alt="Images"/>
            <h3>${val.title}</h3>
            <span class="heart" id="${val.id+1}" onclick="liked(event)"><i class="ri-heart-line"></i></span>
            <h4>Votes: ${val.vote_count}</h4>
            <h4>Rating: ${val.vote_average}</h4>
        </div>
    </li>`
    });
}
getMovie();
let checkData = "";

const nextbtn = document.getElementById("nextbtn");
const backbtn = document.getElementById("backbtn");
nextbtn.addEventListener("click", () => {
    if (pageNumber >= 1 && pageNumber < 3) {
        pageNumber = pageNumber + 1;
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

async function liked(e){
    e.stopPropagation();
    let getData = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${pageNumber}`);
    let data = await getData.json();
    let likeData=data.results;
    document.querySelector(".heart").innerHTML="";
    likeData.forEach((val, index)=>{
        if(val.id+1 == e.target.offsetParent.id){
            document.querySelector(".heart").classList.add("loved");
            document.querySelector(".heart").innerHTML=`<i class="ri-heart-fill"></i>`;
        }
    });
    console.log(e.target.offsetParent.id);

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

let rCount=0;
let dCount=0
let allCount=0;
function allPage(){
        all = true;
        sortByDate = false;
        sortByRate = false;
        fevorite = false;
        rCount=0;
        dCount=0;
        document.getElementById("byrate").classList.remove("active-tab");
        document.getElementById("bydate").classList.remove("active-tab");
        getMovie();
}


function sortByR(){
    if(rCount===0){
        all = false;
        sortByDate = false;
        sortByRate = true;
        fevorite = false;
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
        fevorite = false;
        rCount--;
        document.getElementById("byrate").classList.remove("active-tab");
        getMovie();
    }
}

function sortByD(){
    if(dCount===0){
        all = false;
        sortByDate = true;
        sortByRate = false;
        fevorite = false;
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
        fevorite = false;
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



// fevorite list of movie----------------------------------------





