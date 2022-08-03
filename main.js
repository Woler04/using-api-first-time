/*var posts = null;

async function loadDoc() {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = await  function () {
        if (this.readyState == 4 && this.status == 200) {
            getData(this);
        }
    };
    xhttp.open("GET", "https://api.rule34.xxx/index.php?page=dapi&s=post&q=index");
    xhttp.send();
}

function getData(xml) {
    let root = document.getElementById("root");
    const xmlDoc = xml.responseXML;
    posts = xmlDoc.getElementsByTagName("post");

    let i = Math.floor(Math.random() * posts.lenght) + 1;

    //console.log(x[5].getAttribute("file_url"));
    let img = document.createElement("img");
    img.id = "mainImage";
    root.append(img);

    let url = posts[i].getAttribute("sample_url"); 
    img.setAttribute("src", url);
}

function pickNew()
{
    let i = Math.floor(Math.random() * posts.lenght) + 1;
    console.log(posts[i].getAttribute("sample_url"));
}


loadDoc();*/
/*var posts
function loadDoc() {
    let pid = Math.floor(Math.random() * 100) + 1;
    let tags = "genshin_impact+breasts";
    let req = "https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=5&tags="+tags+"&pid="+pid;
    req = "https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1";

    var xhttp = new XMLHttpRequest();
    var root = document.getElementById("root");
    
    xhttp.open("GET", req, false);
    xhttp.responseType="json";
    xhttp.send();
    posts = xhttp.responseXML.getElementsByTagName("post");
    
    root.append(addImage(posts[0].getAttribute("preview_url")));
    //console.log(posts[i].getAttribute("id"));
}

function addImage(url)
{
    let img = document.createElement("img");
    img.setAttribute("src", url); 
    img.setAttribute("alt", "404 r34");
    img.classList.add("w-50", "d-block", "mx-auto");
    return img;
}

loadDoc();*/

var posts;
var score = 0;
var highScore = 0;
var postId = 0;
var rounds = 15;
var currRound = 1;
const currRoundText = document.getElementById("currRound");
const roundText = document.getElementById("rounds");


function setup() {
    currRoundText.textContent = currRound;
    roundText.textContent = rounds;
    getJSON('https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=genshin_impact&limit=1000',
    function (err, data) {
        if (err !== null) {
            console.log('Something went wrong: ' + err);
        } else {
            posts = data;
            rend();
        }
    });
}

var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function rend() {
    currRoundText.textContent = currRound++;
    if (currRound > rounds)
    {
        newGame();
    }

    postId = Math.floor(Math.random() * posts.length) + 1;

    if (posts[postId] == undefined || posts[postId] == null) {
        rend();
    }
    createImage(posts[postId]);
}

function check() {
    
    let tagsList = document.getElementById("tagList");
    tagsList.setAttribute("placeholder", 'Write tags separated by space ex.: anal sus head bitches etc.');

    score = scoreSum(tagsList.value, posts[postId].tags);

    document.getElementById("score").textContent = "Score: " + score;
    rend();
}

function newGame()
{
    currRound = 1;
    rounds = 15;
    if(score > highScore)
    {
        highScore = score;
        document.getElementById("highScore").textContent = highScore;
    }
    score = 0;
}

function scoreSum(ptags, rtags) {
    let tagsA = rtags.split(' ').map(element => {
        return element.toLowerCase();
    });
    let tagsB = ptags.split(' ').map(element => {
        return element.toLowerCase();
    });

    tagsA.sort(function (a, b) {
        const tag1 = a.toUpperCase(); // ignore upper and lowercase
        const tag2 = b.toUpperCase(); // ignore upper and lowercase
        if (tag1 < tag2) {
            return -1;
        }
        if (tag1 > tag2) {
            return 1;
        }
        return 0;
    });
    tagsB.sort(function (a, b) {
        const tag1 = a.toUpperCase(); // ignore upper and lowercase
        const tag2 = b.toUpperCase(); // ignore upper and lowercase
        if (tag1 < tag2) {
            return -1;
        }
        if (tag1 > tag2) {
            return 1;
        }
        return 0;
    });

    console.log("answer: " + tagsA.join());
    console.log("your answer: " + tagsB.join());

    let len = findLen();

    function findLen() {
        if (tagsA.length > tagsB.length) {
            return tagsA.length;
        }
        else {
            return tagsB.length;
        }
    }

    for (let i = 0; i < tagsB.length; i++) {
        if (tagsA.includes(tagsB[i])) {
            score += 10;
            console.log(tagsB[i]);
        }
    }
    postId = Math.floor(Math.random() * posts.length) + 1;
    return score;
}

function createImage(post) {
    let img = document.getElementById("guessImg");
    let src = post.preview_url;
    img.setAttribute("src", src);
    img.setAttribute("style", `width:auto; height:35vh;`)
    img.classList.add("d-block", "mx-auto")
    img.setAttribute("alt", "no bitches?");
}

setup();
/*
6427321
https://wimg.rule34.xxx//images/5651/e1c2fba798a67a1595b67d8759b52a80.png

file_url=       "https://api-cdn.rule34.xxx/images/5698/344cc337dd68856322751488af7f08a1.png"
sample_url=     "https://api-cdn.rule34.xxx/samples/5698/sample_344cc337dd68856322751488af7f08a1.jpg" 
preview_url=    "https://api-cdn.rule34.xxx/thumbnails/5698/thumbnail_344cc337dd68856322751488af7f08a1.jpg"
                "https://rule34.xxx//samples/5672/sample_58487cea382ce47f1b6cb90848f1d13e.jpg

                https://rule34.xxx//samples/5666/sample_6090c6c549c66aa03853ecb50709a158.jpg?6445389
                https://rule34.xxx/index.php?page=post&s=view&id=6445389
                https://api-cdn.rule34.xxx/samples/5666/sample_6090c6c549c66aa03853ecb50709a158.jpg

file_url=       "https://api-cdn-us-mp4.rule34.xxx/images/5698/3b76dc4ae58beeacebf2488900170da5.mp4"
sample_url=     "https://api-cdn.rule34.xxx/images/5698/3b76dc4ae58beeacebf2488900170da5.mp4" 
preview_url=    "https://api-cdn.rule34.xxx/thumbnails/5698/thumbnail_3b76dc4ae58beeacebf2488900170da5.jpg" 

<img src="https://api-cdn.rule34.xxx/samples/5696/sample_697280ffc68e81388739574f73ec9fff.jpg" alt="404 r34">
<img src="https://api-cdn.rule34.xxx/samples/5696/sample_551a52168671b7ef649ebeeec29f5b4f.jpg" alt="404 r34">
*/

