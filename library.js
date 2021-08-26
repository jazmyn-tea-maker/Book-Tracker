let tags = {
    userLibraryMain : [],
    toBeRead : [],
    read : [],
    putDown : [],
    favorites : []
}

function book(title, author, pages, pagesRead, reviewText, reviewStars, tags) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.pagesRead = pagesRead,
    this.reviewText = reviewText,
    this.reviewStars = reviewStars
    this.tags = tags
}

let placeInLibrary = (obj) => {
    tags.userLibraryMain.push(obj);
}

let hPBook3 = Object.assign(Object.create(book.prototype), {
    
});

placeInLibrary(hPBook3);
console.log(tags);
//If pages read is equal to pages, make a change in book appearance / move it to tag read.

