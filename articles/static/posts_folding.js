let posts = document.getElementsByClassName("one-post");

for (let i = 0; i < posts.length; i++) {
   
   posts[i].getElementsByClassName("fold-button")[0].onclick = function(event) {
      if (event.target.parentElement.className == "one-post folded") {
         event.target.parentElement.className = "one-post";
         event.target.innerHTML = "Fold";
      } else {
         event.target.parentElement.className = "one-post folded";
         event.target.innerHTML = "Unfold";
      }
   };
};
