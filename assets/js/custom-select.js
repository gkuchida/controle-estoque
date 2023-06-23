document.addEventListener("click", function(e) {
  closeAllSelect();
});

var customSelect = document.getElementsByClassName("custom-select");
for (var i = 0; i < customSelect.length; i++) {
  var select = customSelect[i].querySelector(".select-selected");
  var options = customSelect[i].querySelector(".select-items").querySelectorAll(".select-item");
  select.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect();
    this.parentNode.querySelector(".select-items").style.display = "block";
  });
  for (var j = 0; j < options.length; j++) {
    options[j].addEventListener("click", function(e) {
      e.stopPropagation();
      var value = this.dataset.value;
      var select = this.parentNode.parentNode.querySelector(".select-selected");
      select.innerHTML = this.innerHTML;
      select.dataset.value = value;
      this.parentNode.style.display = "none";
    });
  }
}

function closeAllSelect() {
  var customSelect = document.getElementsByClassName("custom-select");
  for (var i = 0; i < customSelect.length; i++) {
    var items = customSelect[i].querySelector(".select-items");
    items.style.display = "none";
  }
}
