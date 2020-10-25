$(document).ready(function(){
  $(".checklist").hide();
  $(".fa-exclamation-triangle").hide();
  $(".confirmation").hide();

  // ---------------------------> functions for input validation and border color change

  function validateFirstName() {
    var reg = /^[a-z][a-z]+((\s)?([a-z])+(\.)?)*$/i;
    if (reg.test( $("#firstName").val()) ) {
      $("#firstName").removeClass("red-border").addClass("green-border");
    } else {
      $("#firstName").removeClass("green-border").addClass("red-border");
      return false;
    }
    return true;
  }

  function validateLastName() {
    var reg = /^[a-z]+((\s)?((\'|\-|\.)?([a-z])+))*$/i;
    if (reg.test( $("#lastName").val()) ) {
      $("#lastName").removeClass("red-border").addClass("green-border");
    } else {
      $("#lastName").removeClass("green-border").addClass("red-border");
      return false;
    }
    return true;
  }

  function validateEmail() {
    var reg = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+\.[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
    if (reg.test( $("#email").val()) ) {
      $("#email").removeClass("red-border").addClass("green-border");
    } else {
      $("#email").removeClass("green-border").addClass("red-border");
      return false;
    }
    return true;
  }

  function validateAddress() {
    if (!$("#address").val() || $("#address").val().length > 10) {
      $("#address").removeClass("red-border").addClass("green-border");
    } else if ($("#address").val().length > 0 || $("#address").val().length < 11) {
      $("#address").removeClass("green-border").addClass("red-border");
      return false;
    }
    return true;
  }

  // First, validate password conditions and change hints color
  function validatePassConditions(inputPassword) {
    var password = inputPassword.val().toLowerCase();
    var oneNum = password.match(/\d/g);
    var threeSpecial = password.match(/([^\w\s](.*)?){3,}/g);
    var space = password.match(/[^\s]/g);
    var firstName = $("#firstName").val().toLowerCase().replace(/\s/g, "");
    var lastName = $("#lastName").val().toLowerCase().replace(/\s/g, "");
    var all_pass = true;

    if ( password.length > 9 ) {
      $('#length').removeClass('invalid').addClass('valid');
    } else {
      $('#length').removeClass('valid').addClass('invalid');
      var all_pass = false;
    }

    if (oneNum) {
      $('#oneNum').removeClass('invalid').addClass('valid');
    } else {
      $('#oneNum').removeClass('valid').addClass('invalid');
      var all_pass = false;
    }

    if (threeSpecial) {
      $('#threeSpecial').removeClass('invalid').addClass('valid');
    } else {
      $('#threeSpecial').removeClass('valid').addClass('invalid');
      var all_pass = false;
    }

    if (space) {
     $('#space').removeClass('invalid').addClass('valid');
    } else {
     $('#space').removeClass('valid').addClass('invalid');
     var all_pass = false;
    }

    if (password.includes(firstName) === false || password.includes(lastName) === false) {
      $('#containNames').removeClass('invalid').addClass('valid');
    } else {
      $('#containNames').removeClass('valid').addClass('invalid');
      var all_pass = false;
    }
    return all_pass;
  }

  // Then validate Password
  function validatePassword() {
    if (validatePassConditions($("#pass")) === true) {
      $("#pass").removeClass("red-border").addClass("green-border");
    } else {
      $("#pass").removeClass("green-border").addClass("red-border");
      return false;
    }
    return true;
  }

  //prevent copy and paste (Password)
    $('#pass').bind('copy paste cut', function(e) {
      e.preventDefault();
      alert('cut, copy and paste options are disabled');
    });

  function validateConfPass() {
    var password = $("#pass").val();
    var confPass = $("#confPass").val();
    if (confPass === password) {
      $("#confPass").removeClass("red-border").addClass("green-border");
    } else {
      $("#confPass").removeClass("green-border").addClass("red-border");
      return false;
    }
    return true;
  }

  // =======================================> ON FOCUS
  //show space to type
  $("input").focus(function(){
    $(this).addClass("input-focused empty");
    $(this).next().addClass("label-up");
    if ($(this).is("#pass")) {
      $(".checklist").show();
    }
  });

  // =======================================> ON KEYUP
  // Change Borders' Color
  $("input").keyup(function() {
    if ($(this).is("#firstName")) {
      validateFirstName();
    } else if ($(this).is("#lastName")) {
      validateLastName();
    } else if ($(this).is("#email")) {
      validateEmail();
    } else if ($(this).is("#address")) {
      validateAddress();
    } else if ($(this).is("#pass")) {
      validatePassword();
    } else if ($(this).is("#confPass")) {
      validateConfPass();
    }
  });

  // =========================================> ON BLUR
  // Insert Icons
  // #address always has its if condition because it doesn't have a .fa-check-circle icon
  function insertIcons(func, inputId) {
    if (inputId.is($("#address"))) {
      inputId.removeClass("green-border red-border");
      iconAlert = inputId.next().next();
      if (func === true) {
        iconAlert.hide();
      } else {
        iconAlert.show();
      }
    } else {
      inputId.removeClass("green-border red-border");
      var iconValid = inputId.next().next();
      var iconAlert = inputId.next().next().next();
      if (func === true) {
        iconAlert.hide();
        iconValid.show().removeClass('gray').addClass('green');
      } else {
        iconValid.hide();
        iconAlert.show();
      }
    }
  }

  $("input").blur(function() {
    if($(this).val() == "") {
      if ($(this).is("#address")) {
        $(this).removeClass("input-focused empty red-border green-border");
        $(this).next().removeClass("label-up");
        $(this).next().next().hide();
      } else {
        $(this).removeClass("input-focused empty red-border");
        $(this).next().removeClass("label-up");
        $(this).next().next().show().removeClass('green').addClass('gray');
        $(this).next().next().next().hide();
        if ($(this).is("#pass")) {
          $(".checklist").hide();
        }
      }
    } else if ($(this).is("#firstName")) {
      insertIcons(validateFirstName(), $(this));
    } else if ($(this).is("#lastName")) {
      insertIcons(validateLastName(), $(this));
    } else if ($(this).is("#email")) {
      insertIcons(validateEmail(), $(this));
    } else if ($(this).is("#address")) {
      insertIcons(validateAddress(), $(this));
    } else if ($(this).is("#pass")) {
      insertIcons(validatePassword(), $(this));
      $(".checklist").hide();
    } else if ($(this).is("#confPass")) {
      insertIcons(validateConfPass(), $(this));
    }
  });

  // =================================> SUBMIT
  //Address has its if statement again
  $("form").submit(function(e) {
    e.preventDefault();
    if (validateFirstName() && validateLastName() && validateEmail()
    && validateAddress() && validatePassword() && validateConfPass()) {
      $(".confirmation").removeClass("non-submitted").addClass("submitted").slideDown().delay(5000).slideUp();
      $(".msg").text("The form has been successfully submitted.");
      $(".checklist").hide();
      $("input").each(function(){
        if ($(this).is("#address")) {
          $(this).val("").removeClass("input-focused empty red-border green-border");
          $(this).next().removeClass("label-up");
        } else {
          $(this).val("").removeClass("input-focused empty red-border green-border");
          $(this).next().removeClass("label-up");
          $(this).next().next().show().removeClass('green').addClass('gray');
        }
      });
      $("li").each(function() {
        $(this).removeClass("valid").addClass("invalid");
      });
    } else {
      $(this).removeClass("red-border green-border");
      $(".confirmation").removeClass("submitted").addClass("non-submitted").slideDown().delay(5000).slideUp();
      $(".msg").text("Submission failed. Check that all fields are well compiled.");
      $(".checklist").hide();
    }
  });


});
