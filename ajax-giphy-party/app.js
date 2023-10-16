console.log("Let's get this party started!");

const $gifArea = $("#gif-area");
const $searchInput = $("#search");

// Uses AJAX result to add a gif:

function addGif(results) {
    let numResults = results.data.length;
    if (numResults) {
        let randomIdx = Math.floor(Math.random() * numResults);  // gets a random gif
        let $newColumn = $("<div>", { class: "col-md-4 col-12 mb-4"});
        let $newGif = $("<img>", {
            src: results.data[randomIdx].images.original.url,
            class: "w-100"
        });
        $newColumn.append($newGif);
        $gifArea.append($newColumn);
    }
}

// handles form submission: clear search box & make AJAX call

$("form").on("submit", async function(e) {
    e.preventDefault();

    let searchTerm = $searchInput.val();
    $searchInput.val("");

    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: searchTerm,
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    });
  addGif(response.data); 
});

//Remove gif:

$("#remove").on("click", function() {
    $gifArea.empty();
});