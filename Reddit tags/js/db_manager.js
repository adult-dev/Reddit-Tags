// Define the Dexie.js database
const db = new Dexie('redditDB');
var tagWrapper2 = document.querySelector('.tags');

// Define the structure of the database (including the "reddittags" store with "url" and "tags" fields)
db.version(1).stores({
  reddittags: 'subreddit, tags',
});

function get_current_subreddit(){
    const current_url = window.location.href;
    var s = current_url.split("/")
    return s[s.length-2];
}

function add_to_db(){
    const current_subreddit = get_current_subreddit()
    const tags = get_tags_from_modal()
    const data = {"subreddit": current_subreddit, "tags": tags}

    if(tags.size>0){
        db.reddittags.put(data);

    }else{
        console.log("no tags found..");
    }

}

function get_from_db(subreddit){
    return db.reddittags.get(subreddit)
}

function update_from_db(data){
db.reddittags.update(data['subreddit'], {"tags" : data['tags']})
}

function get_tags_from_modal(){
    const found_tags_elements = document.getElementsByClassName("reddit-tag")
    var found_tags = new Set()
    for(var i = 0; i < found_tags_elements.length; i++){
        found_tags.add(found_tags_elements[i].textContent);
    }
    return found_tags
}

function addTag(tag) {
    tag = tag || '';
  
    if (tag.length > 0) {
      let newTag = document.createElement('span');
      newTag.classList.add('reddit-tag');
      let newText = document.createTextNode(tag);
      newTag.append(newText);
      // Remove tag on click.
      newTag.addEventListener('click', () =>{
        newTag.remove();
      })
      tagWrapper2.appendChild(newTag);
    }
  }
 
// Set tags to modal if it exists.
function set_tags_to_modal(){
    const current_subreddit = get_current_subreddit()
    const tags = get_from_db(current_subreddit);
    if(tags){
        for(var i = 0; i< tags.length; i++){
            addTag(tags[i])
        }
    }
}

var save_button = document.getElementById("save_button");
save_button.addEventListener("click", add_to_db)


set_tags_to_modal();