$(".saveBtn").on("click", function () {
    const id = $(this).data("id");
    // $.get("/save/" + id, function(data){
    //     console.log(data)
    // })

    $.ajax({
        method: 'POST',
        url: "/save/" + id,
    }).then(function (data) {
        if (data.ok) {
            location.reload();
        }
    })

});



$(".deleteArticleBtn").on("click", function () {
    const id = $(this).data("id");

    $.ajax({
        method: 'POST',
        url: "/delete/" + id,
    }).then(function (data) {
        if (data.ok) {
            location.reload();
        }
    })
});

$(".saveNoteBtn").on("click", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/note/" + thisId,
        data: {
            // Value taken from note textarea
            body: $(".noteText").val()
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});

$(".modalBtn").on("click", function () {
    const articleId = $(this).data("id");
    $("#modal").modal("show");
    $("#articleNoteTitle").text($(this).data("title"));
    $("#saveNoteBtn").on("click", function () {
        console.log(articleId)
    })
})