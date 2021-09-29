let select = function (element) {
    return document.getElementById(element);
}

let create = function (element) {
    return document.createElement(element);
}

let checkEmptyContainer = () => {
    if (select('book-container').innerHTML == '') {
         select('empty-quote').style.display = 'block';
     } else {
        select('empty-quote').style.display = 'none';
     }
 }

let tags = {
    All : [],
    toBeRead : [],
    read : [],
    reading : [],
    putDown : [],
    favorites : []
}

//Book constructor:
function book(title, author, pages, pagesRead, reviewText, reviewStars, tags, description, img) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.pagesRead = pagesRead,
    this.reviewText = reviewText,
    this.reviewStars = reviewStars,
    this.tagsArr = [tags],
    this.description = description,
    this.img = img;
}




function applyPreviewDataDefault (bookIndex) {
        //Applying data:
        let bookObj = tags.All[bookIndex];

        let defaultSummary = `No summary...yet!`;
        let defaultReview = `Nothing here yet!`;
        if (bookObj.reviewText) {
            select('review-text').innerText = bookObj.reviewText;
        } else {
            select('review-text').innerHTML = defaultReview;
        }
        if (bookObj.description) {
            select('summary-para').innerText = bookObj.description; 
        } else {
            select('summary-para').innerHTML = defaultSummary;
        }
    }



//Functions below used in the editBtn event listener. Had to make global to be removed later...


let bookSelected; //Used in the event listeners below...

