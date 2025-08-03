function Book(title, author, numberOfPage, isRead) {
  this.title = title;
  this.author = author;
  this.numberOfPage = numberOfPage;
  this.isRead = isRead;

  this.info = function () {
    return `${this.title} by ${this.author}, ${numberOfPage} pages, ${
      this.isRead ? "read" : "not yet read"
    }`;
  };
}