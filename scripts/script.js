// Replace with the actual URL to your JSON data
const DATA_URL = "https://novashova.github.io/devBlogData/blog-entries.json";

// DOM references
const blogList = document.getElementById("blogList");
const postForm = document.getElementById("postForm");

// Fetch and display blog data
async function loadBlogPosts() {
  try {
    const res = await fetch(DATA_URL);
    const posts = await res.json();
    displayPosts(posts);
  } catch (err) {
    blogList.innerHTML = `<p class="text-danger">Failed to load blog data.</p>`;
    console.error("Fetch error:", err);
  }
}

// Display posts in DOM
function displayPosts(posts) {
  blogList.innerHTML = "";
  posts.forEach((post, index) => {
    const postCard = document.createElement("div");
    postCard.className = "card mb-3";
    postCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
        <p class="card-text">${post.content}</p>
        <p class="text-muted small">Tags: ${post.tags.join(", ")}</p>
        <button class="btn btn-sm btn-danger" onclick="deletePost(${index})">Delete</button>
      </div>
    `;
    blogList.appendChild(postCard);
  });
}

// Temporary in-session blog array
let blogData = [];

// Delete post (in-session)
function deletePost(index) {
  blogData.splice(index, 1);
  displayPosts(blogData);
}

// Handle Add Post form
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = postForm.title.value.trim();
  const date = postForm.date.value;
  const content = postForm.content.value.trim();
  const tags = postForm.tags.value.split(",").map(t => t.trim());

  if (title && date && content) {
    const newPost = { title, date, content, tags };
    blogData.unshift(newPost);
    displayPosts(blogData);
    postForm.reset();
  } else {
    alert("Please fill out all fields.");
  }
});

// Initialize
window.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch(DATA_URL);
  blogData = await res.json();
  displayPosts(blogData);
});