book.prototype.sUL = function setUpLibrary() {
    let bookBuild = select('book-build');
    let bookContainer = select('book-container');
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

    let checkNPush = (tag, newObj) => {
        let objCheck = tags[tag].every(obj => JSON.stringify(obj) !== JSON.stringify(newObj));
        if (!objCheck) {
            return;
        } else {
            tags[tag].push(newObj);
        }
    }

    switch (true) {
        case (this.tagsArr.includes('toBeRead')): 
            checkNPush('toBeRead', this);
        case (this.tagsArr.includes('read')): 
            checkNPush('read', this);
        case (this.tagsArr.includes('reading')): 
            checkNPush('reading', this);
        case (this.tagsArr.includes('putDown')): 
            checkNPush('putDown', this);
        case (this.tagsArr.includes('favorites')): 
            checkNPush('favorites', this);
        default:
            checkNPush('All', this);
    }

    let newTitle = create('h3');
        newTitle.innerText = this.title  + ` 
        By: ${this.author}`;
        newTitle.classList.add('book-titles');
        newTitle.id = 'bookTitle' + bookContainer.childElementCount;
        newBook.children.item(1).append(newTitle);

    if (select('cover-img') || this.img) {
        if (this.img) {
            let img = document.createElement('img');
            img.src = this.img;
            img.style = `height: 275px;
                    width: 155px;
                    border-radius: 10px;`;
            newBook.children.item(1).insertBefore(img, newBook.children.item(1).firstChild);
            newBook.children.item(1).children.item(1).style.display = 'none';
        } else {
            newBook.children.item(1).children.item(0).display = 'none';
            let img = document.createElement('img');
            img.src = select('cover-img').src;
            img.style = `height: 275px;
                        width: 155px;
                        border-radius: 10px;`;
            //Puts image into front cover div, in front of the h3 element.
            newBook.children.item(1).insertBefore(img, newBook.children.item(1).firstChild);
            newBook.children.item(1).children.item(1).style.display = 'none';
        }
        
    }

    let bookOverlay = newBook.children.item(0).children.item(4);


    bookSelected = newBook.id.replace(/book-build/gi, '');
    let bookReadGauge = bookOverlay.children.item(0).children.item(0);
    bookReadGauge.id += bookSelected;

    bookContainer.appendChild(newBook);

    select(bookReadGauge.id).setAttribute('value', tags.All[bookSelected].pagesRead);
    select(bookReadGauge.id).setAttribute('max', tags.All[bookSelected].pages);
    select(bookReadGauge.id).setAttribute('min', 0);

    //Creates a little version of the book (Thumbnail) when the book is clicked on, also sets up book info preview:
    select(bookOverlay.id).addEventListener('click', function (e) {
        select('preview-book-ui').style.display = 'block';
        select('overlay').style.display = 'block';
        let bookPreview = select('book-preview');
        let bookID = e.target.parentElement.parentElement.id;
        let bookColor = select(bookID).children.item(1).style.backgroundColor;
        let bookStaticClone = select(bookID).cloneNode(true);
        // Take off the hover overlay:
        bookStaticClone.children.item(0).remove(); 

        // Had to change the sizes of the book parts:
        let frontCover = bookStaticClone.children.item(0);
        frontCover.style = `height: 189.64px; width: 106.88px; background-color: ${bookColor};`;
        if (frontCover.children.item(0).nodeName == 'H3') {
            frontCover.children.item(0).style = 'font-size: revert';
        } else if(frontCover.children.item(0).nodeName == 'IMG'){
            frontCover.children.item(0).style = 'border-radius: 10px; height: 189.64px; width: 106.88px; display: block;';
            frontCover.children.item(1).style = 'display: none;' //Because the h3 title will be the second child.
        }

        let pages = bookStaticClone.children.item(1);
        pages.style = `height: 189.64px; width: 108.96px; bottom: 185px; left: 4px;`;
        let backCover = bookStaticClone.children.item(2);
        backCover.style = `height: 189.64px; width: 117.23px; left: 1px; bottom: 371px; background-color: ${bookColor};`;
        bookPreview.appendChild(bookStaticClone);

        //These puppies (bookSelected variable) need to stay inside this scope so they don't keep changing!!!!
        bookSelected = newBook.id.replace(/book-build/gi, '');

        applyPreviewDataDefault(bookSelected);

        //Edit review button:
        select('edit-review-btn').addEventListener('click', function () {
            let reviewInput = select('review-input');
            reviewInput.style.display = 'block';
            let submitBtn = select('submit-review-btn');
            submitBtn.style.display = 'block';
            let cancelBtn = select('cancel-button');
            cancelBtn.style.display = 'block';
            reviewInput.addEventListener('keydown', function (e) {
                if (e.key == 'Enter' || e.eventCode == 13) {
                    tags.All[bookSelected].reviewText = e.target.value;
                    select('review-text').innerText = e.target.value;
                    e.target.style.display = 'none';
                    submitBtn.style.display = 'none';
                    cancelBtn.style.display = 'none';
                }
            })
            submitBtn.addEventListener('click', function submitted (e) {
                tags.All[bookSelected].reviewText = reviewInput.value;
                select('review-text').innerText = reviewInput.value;
                reviewInput.style.display = 'none';
                e.target.style.display = 'none';
                cancelBtn.style.display = 'none';
            })
            cancelBtn.addEventListener('click', function cancelReview (e) {
                e.target.style.display = 'none';
                reviewInput.style.display = 'none';
                submitBtn.style.display = 'none';
            })
            reviewInput.value = '';
        });

        select('edit-summary-btn').addEventListener('click', function () {
            let toggleDiv = select('toggle-summary-btns')
            toggleDiv.style.display = 'block';
            select('cancel-summary-btn').addEventListener('click', function () {
                toggleDiv.style.display = 'none';
            })
            select('submit-summary-btn').addEventListener('click', function () {
                tags.All[bookSelected].description = select('summary-input').value;
                select('summary-para').innerText = select('summary-input').value;
                toggleDiv.style.display = 'none';
            })
            select('summary-input').addEventListener('keydown', function (e) {
                if (e.key == 'Enter' || e.eventCode == 13) {
                    tags.All[bookSelected].description = e.target.value;
                    select('summary-para').innerText = e.target.value;
                    toggleDiv.style.display = 'none';
                }
            })
            select('summary-input').value = '';
        })

        let obj = tags.All[bookSelected];
        if (tags.putDown.includes(obj)) {
            select('put-down-icon').src = 'putDownIconUsed.svg';
        } else {
            select('put-down-icon').src = 'putDownIcon.svg';
        }

        select('put-down-icon').addEventListener('click', function putDownBook (e) {
            let obj = tags.All[bookSelected];
            if (tags.putDown.includes(obj)) {
                select('put-down-icon').src = 'putDownIconUsed.svg';
                alert('You\'ve already put this book down.');
                e.stopPropagation();
            } else {
                select('put-down-icon').src = 'putDownIconUsed.svg';
                obj.tags = 'putDown';
                tags.putDown.push(obj);
                alert('Your book has been put down.');
                e.stopPropagation();
            }
            e.stopPropagation();
        }, {once: true});

        function shareBook (e) {
            //For share button...
            let obj = tags.All[bookSelected];
            let textToCopy = `Hey! I highly recommend ${obj.title} by ${obj.author}. Here is the summary: ${obj.description}`;
            navigator.clipboard.writeText(textToCopy);
            alert('Book info was copied to clipboard!');
            e.stopPropagation();
        }

        select('share-icon').addEventListener('click', shareBook, {once: true});

        function reviewStarFunc (e) {
            //These puppies (bookSelected variable) need to stay inside another scope so they don't keep changing!!!!
            let obj = tags.All[bookSelected]; 
            let starNum;
            let i;
            starNum = e.target;
            starNum = parseInt(starNum.id.replace(/star/gi, ''));
            i = starNum;
            obj.reviewStars = starNum;
    
            for (j = i + 1; j <= 5; j++) {
                select(`${j}star`).src = 'faveStar.svg';
            }
            for (x = 1; x <= i; x++){
                select(`${x}star`).src = 'faveStarActive.svg';
            }
        };
    
        //Default:
        let i = tags.All[bookSelected].reviewStars;
        if(i) {
            for (j = i + 1; j <= 5; j++) {
            select(`${j}star`).src = 'faveStar.svg';
            }
            for (x = 1; x <= i; x++){
                select(`${x}star`).src = 'faveStarActive.svg';
            }
        }

        for (s = 1; s <= 5; s++) {
            select(`${s}star`).addEventListener('click', reviewStarFunc);
        }

    })

    let deleteBtn = newBook.children.item(0).children.item(2);
    deleteBtn.id += bookContainer.childElementCount;

    select(deleteBtn.id).addEventListener('click', function (e) {
        let bookID = e.target.parentElement.parentElement.id;
        bookSelected = bookID.replace(/book-build/gi, '');
        tags.All.splice(bookSelected, 1); 
        let bookContainer = select('book-container');
        let bookToRemove = select(bookID);
        bookToRemove.remove();
        for(i = 0; i < bookContainer.childElementCount; i++) {
            bookContainer.children.item(i).id = `book-build${i}`;
        }
        checkEmptyContainer();
    })

    let editBtn = newBook.children.item(0).children.item(3);
    editBtn.id += bookContainer.childElementCount;

    select(editBtn.id).addEventListener('click', function (e) {
        let bookID = e.target.parentElement.parentElement.id;
        bookSelected = bookID.replace(/book-build/gi, '');
        let obj = tags.All[bookSelected]; 
        select('overlay').style.display = 'block';
        select('edit-book-ui').style.display = 'block';

        let titleInput = select('edit-title-input');
        titleInput.value = obj.title;

        let authorInput = select('edit-author-input');
        authorInput.value = obj.author;

        let pagesReadInput = select('edit-pages-read-input');
        let pagesInput = select('edit-pages-input');
        let pagesRange = select('pages-read-range-edit');

        function changeTitle (e) {
            if (e.key == 'Enter'|| e.eventCode == 13) {
                obj.title = e.target.value;
                select(`bookTitle${bookSelected}`).innerText = obj.title +`
                By: ${obj.author}`;
            }
        }
        
        function changeAuthor (e) {
            if (e.key == 'Enter'|| e.eventCode == 13) {
                obj.author = e.target.value;
                select(`bookTitle${bookSelected}`).innerText = obj.title +`
                By: ${obj.author}`;
            }
        }
        
        function changePages (e) {
            if (e.key == 'Enter'|| e.eventCode == 13) {
                let pageNum = parseInt(pagesInput.value);
                if (pageNum) {
                    select('pages-read-range-edit').setAttribute('max', pageNum);
                    select('pagesTotal-edit').innerText = pageNum;
                    obj.pages = pageNum;
                    select('pages-read-range-edit').value = 0;
                    select('pagesRead-edit').innerText = select('pages-read-range-edit').value;
                    select(`book-gauge${bookSelected}`).setAttribute('max', obj.pages);
                    e.target.value = '';
                } else {
                    alert('Please enter a number.');
                    e.target.value = '';
                }
            }
        }
        
        function changePagesRead (e) {
            if (e.key == 'Enter'|| e.eventCode == 13) {
                let pagesReadNum = parseInt(pagesReadInput.value);
                let pagesTotal = parseInt(select('pagesTotal-edit').innerText);
                if (pagesReadNum <= pagesTotal) {
                    select('pages-read-range-edit').value = pagesReadNum;
                    select('pagesRead-edit').innerText = pagesReadNum;
                    select(`book-gauge${bookSelected}`).value = pagesReadNum;
                    obj.pagesRead = pagesReadNum;
                    e.target.value = '';
                } else if (typeof pagesReadNum !== 'number'){
                    console.log(pagesReadNum)
                    alert('Please enter a number.');
                    e.target.value = '';
                } else if (pagesReadNum > pagesTotal) {
                    alert('Please enter a number less than the total page count.');
                    e.target.value = '';
                }
                return;
            }
        }
        
        function newPagesSlide (e) {
            obj.pagesRead = e.target.value;
            select('pagesRead-edit').innerText = e.target.value;
            select(`book-gauge${bookSelected}`).value = e.target.value;
        }

        titleInput.addEventListener('keydown', changeTitle);
        authorInput.addEventListener('keydown', changeAuthor);
        select('pagesTotal-edit').innerText = obj.pages;
        select('pagesRead-edit').innerText = obj.pagesRead;
        pagesRange.setAttribute('max', obj.pages);
        pagesRange.value = obj.pagesRead;

        pagesInput.removeEventListener('keydown', enterFunc);
        pagesInput.addEventListener('keydown', changePages);

        pagesReadInput.removeEventListener('keydown', enterFunc2);
        pagesReadInput.addEventListener('keydown', changePagesRead);

        pagesRange.addEventListener('input', newPagesSlide);

        if (obj.img) {
            let img = document.createElement('img');
            img.style = `height: 55px; width: 40px;`
            let imgdiv = select('img-div-edit');
            img.src = obj.img;
            imgdiv.innerHTML = '';
            imgdiv.appendChild(img);
        }

        function setCoverBtn () {
            if (select('cover-img-edit')) {
                let obj = tags.All[bookSelected];
                obj.img = select('cover-img-edit').src;
                let book = select(`book-build${tags.All.indexOf(obj)}`);
                let img = document.createElement('img');
                img.src = obj.img;
                img.style = `height: 275px;
                            width: 155px;
                            border-radius: 10px;`;
                img.id = 'bookCover' + tags.All.indexOf(obj);
                //Puts image into front cover div, in front of the h3 element.
                book.children.item(1).insertBefore(img, newBook.children.item(1).firstChild);
                book.children.item(1).children.item(1).style.display = 'none';
            }
        }

        select('set-cover-btn').addEventListener('click', setCoverBtn);
    })

};

