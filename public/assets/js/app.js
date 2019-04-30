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