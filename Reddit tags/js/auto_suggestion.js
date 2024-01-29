function injectDataList(items){
  var datalist = document.createElement("datalist");
  datalist.id = "tagsDB";
  for(var i = 0 ; i <items.length; i ++){
    var current_option = document.createElement("option");
    current_option.value = items[i];
    datalist.appendChild(current_option);
  }

  document.body.appendChild(datalist);
}



// Function to get all tags from the 'reddittags' store
async function getAllTags() {
  try {
    // Use 'await' to wait for the promise to resolve
    const allItems = await db.reddittags.toArray();

    // Initialize a Set to store all tags
    const allTagsSet = new Set();

    // Iterate through each item and add its tags to the Set
    allItems.forEach(item => {
      item.tags.forEach(tag => {
        allTagsSet.add(tag);
      });
    });

    // Return the Set of all tags
    return allTagsSet;
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    throw error; // Propagate the error if needed
  }
}


(async () => {
  try {

    await getAllTags().then(function(allTags){
      const arrayTags = Array.from(allTags);
      $("#searchTagsInput").autocomplete({
        source: arrayTags,
        minLength: 1
      })

      injectDataList(arrayTags);
    });
      
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
  }
})();

// TODO: Autosuggestion not working.


function get_search_input(){
  var search_input = document.getElementById("searchTagsInput").value;
  let s = search_input.split("+");
  if(s.length>0){
    return s
  }else{
      return search_input.trim()
  }
}


// Get all items in db.
async function getSubredditsWithTags(){
  // const listOfTags2 = get_search_input();
  const listOfTags = get_search_tags_from_modal()
  console.log(listOfTags);
  // console.log(listOfTags2);
  var results = [];
  const allItems = await db.reddittags.toArray();

  for(var ai = 0; ai<allItems.length; ai++){
    for(var t = 0; t<listOfTags.length; t++){
      var current_item = allItems[ai];
      var currentTags = Array.from(current_item.tags)
      for(var ct = 0; ct<currentTags.length; ct++){
        var current_tag = currentTags[ct];
        if(current_tag == listOfTags[t]){
          results.push(current_item.subreddit);
        }
      }
    }
  }
  // Concat results in the 
  return results.join('+');
}


function copyText() {
  // Get the input element by its id
  var inputElement = document.getElementById("searchTagsInput");

  // Select the text in the input element
  inputElement.select();
  inputElement.setSelectionRange(0, 99999); // For mobile devices

  // Copy the selected text to the clipboard
  document.execCommand('copy');

  // Deselect the input field
  inputElement.setSelectionRange(0, 0);
}

var copy_button = document.querySelector("#copy-text");
copy_button.addEventListener("click", copyText)
var div_results = document.querySelector("#resultsContainer");
var search_tag_results = document.querySelector("#resultField")
var search_tag_button = document.querySelector("#save_button2");
search_tag_button.addEventListener('click', function(){
  getSubredditsWithTags().then(function(results){
    search_tag_results.value = results;
    div_results.style.display = "block";
  })
});


function get_search_tags_from_modal(){
  const found_tags_elements = document.getElementsByClassName("search-tag")
  var found_tags = new Set()
  for(var i = 0; i < found_tags_elements.length; i++){
      found_tags.add(found_tags_elements[i].textContent);
  }
  return Array.from(found_tags);
}

const searchWrapper = document.querySelector('.search');
const searchForm = document.querySelector('#searchForm');
const searchField = document.querySelector('#searchField');


searchField.addEventListener('keyup', (e) => {
  e.target.value.replace(/.*,/g, match => {
    match = match.trim();
    match = match.substr(0, match.length - 1);
    
    addSearchTag(match);
    
    e.target.value = '';
    return '';
  });                       
});

searchForm.addEventListener('submit', function(e) {
  addSearchTag(searchField.value);
  searchField.value = '';
  e.preventDefault();
});


function addSearchTag(tag) {
  tag = tag || '';

  if (tag.length > 0) {
    let newTag = document.createElement('span');
    newTag.classList.add('search-tag');
    let newText = document.createTextNode(tag);
    newTag.append(newText);
    // Remove tag on click.
    newTag.addEventListener('click', () =>{
      newTag.remove();
    })
    searchWrapper.appendChild(newTag);
  }
}






