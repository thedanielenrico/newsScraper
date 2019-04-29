$(".saveBtn").on("click", function(){
const id = $(this).data("id");
// $.get("/save/" + id, function(data){
//     console.log(data)
// })

$.ajax({
    method: 'PUT',
    url: "/save/" + id,
    // data: {
    //     saved: true
    // }
  }).then(function (data) {

    console.log(data);
  })

})