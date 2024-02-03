// Get the elements from the HTML document

let tweetText = document.querySelector(".tweet_text");
let postButton = document.querySelector(".button-18");
let appTwtPost = document.querySelector("#app_twt_post");
const commentForms = document.querySelectorAll('.comment-section form');
function addComment(tweet, commentContent) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    const commentText = document.createElement('p');
    commentText.textContent = commentContent;
    commentDiv.appendChild(commentText);
    tweet.querySelector('.comments').appendChild(commentDiv);
}

// Get the elements from the HTML document
const tweetForm = document.querySelector('.tweet-form');

function addTweet(content) {
    const tweetDiv = document.createElement('div');
    tweetDiv.classList.add('TweetPost');
    const tweetText = document.createElement('p');
    tweetText.textContent = content;
    const comments = document.createElement('div');
    comments.classList.add('comments');
    tweetDiv.appendChild(tweetText);
    tweetDiv.appendChild(comments);
    appTwtPost.appendChild(tweetDiv);
}


commentForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const tweet = e.target.closest('.TweetPost');
        const commentContent = e.target.querySelector('textarea').value;
        if (commentContent) {
            addComment(tweet, commentContent);
            e.target.querySelector('textarea').value = '';
        }
    });
});
function textCounter () {
    let limit = 100;
    let field = document.getElementById("tweet_text");
    console.log("called");
    let count = document.getElementById("char-count")
    if (field.innerText.length > limit)
        field.innerText = field.innerText.substring (0, limit);

    count.innerText = (limit - field.innerText.length) + "/100";

    if (field.innerText.length >= limit) {
        count.style.color = "red";
    } else {
        count.style.color = "black";
    }
}

postButton.addEventListener("click", function() {
    let tweetContent = tweetText.textContent;

    if (tweetContent && tweetContent.length <= 100) {
        let tweetDiv = document.createElement("div");
        tweetDiv.style.border = "solid 1px black";
        tweetDiv.style.borderRadius = "2%";
        tweetDiv.style.width = "500px";
        tweetDiv.style.margin = "10px";
        tweetDiv.style.padding = "10px";
        tweetDiv.classList.add("tweet");
        let tweetPara = document.createElement("p");
        console.log(tweetContent)
        tweetPara.textContent = tweetContent;
        tweetDiv.appendChild(tweetPara);
        appTwtPost.prepend(tweetDiv);
        tweetText.textContent = "";
    } else {
        alert("Please enter a valid tweet (not empty and less than 100 characters)");
    }
});
