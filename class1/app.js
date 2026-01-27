let SUPABASE_URL='https://vtsmcabpewlzoolbpvpb.supabase.co'
let SUPABASE_ANON_KEY = 'sb_publishable_Y7AXOMS7OXm1LthZYjX61g_hWnzVrwf'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY )



var cardBg;
function deletePost() {
  console.log(event.target.parentNode.parentNode);
  var card = event.target.parentNode.parentNode;
  card.remove();
}
function editPost() {
  var card = event.target.parentNode.parentNode;
  var title = card.childNodes[3].childNodes[1].innerHTML;
  var description = card.childNodes[3].childNodes[3].innerHTML;
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  card.remove()
}
function post() {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var posts = document.getElementById("posts");
  console.log(title, description);
  if (title.trim() && description.trim()) {
    posts.innerHTML += `<div class="card m-2">
              <div class="card-header">@Post</div>
              <div style="background-image: url(${cardBg});"  class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
              </div>
              <div class="ms-auto m-2">
                  <button onclick="editPost()" class="btn btn-success">Edit</button>
                  <button onclick="deletePost()" class="btn btn-danger">Delete</button>
               </div>
            </div>`;
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
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
  console.log(cardBg);
  var bgImg = document.getElementsByClassName("bgImg");
  for (var i = 0; i < bgImg.length; i++) {
    bgImg[i].className = "bgImg";
  }
  event.target.classList.add("selectedImg");
}
