// const db = new Dexie('redditDB');

// function get_search_input(){
//     let search_input = document.getElementById("searchInput").textContent;

//     if(search_input.includes("+")){
//         return search_input.split("+");


//     }else{
//         return [search_input.trim()]
//     }
  
//   }
  
  
//   // Get all items in db.
//   async function getSubredditsWithTags(){
//     const listOfTags = get_search_input();
//     var results = [];
//     const allItems = await db.reddittags.toArray();
  
  
//     for(var ai = 0; ai<allItems.length; ai++){
//       for(var t = 0; t<listOfTags.length; t++){
//         var current_item = allItems[ai];
//         var currentTags = Array.from(current_item.tags)
//         for(var ct = 0; ct<currentTags.length; ct++){
//           var current_tag = currentTags[ct];
//           if(current_tag == listOfTags[t]){
//             results.push(current_item.subreddit);
//           }
//         }
//       }
//     }
//     // Concat results in the 
//     return results.join('+');
//   }


// var search_button = document.getElementById("searchInput");
// search_button.addEventListener("click", getSubredditsWithTags)