//Tag dropdown:
let setUpTags = () => {
    let tagsDropdown = select('tags-dropdown');
    function organizeContainer (e) {
        select('book-container').innerHTML = '';
        tags[e.target.id].forEach(obj => obj.sUL());
    }
    for (const tagName in tags) {
        let newTagEl = document.createElement('h5');
        newTagEl.classList.add('tag-titles');
        switch(tagName) {
            case ('All'): {
                newTagEl.innerText = 'All Books';
                newTagEl.id = tagName;
                tagsDropdown.appendChild(newTagEl);
                select(newTagEl.id).addEventListener('click', organizeContainer);
            }
            break;
            case('toBeRead'): {
                newTagEl.innerText = 'To Be Read';
                newTagEl.id = tagName;
                tagsDropdown.appendChild(newTagEl);
                select(newTagEl.id).addEventListener('click', organizeContainer);
            }
            break;
            case('read'): {
                newTagEl.innerText = 'Read';
                newTagEl.id = tagName;
                tagsDropdown.appendChild(newTagEl);
                select(newTagEl.id).addEventListener('click', organizeContainer);
            }
            break;
            case('reading'): {
                newTagEl.innerText = 'Reading';
                newTagEl.id = tagName;
                tagsDropdown.appendChild(newTagEl);
                select(newTagEl.id).addEventListener('click', organizeContainer);
            }
            break;
            case('putDown'): {
                newTagEl.innerText = 'Put Down';
                newTagEl.id = tagName;
                tagsDropdown.appendChild(newTagEl);
                select(newTagEl.id).addEventListener('click', organizeContainer);
            }
            break;
            case('favorites'): {
                newTagEl.innerText = 'Faves';
                newTagEl.id = tagName;
                tagsDropdown.appendChild(newTagEl);
                select(newTagEl.id).addEventListener('click', organizeContainer);
            }
        }
        
    }
}

