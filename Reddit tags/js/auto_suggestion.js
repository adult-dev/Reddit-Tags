

function injectDataList(items){
  console.log(items);
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
      console.log(arrayTags);
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
  const listOfTags = get_search_input();
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
var div_results = document.querySelector("#tagsResults");
var search_tag_results = document.querySelector("#searchTagsResults")
var search_tag_button = document.querySelector("#save_button2");
search_tag_button.addEventListener('click', function(){
  getSubredditsWithTags().then(function(results){
    search_tag_results.value = results;
    div_results.style.display = "block";
  })
});




