let SUPABASE_URL = "https://ingjdyteycutgcfwghxt.supabase.co";
let SUPABASE_ANON_KEY = "sb_publishable_tET2uORt-m94WhD8qnRlKA_DFyMF3LO";
var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

var cardBg;

// Fetch and display posts on page load
async function getPosts() {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = `<div class="text-center mt-5"><div class="spinner-border" role="status"></div></div>`;

  try {
    const { data, error } = await supabase
      .from("post")
      .select("*")
      .order('created_at', { ascending: false });

    if (error) throw error;

    postsContainer.innerHTML = "";
    if (data.length === 0) {
      postsContainer.innerHTML = "<p class='text-center mt-5'>No posts yet.</p>";
      return;
    }

    data.forEach(postItem => {
      displayPost(postItem);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    postsContainer.innerHTML = "<p class='text-center text-danger'>Error loading posts.</p>";
  }
}

function displayPost(postItem) {
  const postsContainer = document.getElementById("posts");
  const postHtml = `
    <div class="card m-2 shadow-sm" id="post-${postItem.id}">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span>@Post</span>
        <small class="text-muted">${new Date(postItem.created_at || Date.now()).toLocaleDateString()}</small>
      </div>
      <div style="background-image: url(${postItem.img_url}); min-height: 150px;" class="card-body">
        <h5 class="card-title">${postItem.title}</h5>
        <p class="card-text">${postItem.description}</p>
      </div>
      <div class="ms-auto m-2">
        <button onclick="editPost('${postItem.id}')" class="btn btn-success btn-sm">Edit</button>
        <button onclick="deletePost('${postItem.id}')" class="btn btn-danger btn-sm">Delete</button>
      </div>
    </div>`;
  postsContainer.insertAdjacentHTML('afterbegin', postHtml);
}

async function deletePost(id) {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#263238',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    try {
      const { error } = await supabase
        .from("post")
        .delete()
        .eq("id", id);

      if (error) throw error;

      const card = document.getElementById(`post-${id}`);
      if (card) card.remove();

      Swal.fire(
        'Deleted!',
        'Your post has been deleted.',
        'success'
      );
    } catch (error) {
      console.error("Error deleting post:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! " + error.message,
      });
    }
  }
}

async function editPost(id) {
  // Simple edit: load into form and delete the old one (as the original code seemed to intend or start doing)
  // For a real edit functionality, we should change the 'Post' button to 'Update'
  // But let's first fix what the user asked for.
  const card = document.getElementById(`post-${id}`);
  const title = card.querySelector('.card-title').innerText;
  const description = card.querySelector('.card-text').innerText;

  document.getElementById("title").value = title;
  document.getElementById("description").value = description;

  // Note: This logic is from the original code - it removes the card when editing.
  // Ideally, we'd update it in place, but I'll stick to the original style unless asked to improve.
  // However, removing it only from DOM without deleting from Supabase is bad.
  // I will just leave it as is for now regarding edit, or maybe improve it slightly.

  // For now, let's focus on Delete.
}

async function post() {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;

  if (title.trim() && description.trim()) {
    try {
      const { data, error } = await supabase
        .from("post")
        .insert({ title, description, img_url: cardBg })
        .select("*");

      if (error) throw error;

      if (data && data.length > 0) {
        displayPost(data[0]);
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        // Reset selected images
        var bgImages = document.getElementsByClassName("bgImg");
        for (var i = 0; i < bgImages.length; i++) {
          bgImages[i].classList.remove("selectedImg");
        }
        cardBg = null;
      }
    } catch (error) {
      console.error("Error creating post:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Empty Post...",
      text: "Enter title & description",
    });
  }
}

function selectImg(src) {
  cardBg = src;
  var bgImg = document.getElementsByClassName("bgImg");
  for (var i = 0; i < bgImg.length; i++) {
    bgImg[i].classList.remove("selectedImg");
  }
  event.target.classList.add("selectedImg");
}

// Initialize posts on load
document.addEventListener("DOMContentLoaded", getPosts);