setUpTags();


//Algorithm for book hover progress bars:


let bookSearchBox = select('book-search-input');
let bookSearchBoxMediaQuery = select('book-search-input2')

//Website view search bar animations:

select('cover-div-book-search').addEventListener('mouseenter', function (e) {
    e.target.className = 'animatedCover';
    bookSearchBox.addEventListener('mouseleave', function coverSearch () {
        e.target.className = 'animatedCoverUp';
    });
});

select('search-icon').addEventListener('mouseenter', function (e) {
    let coverDiv = document.getElementById('cover-div-book-search');
    coverDiv.className = 'animatedCover';
    bookSearchBox.addEventListener('mouseleave', function coverSearch () {
        coverDiv.className = 'animatedCoverUp';
    });
});

//Media query/mobile view search bar animations:

select('cover-div-book-search2').addEventListener('mouseenter', function (e) {
    e.target.className = 'animatedCover';
    document.getElementById('icon-div').className = 'animateIcons';
    bookSearchBoxMediaQuery.addEventListener('mouseleave', function coverSearch () {
        e.target.className = 'animatedCoverUp';
    });
});

select('icon-div').addEventListener('mouseenter', function (e) {
    let coverDiv = document.getElementById('cover-div-book-search2');
    e.target.className = 'animateIcons';
    coverDiv.className = 'animatedCover';
    document.getElementById('cover-div-book-search2').className = 'animatedCover';
    bookSearchBoxMediaQuery.addEventListener('mouseleave', function coverSearch () {
        e.target.className = 'animateIconsBack';
        coverDiv.className = 'animatedCoverUp';
    });
});

