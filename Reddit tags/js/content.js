function searchToggleModal(){
var search_button = document.getElementById("search-modal");
search_button.click();
}


function toggleModal(){
  let modal_button = document.getElementById("activate-modal");
  modal_button.click();
}


// Function to inject the button and attach event listener
function injectButtons() {
  var mrSmSpan = document.querySelector('._1Q_zPN5YtTLQVG72WhRuf3');
  if(mrSmSpan == null){
    mrSmSpan = document.querySelector(".mr-sm");
  }
  mrSmSpan.children[0].classList.add("flex-it");
     // Insert the button inside the span with class "mr-sm"
     const openModalButton = document.createElement('button');
     openModalButton.textContent = 'Add Tags';
     openModalButton.classList.add('open-modal-button', 'btn', 'btn-primary');
    
     const searchButton = document.createElement("button");
     searchButton.textContent = "Search Tags";
     searchButton.classList.add("btn", "btn-primary");
    
     mrSmSpan.appendChild(openModalButton);
     mrSmSpan.appendChild(searchButton)

     // Event listener for button click
     openModalButton.addEventListener('click', function () {
       // This is where you can handle the button click event
       toggleModal()
 
     });

     searchButton.addEventListener("click", function(){
      searchToggleModal();
     })

  
 
}

// Execute immediately to inject the button
injectButtons();



// Create overlay div and add it to the body.
let holder = document.createElement("div");
holder.setAttribute("class", "text-center");

let div = document.createElement("div");

div.innerHTML = `
<!-- Button trigger modal -->
<button id="activate-modal" style="display:none;" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#tagsModal">
    Launch demo modal
  </button>
  <div class="magnify"> </div>
  <!-- Modal -->
  <div class="modal" id="tagsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div" class="modal-dialog  modal-dialog-centered">
      <div class="modal-content">
          <div class="modal-header"> 
          <h5 class="modal-title" id="exampleModalLabel"> Add Tags </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
          
        <main>
  <h1>Tag Inputs</h1>
  <p>Separate multiple values with a comma or press enter.</p>
  <form id="tagForm">
  <div class="ui-widget">
  <label for = "tagField">Tags: </label>
    <input type="text" id="tagField"/>
    </div>
  </form>
  <div class="tags"></div>
</main>
    
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="save_button" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
      </div>

        </div>
        </div>
      </div>
    </div>
  </div>
   
`
holder.appendChild(div);


let div2 = document.createElement("div");

div2.innerHTML = `
<!-- Button trigger modal -->
<button id="search-modal" style="display:none;" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#searchModal">
    Launch demo modal
  </button>
  <div class="magnify"> </div>
  <!-- Modal -->
  <div class="modal" id="searchModal" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
    <div" class="modal-dialog  modal-dialog-centered">
      <div class="modal-content">
          <div class="modal-header"> 
          <h5 class="modal-title" id="searchModalLabel"> Add Tags </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
          
        <main>
  <h1>Search With Tags</h1>
  <form id="searchForm">
  <div class="ui-widget">
    <input type="text" id="searchTagsInput"/>
    </div>
  </form>
  <div style="display:none;" id="tagsResults">
  <p>Result</p>
  <input type="text" id="searchTagsResults"/>
  <button id="copy-text">Copy Text</button>

  </div>
  <div class="search"></div>
</main>
    
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="save_button2" type="button" class="btn btn-primary">Search</button>
      </div>

        </div>
        </div>
      </div>
    </div>
  </div>
   
`

holder.appendChild(div2);
document.body.appendChild(holder);

const tagWrapper = document.querySelector('.tags');
const tagForm = document.querySelector('#tagForm');
const tagField = document.querySelector('#tagField');

tagField.addEventListener('keyup', (e) => {
  e.target.value.replace(/.*,/g, match => {
    match = match.trim();
    match = match.substr(0, match.length - 1);
    
    addTag(match);
    
    e.target.value = '';
    return '';
  });                       
});

tagForm.addEventListener('submit', function(e) {
  addTag(tagField.value);
  tagField.value = '';
  e.preventDefault();
});

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
    tagWrapper.appendChild(newTag);
  }
}

