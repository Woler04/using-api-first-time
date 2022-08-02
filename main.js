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
var posts
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    var root = document.getElementById("root");
    
    xhttp.open("GET", "https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1000&tags=genshin_impact", false);
    xhttp.send();
    posts = xhttp.responseXML.getElementsByTagName("post");
    
    //let i = Math.floor(Math.random() * posts.length) + 1;
    //console.log(i);
    //let url = posts[i].getAttribute("preview_url");
    //let img = document.getElementById("mainImage");
    //img.setAttribute("src", url); 
    //img.setAttribute("alt", "404 r34"); 

    for (const i in posts) {
        root.append(addImage(posts[i].getAttribute("preview_url")));
    }
}

function addImage(url)
{
    let img = document.createElement("img");
    img.setAttribute("src", url); 
    img.setAttribute("alt", "404 r34");
    return img;
}

loadDoc();

/*
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