//Book overlay hover toggles:

let turnHoverOff = () => {
    let booksLength = select('book-container').childElementCount;
    let books = document.getElementsByClassName('newBook');
    for (i = 0; i < booksLength; i++) {
        let overlays = books.item(i).childNodes.item(1);
        overlays.classList.remove('hover');
    }
}

let turnHoverOn = () => {
    let booksLength = select('book-container').childElementCount;
    let books = document.getElementsByClassName('newBook');
    for (i = 0; i < booksLength; i++) {
        let overlays = books.item(i).childNodes.item(1);
        overlays.classList.add('hover');
    }
}

function inputClear () {
    document.querySelectorAll('input').forEach(el => el.value = '');
    if (select('cover-img')) {
        select('cover-img').src = '';
    }
    if(select('cover-img-edit')) {
        select('cover-img-edit').src = '';
    }
    select('pagesTotal').innerText = 0;
    select('pagesRead').innerText = 0;
    select('pages-read-range').setAttribute('max', 0);
};

function enterFunc (e) {
    if (e.key == 'Enter' || e.eventCode == 13) {
        let pages = parseInt(e.target.value);
        if (pages) {
           select('pages-read-range').setAttribute('max', pages);
            select('pagesTotal').innerText = pages;
            e.target.value = '';
            e.preventDefault(); 
        } else {
            alert('Please enter a number');
        }
        
    }
}

