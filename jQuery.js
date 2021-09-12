$(function () { 
    //select/create functions are in the library.js file. Works because it's loaded first!
    let searchFunc = (e) => {
        let apiKey = 'AIzaSyCd0voZ7biNdsZQd6nNjDnHDYwztwprOK8';
        if (e.key == 'Enter' || e.eventCode == 13) {
            if (e.target.value == '') {
            alert('Please enter something to search first.');
            } else {
                select('overlay').style.display = 'block';
                select('search-books-ui').style.display = 'block';
                select('searchText').innerText = e.target.value;

                $.get(`https://www.googleapis.com/books/v1/volumes?q=${e.target.value}&key=${apiKey}&maxResults=40`, function(data){
                    function searchedBooks(title, img, author, pages, summary) {
                        this.title = title,
                        this.img = img,
                        this.author = author,
                        this.pages = pages,
                        this.summary = summary
                    }

                    searchedBooks.prototype.sIC = function showInContainer () {
                        let bookBuild = select('search-book-build');
                        let bookContainer = select('searched-books-container');
                        let newBook = bookBuild.cloneNode(true);
                        newBook.classList.add('newBook');
                        newBook.id += bookContainer.childElementCount;

                        let colorsArray = ['#635781', '#577d81', '#cbc25f', '#6fcb5f', '#685fcb', '#cb5fc8', '#cb5f5f', '#cba05f', '#905fcb', '#5fcbc1', '#af7cab'];
                        let chooseColor = () => {
                            let length = colorsArray.length;
                            let randNum = Math.floor(Math.random() * (length));
                            return randNum;
                        };

                        let chosenColor = colorsArray[chooseColor()];
                        newBook.children.item(1).style['background-color'] = chosenColor; //Front cover.
                        newBook.children.item(3).style['background-color'] = chosenColor; //Back cover.

                        if (this.img != 'default') {
                            let image = document.createElement('img');
                            image.src = this.img;
                            image.style = `height: 275px;
                                        width: 155px;
                                        border-radius: 10px;`;
                            newBook.children.item(1).appendChild(image);//Puts image into front cover div.
                        } else {  //If there isn't a cover image, just use a h3 title.
                            let newTitle = create('h3');
                            newTitle.innerText = this.title;
                            newTitle.classList.add('book-titles');
                            newTitle.id = 'bookTitle' + bookContainer.childElementCount;
                            newBook.children.item(1).append(newTitle);
                        }

                        bookContainer.appendChild(newBook);

                    }

                    data.items.forEach(bookObj => {
                        let book = bookObj.volumeInfo;
                        let images = book.imageLinks;
                        if (!images) {
                            images = 'default';
                        } else {
                            images = book.imageLinks.thumbnail;
                        }
                        let newBook = new searchedBooks(book.title, images, book.authors, book.pageCount, book.description);
                        newBook.sIC();

                    })

                })
            }
        }
    }

    let search = $('#book-search-input');
    $(search).on('keydown', searchFunc);
    let search2 = $('#book-search-input2');
    $(search2).on('keydown', searchFunc);

});