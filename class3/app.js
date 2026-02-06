let SUPABASE_URL = "https://ingjdyteycutgcfwghxt.supabase.co";
let SUPABASE_ANON_KEY = "sb_publishable_tET2uORt-m94WhD8qnRlKA_DFyMF3LO";
var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

var cardBg;
var editId;
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const { data, error } = await supabase.from("post").select("*").order('id', { ascending: false });
    console.log(data);
    data.forEach((post) => {
      var posts = document.getElementById("posts");
      posts.innerHTML += `
            <div class="card m-2">
              <div class="card-header">@Post ${post.id}</div>
              <div style="background-image: url(${post.img_url});"  class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.description}</p>
              </div>
              <div class="ms-auto m-2">
                  <button onclick="editPost(event, ${post.id})" class="btn btn-success">Edit</button>
                  <button onclick="deletePost(event, ${post.id})" class="btn btn-danger">Delete</button>
               </div>
            </div>
            `;
    });

    if (error) console.log(error);
  } catch (error) {
    console.log(error);
  }
});

async function deletePost(event, id) {
  try {
    //delete from supabase
    const { data, error } = await supabase.from("post").delete().eq("id", id);
    console.log(event);
    if (error) console.log("delete error", error);

    console.log(event.target.parentNode.parentNode);
    var card = event.target.parentNode.parentNode;
    card.remove();
  } catch (error) {
    console.log(error);
  }
}
function editPost(event, id) {
  var card = event.target.parentNode.parentNode;
  var title = card.childNodes[3].childNodes[1].innerHTML;
  var description = card.childNodes[3].childNodes[3].innerHTML;
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  card.remove();
  editId = id;
}
async function post() {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var posts = document.getElementById("posts");
  console.log(title, description);
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
  if (title.trim() && description.trim()) {
    try {
      if (editId) {
        const { data, error } = await supabase
          .from("post")
          .update({ title, description, img_url: cardBg })
          .eq("id",editId)
          .select("*");
          editId = null
      } else {
        const { data, error } = await supabase
          .from("post")
          .insert({ title, description, img_url: cardBg })
          .select("*");
        console.log(data[0]);
        if (error) console.log("Post error: ", error);
      }

      
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
    } catch (error) {
      console.log(error);
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
  console.log(cardBg);
  var bgImg = document.getElementsByClassName("bgImg");
  for (var i = 0; i < bgImg.length; i++) {
    bgImg[i].className = "bgImg";
  }
  event.target.classList.add("selectedImg");
}
