$(document).ready(function() {
  // will run if the delete button was clicked
  $(document).on("click", ".delete-book-button", function() {
    // get the product id
    var id = $(this).attr("data-id");
    //bootbox for good looking 'confirm pop up'
    bootbox.confirm({
      message: "<h4>Are you sure?</h4>",
      buttons: {
        confirm: {
          label: '<span class="glyphicon glyphicon-ok"></span> Yes',
          className: "btn-danger"
        },
        cancel: {
          label: '<span class="glyphicon glyphicon-remove"></span> No',
          className: "btn-primary"
        }
      },
      callback: function(result) {
        if (result === true) {
          // send delete request to api / remote server
          $.ajax({
            url: "http://178.18.138.113:8080/libraryBackend/list/"+id,
            type: "DELETE",
            dataType: "json",
            // data: JSON.stringify({ id: id }),
            success: function(result) {
              // re-load list of products
              showProductsFirstPage();
              console.log(data)
            },
            error: function(xhr, resp, text) {
              console.log(xhr, resp, text);
            }
          });
        }
      }
    });
  });
});
