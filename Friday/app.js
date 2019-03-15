let newsListUL = document.getElementById('newsListUL')

function displayData(){
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    .then(response => response.json())
    .then(storyIdList => {
        urlList = [] 
        storyIdList.forEach(row => {
            urlList.push("https://hacker-news.firebaseio.com/v0/item/"+row+".json?print=pretty")          
        });
        return urlList
    })
    .then(urlList2 => {
        urlList2.forEach(x => {
            fetch(x)
            .then(response => response.json())
            .then(response2 => {
            newsListUL.innerHTML = newsListUL.innerHTML + `<li>
            <span class = 'title'><a target='_blank' href = '${response2.url}'>${response2.title}</a></span>
            <span class = 'author'>Author: ${response2.by}</span>
            <span class = 'time'>Posted: ${Date(response2.time * 1000)}</span>
        </li>`})

        });
    })
}