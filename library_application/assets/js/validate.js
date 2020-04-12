// Begin Validation
function validateForm() {
  // Check on pattern and empty
  if (checkNotEmpty() && checkPattern()) {
    return true;
  } else {
    return false;
  }

  // Check on empty boolean
  function checkNotEmpty() {
    if(document.validate_Adminform.isbn.value == ""){
      alertisbn();
      return false;
    }
    // if (document.validate_Adminform.first_name.value == "" && document.validate_Adminform.last_name.value == "") {
    //     alertname();
    //     return false;
    // }
    if(document.validate_Adminform.title.value == "" ){
      alerttitle();
      return false;
    }
    if(document.validate_Adminform.description.value == "" ){
      alertdescription();
      return false;
    }
    else {
      return true;
    }
  }

  // Check patterns boolean
  function checkPattern() {
    var isbn_reg_ex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    var name_reg_ex = /^[a-zA-Z \u00C0-\u00ff]+$/; // needed for first/last name, title (genre&status)?
    var description_reg_ex = /^[A-Za-z0-9\.\-\s\n\?]{1,190}$/;
    
    if(isbn_reg_ex.test(document.validate_Adminform.isbn.value) == false){
      alertisbn();
      return false;
    }
    // if (name_reg_ex.test(document.validate_Adminform.first_name.value) == false) {
    //   alertname();
    //   return false;
    // }
    // if (name_reg_ex.test(document.validate_Adminform.last_name.value) == false) {
    //   alertname();
    //   return false;
    // }
    if (name_reg_ex.test(document.validate_Adminform.title.value) == false) {
      alerttitle();
      return false;
    }
    // if (name_reg_ex.test(document.validate_Adminform.genre.value) == false) {
    //     alertgenre();
    //     return false;
    // }
    // if (name_reg_ex.test(document.validate_Adminform.status.value) == false) {
    //   alertstatus();
    //   return false;
    // }
    if (description_reg_ex.test(document.validate_Adminform.description.value) == false) {
      alertdescription();
      return false;
    }
    else {
      return true;
    }
  }

  // ALERTS
  function alertisbn() {
    bootbox.alert({
      size: "small",
      message: "<h4>You have made a mistake with the ISBN</h4>",
      callback: function() {
        /* your callback code */
      }
    });
  }
  // function alertname() {
  //   bootbox.alert({
  //     size: "small",
  //     message: "<h4>You have made a mistake with the first or last name of the writer</h4>",
  //     callback: function() {
  //       /* your callback code */
  //     }
  //   });
  // }
  function alerttitle() {
    bootbox.alert({
      size: "small",
      message: "<h4>You have made a mistake with the book title</h4>",
      callback: function() {
        /* your callback code */
      }
    });
  }
  // function alertgenre() {
  //   bootbox.alert({
  //     size: "small",
  //     message: "<h4>You have made a mistake with the genre</h4>",
  //     callback: function() {
  //       /* your callback code */
  //     }
  //   });
  // }
  // function alertstatus() {
  //   bootbox.alert({
  //     size: "small",
  //     message: "<h4>You have made a mistake with the book status</h4>",
  //     callback: function() {
  //       /* your callback code */
  //     }
  //   });
  // }
  function alertdescription() {
    bootbox.alert({
      size: "small",
      message: "<h4>You have made a mistake with the description</h4>",
      callback: function() {
        /* your callback code */
      }
    });
  }
}
