Array.prototype.move = function(fromIndex, toIndex) {
    this.splice(toIndex, 0, this.splice(fromIndex, 1)[0]);
};

function formatErrorMessage( message ){
  return '<p class="error-message">' + message + '</p>'
}

function formatMessage( message ){
  return '<p class="message">' + message + '</p>';
}