function enterFunc2 (e) {
    if (e.key == 'Enter' || e.eventCode == 13) {
        let numberOfPages = parseInt(select('pages-read-range').getAttribute('max'));
        let pagesRead = parseInt(e.target.value);
        if (numberOfPages == 0) {
            alert('Please enter the number of pages first.');
            e.preventDefault();
            return;
        } else if (pagesRead > numberOfPages) {
            alert('I don\'t think that\'s possible...');
            e.preventDefault();
            return;
        } else {
            select('pagesRead').innerText = pagesRead;
            select('pages-read-range').value = pagesRead;
            e.target.value = '';
            e.preventDefault();
        }
    }
}

function pageReadSlide (e) {
    let pages = e.target.value;
    select('pagesRead').innerText = pages;
}

select('pages-input').addEventListener('keydown', enterFunc);

select('pages-read-input').addEventListener('keydown', enterFunc2);

select('pages-read-range').addEventListener('input', pageReadSlide);

//New Book Button:

let newBookUI = () => {
    inputClear();
    select('overlay').style.display = 'block';
    select('new-book-ui').style.display = 'block';
    let pagesInput = select('pages-input');
    pagesInput.addEventListener('keydown', enterFunc);
    let pagesReadInput = select('pages-read-input');
    pagesReadInput.addEventListener('keydown', enterFunc2);
    turnHoverOff();
}

select('new-book-title').addEventListener('click', newBookUI);

select('plus-icon').addEventListener('click', newBookUI);

inputClear();

select('tagEditorIcon').addEventListener('click', function () {
    // Show dropdown. Dropdown must have:
        //List of available tags, clickable, light up on hover.
        //Overflow is scrollable.
        //At the top, fixed, is an add tag button.
        //The add button will show a text input right below and the user
        //must press enter to push it through. After that, the input will be hidden.
        //When you click on one of its children, it'll sort the book container, showing
        //only objects within the selected tag.
})

select('overlay').addEventListener('click', function backToAll () {
    select('overlay').style.display = 'none';
    select('new-book-ui').style.display = 'none';
    select('edit-book-ui').style.display = 'none';
    select('search-books-ui').style.display = 'none';
    select('preview-book-ui').style.display = 'none';
    select('book-preview').innerHTML = '';
    select('review-input').style.display = 'none';
    select('review-input').value = '';
    select('img-div-edit').innerHTML = '<br>No image selected';
    select('submit-review-btn').style.display = 'none';
    select('cancel-button').style.display = 'none';
    select('searched-books-container').innerHTML = '';
    select('toggle-summary-btns').style.display = 'none';
    for (x = 1; x <= 5; x++){
        select(`${x}star`).src = 'faveStar.svg';
    }
    turnHoverOn();
});

select('img-upload').addEventListener('change', function getBookCover (e) {
    let img = document.createElement('img');
    img.id = 'cover-img';
    img.alt = 'Cover preview';
    let file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', function convertTobase64 () {
        img.src = reader.result;
        img.style = `height: 55px;
                    width: 40px;`
        let imgdiv = select('img-div');
        imgdiv.innerHTML = '';
        imgdiv.appendChild(img);
        console.log(img);

    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
});

