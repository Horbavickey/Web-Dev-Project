$(document).ready(function () {
    // Add animation class to elements
    $(".profile-image").addClass("animate__animated animate__fadeInDown");
    $(".profile-info, .algorithm").addClass(
      "animate__animated animate__fadeIn"
    );
  
    // Add click event to start button
    $(".start-btn").click(function () {
      navigateTo("../Astar Algotithm./index.html", 1000);
    
    });
  
    // Add click event to algorithm divs
    $(".algorithm").click(function () {
      var algorithmPage = $(this).attr('data-page');
      navigateTo(algorithmPage);
    });
  });
  
  function navigateTo(url) {
    window.location.href = "../Astar Algorithm/index.html";
  }