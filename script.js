document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('postForm').addEventListener('submit', function(e) {
        e.preventDefault();
        createPost();
    });
});

function createPost() {
    const postTextValue = document.getElementById('postText').value;
    if (!postTextValue) return;

    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <p class="post-content">${postTextValue}</p>
        <div class="actions">
            <span onclick="toggleLike(this)"><i class="fa fa-thumbs-up"></i> Like</span>
            <span onclick="editPost(this)"><i class="fa fa-edit"></i> Edit</span>
            <span onclick="deletePost(this)"><i class="fa fa-trash"></i> Delete</span>
        </div>
        <div class="comments"></div>
        <textarea class="comment-input" placeholder="Add a comment..."></textarea>
        <button onclick="addComment(this, null)">Comment</button>
    `;
    document.getElementById('postsContainer').prepend(postElement);
    document.getElementById('postText').value = '';
}

function addComment(button, parentId) {
    const commentInputSelector = parentId ? `#comment-input-${parentId}` : '.comment-input';
    const commentInput = button.closest('.post, .comment').querySelector(commentInputSelector);
    const commentsContainerSelector = parentId ? `#comments-container-${parentId}` : '.comments';
    const commentsContainer = button.closest('.post, .comment').querySelector(commentsContainerSelector);

    if (commentInput.value) {
        const commentId = Date.now(); // Simple way to generate a unique ID for each comment
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.setAttribute('id', `comment-${commentId}`);
        commentElement.innerHTML = `
            <p>${commentInput.value}</p>
            <div class="actions">
                <span onclick="toggleLike(this)"><i class="fa fa-thumbs-up"></i> Like</span>
                <span onclick="deletePost(this)"><i class="fa fa-trash"></i> Delete</span>
            </div>
            <div class="nested-comments" id="comments-container-${commentId}"></div>
            <textarea class="nested-comment-input" id="comment-input-${commentId}" placeholder="Reply to this comment..."></textarea>
            <button onclick="addComment(this, '${commentId}')">Reply</button>
        `;
        commentsContainer.appendChild(commentElement);
        commentInput.value = ''; // Clear input after adding comment
    } else {
        alert('Comment cannot be empty.');
    }
}

function toggleLike(element) {
    element.classList.toggle('liked');
    if (element.classList.contains('liked')) {
        element.innerHTML = `<i class="fas fa-thumbs-up"></i> Liked`;
    } else {
        element.innerHTML = `<i class="fa fa-thumbs-up"></i> Like`;
    }
}

function deletePost(element) {
    if (confirm('Are you sure you want to delete this post/comment?')) {
        element.closest('.post, .comment').remove();
    }
}

let currentlyEditingPost = null;

function savePost(element, editInput, postContent, originalContent) {
    const updatedContent = editInput.value.trim();
    if (updatedContent) {
        postContent.innerHTML = updatedContent;
        element.innerHTML = `<i class="fa fa-edit"></i> Edit`;
        element.onclick = function() {
            editPost(element);
        };
    } else {
        postContent.innerHTML = originalContent; // Restore original content if new content is empty
        alert('Post content cannot be empty.');
    }

    editInput.replaceWith(postContent);
    currentlyEditingPost = null;

}


function  editPost(element) {
    if (currentlyEditingPost) {
        alert('Finish editing the current post first.');
        return;
    }

    const postContent = element.closest('.post').querySelector('.post-content');
    const editInput = document.createElement('textarea');
    editInput.value = postContent.textContent;
    postContent.replaceWith(editInput);
    element.innerHTML = `<i class="fa fa-save"></i> Save`;
    element.onclick = () => savePost(element, editInput, postContent);
    currentlyEditingPost = element;
}