select('img-upload-edit').addEventListener('change', function getBookCover (e) {
    let img = document.createElement('img');
    img.id = 'cover-img-edit';
    img.alt = 'Cover preview';
    let file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', function convertTobase64 () {
        img.src = reader.result;
        img.style = `height: 55px;
                    width: 40px;`
        let imgdiv = select('img-div-edit');
        imgdiv.innerHTML = '';
        imgdiv.appendChild(img);

    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
})


select('done-btn').addEventListener('click', function done (e) {
    let title = select('title-input').value;
    let author = select('author-input').value;
    let pages = select('pagesTotal').innerText;
    let pagesRead = select('pagesRead').innerText;
    let reviewText = 'Your review would be exquisite, I\'m sure.';
    let reviewStars = 0;
    let tagArr = [];
    let description = '';
    let imgdiv = select('img-div');
    let img = imgdiv.src;
    if (pagesRead == 0) {
        tagArr.push('toBeRead');
    } else if (pagesRead == pages) {
        tagArr.push('read');
    }
    if(imgdiv.src){
        img = imgdiv.src;
    }
    let newBook = new book(title, author, pages, pagesRead, reviewText, reviewStars, tagArr, description, img);
    tags.All.push(newBook);
    select('book-container').innerHTML = '';
    tags.All.forEach(obj => obj.sUL());
    checkEmptyContainer();
    select('overlay').style.display = 'none';
    select('new-book-ui').style.display = 'none';
    inputClear();
    turnHoverOn();
    e.preventDefault();
    return;
})


let gibberish = Object.assign(Object.create(book.prototype), {
    title: 'Gibberish',
    author: 'Big Boy',
    pages: 321,
    pagesRead: 231,
    reviewText: 'It was alright. Didn\'t make any sense, though.',
    reviewStars: '',
    tagsArr: [],
    description: 'Ykasj jnaj lasjonw kjndnsajdad lamdad akndand kann. Ajnnnasf alwopq knsknas.'
});

let gibberish2 = Object.assign(Object.create(book.prototype), {
    title: 'Gibberish the Sequel',
    author: 'Big Boy',
    pages: 365,
    pagesRead: 243,
    reviewText: 'It still doesn\'t make any sense...but it was mildly entertaining nonetheless.',
    reviewStars: '',
    tagsArr: [],
    description: 'jafiafi anfofajf akfkajksowws oinkasnfsan. knaknaskla aljmsdkasjdlkal aksnasn akjsnfkanf.'
});

let gibberish3 = Object.assign(Object.create(book.prototype), {
    title: 'Gibberish: the Prequel',
    author: 'Big Boy',
    pages: 450,
    pagesRead: 100,
    reviewText: 'Wow. I think I can finally understand why people read this series. My God. It is a masterpiece!!',
    reviewStars: '',
    tagsArr: [],
    description: 'Gib jib gabba wooky. Gahanda foroduki! Jamba laba da, tad aplo bungy.'
});

let firstBookHP = Object.assign(Object.create(book.prototype), {
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J. K. Rowling',
    pages: 223,
    pagesRead: 150,
    reviewText: 'One of the main players in keeping me sane! Very well-written.',
    reviewStars: '',
    tagsArr: [],
    description: 'On his 11th birthday, Harry receives a letter inviting him to study magic at the Hogwarts School of Witchcraft and Wizardry. Harry discovers that not only is he a wizard, but he is a famous one. He meets two best friends, Ron Weasley and Hermione Granger, and makes his first enemy, Draco Malfoy.',
    img: '81iqZ2HHD-L.jpg'
})

let blankBook = Object.assign(Object.create(book.prototype), {
        title: 'Book Title',
        author: 'Author',
        pages: 0,
        pagesRead: 0,
        reviewText: '',
        reviewStars: '',
        tagsArr: [],
        description: '',
        img : ''
})

//Copy Paster:
//     title: '',
//     author: '',
//     pages: 0,
//     pagesRead: 0,
//     reviewText: '',
//     reviewStars: '',
//     tags: '',
//     description: '',
//     img : ''

firstBookHP.sUL();
blankBook.sUL();
gibberish3.sUL();

checkEmptyContainer();