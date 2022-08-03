var posts;
var score = 0;
var highScore = 0;
var postId = 0;
var currRound = 1;
const currRoundText = document.getElementById("currRound");
const roundText = document.getElementById("rounds");
const roundRange = document.getElementById("roundRange");
const pid = Math.floor(Math.random() * 200) + 1;

function setup() {
    currRoundText.textContent = currRound;
    roundRange.value = 15;
    roundText.textContent = roundRange.value;
    url = 'https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=1000&pid=' + pid;
    getJSON(url,
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
    xhr.send();
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
};

function rend() {
    if (currRound > roundRange.value) {
        newGame();
    }
    currRoundText.textContent = currRound++;

    postId = Math.floor(Math.random() * posts.length);

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

function newGame() {
    currRound = 1;
    roundText.textContent = roundRange.value;
    if (score > highScore) {
        highScore = score;
        document.getElementById("highScore").textContent = highScore;
    }
    score = 0;
    document.getElementById("score").textContent = "Score: " + score;
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
    document.getElementById("prvTags").textContent = tagsA.join(' ');

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
    img.setAttribute("style", `width:auto; height:35vh;`);
    img.setAttribute("alt", "no bitches?");
    document.getElementById("r34page").textContent = post.file_url;
    document.getElementById("r34page").setAttribute("href", post.file_url);
}

function sliderChange() {
    if (roundRange.value <= currRound) {
        document.getElementById("roundRangeValue").textContent = roundRange.value + " IF LESS THAN/OR EQUAL TO CURENT ROUND IT WILL APPLY AFTER THE GAME";
        return;
    }
    roundText.textContent = roundRange.value;
    document.getElementById("roundRangeValue").textContent = roundRange.value;
}

setup();