let select = function (element) {
    return document.getElementById(element);
};

let create = function (element) {
    return document.createElement(element);
};

(function selectRandomTip () {
    let quickTipArr = [
        'Quick Tip: Delete a book from All Books tag to remove from all tags.', 
        'Quick Tip: You can organize books by preexisting tags.',
        'Quick Tip: You can search for an already existing book.', 
        'Quick Tip: You can do this.', 
        'Quick Tip: Reading is great for the brain, a study shows.',
        'Quick Tip: Leaving a review can be like a sticky note for the future.',
        'Quick Tip: You\'re not ugly.',
        'Quick Tip: You can’t enjoy art or books in a hurry.',
        'Quick Tip: Ask yourself how you feel every blue moon.',
        'Quick Tip: Deleting a book in a tag will only remove it from that tag. (Except All Books)'
    ];
    let choice = Math.floor(quickTipArr.length * Math.random());
    if (choice == 9) {
        select('footer-tip').style = `position: absolute; right: 20px; bottom: -7px;font-size: 17px;`
    }
    select('footer-tip').innerText = quickTipArr[choice];
})();

let checkEmptyContainer = () => {
    if (select('book-container').innerHTML == '') {
         select('empty-quote').style.display = 'block';
     } else {
        select('empty-quote').style.display = 'none';
     }
 };

let tagsObj = {
    All : [],
    toBeRead : [],
    read : [],
    reading : [],
    putDown : [],
    favorites : []
};

let tags;

//Book constructor:
function book(title, author, pages, pagesRead, reviewText, reviewStars, description, img) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.pagesRead = pagesRead,
    this.reviewText = reviewText,
    this.reviewStars = reviewStars,
    this.tagsArr = ['All'],
    this.description = description,
    this.img = img;
};

let tagSelected = 'All'; //Default to load.

function applyPreviewDataDefault (bookIndex) {
    tags = JSON.parse(localStorage['tags']);
    console.log(tags);
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
};



//Functions below used in the editBtn event listener. Had to make global to be removed later...


let bookSelected; //Used in the event listeners below...

book.prototype.sUL = function setUpLibrary() {
    tags = JSON.parse(localStorage['tags']);

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
            localStorage['tags'] = JSON.stringify(tags);
            tags = JSON.parse(localStorage['tags']);
        }
    }

    switch (true) {
        case (this.tagsArr.includes('toBeRead')): 
            checkNPush('toBeRead', this);
        case (this.tagsArr.includes('read')): 
            checkNPush('read', this);
        case (this.tagsArr.includes('reading')): 
            checkNPush('reading', this);
        case (this.tagsArr.includes('favorites')): 
            checkNPush('favorites', this);
        case (this.tagsArr.includes('putDown')): 
            checkNPush('putDown', this);
            break;
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
            let img = create('img');
            img.src = this.img;
            img.style = `height: 275px;
                    width: 155px;
                    border-radius: 10px;`;
            newBook.children.item(1).insertBefore(img, newBook.children.item(1).firstChild);
            newBook.children.item(1).children.item(1).style.display = 'none';
        } else {
            newBook.children.item(1).children.item(0).display = 'none';
            let img = create('img');
            img.src = select('cover-img').src;
            img.style = `height: 275px;
                        width: 155px;
                        border-radius: 10px;`;
            //Puts image into front cover div, in front of the h3 element.
            newBook.children.item(1).insertBefore(img, newBook.children.item(1).firstChild);
            newBook.children.item(1).children.item(1).style.display = 'none';
        }
        
    }

    bookSelected = newBook.id.replace(/book-build/gi, '');

    let bookOverlay = newBook.children.item(0).children.item(4);
    bookOverlay.id += bookSelected;

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
            tags = JSON.parse(localStorage['tags']);
            let reviewInput = select('review-input');
            reviewInput.style.display = 'block';
            let submitBtn = select('submit-review-btn');
            submitBtn.style.display = 'block';
            let cancelBtn = select('cancel-button');
            cancelBtn.style.display = 'block';
            reviewInput.addEventListener('keydown', function (e) {
                if (e.key == 'Enter' || e.eventCode == 13) {
                    tags.All[bookSelected].reviewText = e.target.value;
                    localStorage['tags'] = JSON.stringify(tags);
                    select('review-text').innerText = e.target.value;
                    e.target.style.display = 'none';
                    submitBtn.style.display = 'none';
                    cancelBtn.style.display = 'none';
                }
            })
            submitBtn.addEventListener('click', function submitted (e) {
                tags.All[bookSelected].reviewText = reviewInput.value;
                localStorage['tags'] = JSON.stringify(tags);
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
            tags = JSON.parse(localStorage['tags']);
            let toggleDiv = select('toggle-summary-btns')
            toggleDiv.style.display = 'block';
            select('cancel-summary-btn').addEventListener('click', function () {
                toggleDiv.style.display = 'none';
            })
            select('submit-summary-btn').addEventListener('click', function () {
                tags.All[bookSelected].description = select('summary-input').value;
                localStorage['tags'] = JSON.stringify(tags);
                select('summary-para').innerText = select('summary-input').value;
                toggleDiv.style.display = 'none';
            })
            select('summary-input').addEventListener('keydown', function (e) {
                if (e.key == 'Enter' || e.eventCode == 13) {
                    tags.All[bookSelected].description = e.target.value;
                    localStorage['tags'] = JSON.stringify(tags);
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
            tags = JSON.parse(localStorage['tags']);
            let obj = tags.All[bookSelected];
            if (tags.putDown.includes(obj)) {
                select('put-down-icon').src = 'putDownIconUsed.svg';
                alert('You\'ve already put this book down.');
                e.stopPropagation();
            } else {
                select('put-down-icon').src = 'putDownIconUsed.svg';
                obj.tags = 'putDown';
                tags.putDown.push(obj);
                localStorage['tags'] = JSON.stringify(tags);
                alert('Your book has been put down.');
                e.stopPropagation();
            }
            e.stopPropagation();
        }, {once: true});

        function shareBook (e) {
            //For share button...
            tags = JSON.parse(localStorage['tags']);
            let obj = tags.All[bookSelected];
            let textToCopy = `Hey! I highly recommend ${obj.title} by ${obj.author}. Here is the summary: ${obj.description}`;
            navigator.clipboard.writeText(textToCopy);
            alert('Book info was copied to clipboard!');
            e.stopPropagation();
        }

        select('share-icon').addEventListener('click', shareBook, {once: true});

        function reviewStarFunc (e) {
            tags = JSON.parse(localStorage['tags']);
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
            localStorage['tags'] = JSON.stringify(tags);
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
    deleteBtn.id += bookSelected;

    select(deleteBtn.id).addEventListener('click', function (e) {
        let bookID = e.target.parentElement.parentElement.id;
        let bookSelected = bookID.replace(/book-build/gi, '');
        if (tagSelected == 'All') {
            tags = JSON.parse(localStorage['tags']);
            let obj = tags.All[bookSelected];
            console.log(obj);
            for (tagArr in tags) {
                let index = tags[tagArr].indexOf(obj);
                if (index >= 0) {
                    tags[tagArr].splice(index, 1);
                    localStorage['tags'] = JSON.stringify(tags);
                    bookContainer.innerHTML = '';
                    tags.All.forEach(obj => {
                        Object.setPrototypeOf(obj, book.prototype);
                        obj.sUL();
                    });
                }
            }
            checkEmptyContainer();
        } else {
            tags = JSON.parse(localStorage['tags']);
            let obj = tags[tagSelected][bookSelected];
            let index = tags[tagSelected].indexOf(obj);
            if (index >= 0) {
                tags[tagSelected].splice(index, 1);
                bookContainer.innerHTML = '';
                tags[tagSelected].forEach(obj => {
                    Object.setPrototypeOf(obj, book.prototype);
                    obj.sUL();
                });
            }
            localStorage['tags'] = JSON.stringify(tags);
            checkEmptyContainer();
        }
        for(i = 0; i < bookContainer.childElementCount; i++) {
            bookContainer.children.item(i).id = `book-build${i}`;
        }
    })

    let editBtn = newBook.children.item(0).children.item(3);
    editBtn.id += bookSelected;

    select(editBtn.id).addEventListener('click', function (e) {
        tags = JSON.parse(localStorage['tags']);
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

        if (obj.img && select('img-div')) {
            let img = create('img');
            img.style = `height: 55px; width: 40px;`
            let imgdiv = select('img-div-edit');
            img.src = obj.img;
            imgdiv.innerHTML = '';
            imgdiv.appendChild(img);
        }

        function setCoverBtn () {
            function getBase64Image(img) {
                img.style = `height: 275px;
                width: 155px;`
                var imgCanvas = document.createElement("canvas"),
                imgContext = imgCanvas.getContext("2d");
        
            // Make sure canvas is as big as the picture
            imgCanvas.width = img.width;
            imgCanvas.height = img.height;
        
            // Draw image into canvas element
            imgContext.drawImage(img, 0, 0, img.width, img.height);
        
            // Get canvas contents as a data URL
            var imgAsDataURL = imgCanvas.toDataURL("image/png");
        
            // Save image into localStorage
            try {
                localStorage.setItem(`img${bookSelected}`, imgAsDataURL);
            }
            catch {
                console.log("Storage failed");
            }
            img.style = `height: 55px; width: 40px;`
        }
            if (select('cover-img-edit')) {
                let obj = tags.All[bookSelected];
                getBase64Image(select('cover-img-edit'));
                obj.img = localStorage[`img${bookSelected}`];
                let book = select(`book-build${tags.All.indexOf(obj)}`);
                let img = create('img');
                img.src = obj.img;
                img.style = `
                            border-radius: 10px;
                            height: 275px;
                            width: 155px;
                            border-radius: 10px;`;
                img.id = 'bookCover' + tags.All.indexOf(obj);
                //Puts image into front cover div, in front of the h3 element.
                book.children.item(1).insertBefore(img, newBook.children.item(1).firstChild);
                book.children.item(1).children.item(1).style.display = 'none';
                localStorage['tags'] = JSON.stringify(tags);
            }
        }

        select('set-cover-btn').addEventListener('click', setCoverBtn);
        localStorage['tags'] = JSON.stringify(tags);
    })

    let bookTagsDropdown = select('bookTags');
    bookTagsDropdown.id += bookSelected;

    let eachTag;

    for (i = 0; i < select(bookTagsDropdown.id).childElementCount; i++) {
        tags = JSON.parse(localStorage['tags']);
        select(bookTagsDropdown.id).children.item(i).id += bookSelected;
        eachTag = select(bookTagsDropdown.id).children.item(i).id;

        select(eachTag).addEventListener('click', function (e) {
            console.log(tags);
            e.target.style['background-color'] = '#FFF';
            let bookID = e.target.parentElement.parentElement.parentElement.parentElement.id;
            let bookSelected = bookID.replace(/book-build/gi, '');
            let thisTag = (e.target.id).replace(/[0-9]/gi, '');
            let chosenObj = tags.All[bookSelected];
            let tagCheck = tags[thisTag].every(obj => JSON.stringify(obj) !== JSON.stringify(chosenObj));
            if (tagCheck) {
                tags[thisTag].push(chosenObj);
                localStorage['tags'] = JSON.stringify(tags);
                return;
            }
        })
    }

    for (const tagToCheck in tags) {
        let thereCheck = tags[tagToCheck].every(obj => JSON.stringify(obj) !== JSON.stringify(tags.All[bookSelected]));
        if (!thereCheck) {
            if (tagToCheck !== 'putDown') {
                let tagID = tagToCheck + '2' + bookSelected;
                select(tagID).style['background-color'] = '#FFF';
            }
        }
    }

    let tag = select('tag');
    tag.id += bookSelected;

    select(tag.id).addEventListener('click', function (e) {
        let bookID = e.target.parentElement.parentElement.parentElement.id;
        bookSelected = bookID.replace(/book-build/gi, '');
        select(bookTagsDropdown.id).style.display = 'block';
        select(bookTagsDropdown.id).addEventListener('mouseleave', function (e) {
            e.target.style.display = 'none';
        })
        select(bookID).addEventListener('mouseleave', function () {
            select(bookTagsDropdown.id).style.display = 'none';
        })
        
    });

    localStorage['tags'] = JSON.stringify(tags);

};

if (localStorage['tags']) {
    console.log('working')
    tags = JSON.parse(localStorage['tags']);
    tags.All.forEach(obj => {
        Object.setPrototypeOf(obj, book.prototype);
        obj.sUL();
    });
} else {
    localStorage.setItem('tags', JSON.stringify(tagsObj));
}

// let templateBook = Object.assign(Object.create(book.prototype), {
//     title: 'Edit me!',
//     author: '(Or delete me, it\'s whatever.)',
//     pages: 0,
//     pagesRead: 0,
//     reviewText: '',
//     reviewStars: '',
//     tagsArr: ['All'],
//     description: '',
//     img : '' 
// });

// let templateBook2 = Object.assign(Object.create(book.prototype), {
//     title: 'Wooooo!',
//     author: 'Jazz',
//     pages: 14,
//     pagesRead: 2,
//     reviewText: '',
//     reviewStars: '',
//     tagsArr: ['All'],
//     description: '',
//     img : '' 
// });



//Template:
//     title: '',
//     author: '',
//     pages: 0,
//     pagesRead: 0,
//     reviewText: '',
//     reviewStars: '',
//     tags: '',
//     description: '',
//     img : ''

// templateBook.sUL();

// templateBook2.sUL();

//Tag dropdown:
let setUpTags = () => {
    let tagsDropdown = select('tags-dropdown');
    function organizeContainer (e) {
        select('book-tag-cat-title').innerText = e.target.innerText;
        select('book-container').innerHTML = '';
        tags = JSON.parse(localStorage['tags'])
        tags[e.target.id].forEach(obj => {
            Object.setPrototypeOf(obj, book.prototype); //When stringified, the prototype goes away.
            obj.sUL()
        });
        tagSelected = e.target.id;
        checkEmptyContainer();
    }
    for (const tagName in tags) {
        let newTagEl = create('h5');
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
    let coverDiv = select('cover-div-book-search');
    coverDiv.className = 'animatedCover';
    bookSearchBox.addEventListener('mouseleave', function coverSearch () {
        coverDiv.className = 'animatedCoverUp';
    });
});

//Media query/mobile view search bar animations:

select('cover-div-book-search2').addEventListener('mouseenter', function (e) {
    e.target.className = 'animatedCover';
    select('icon-div').className = 'animateIcons';
    bookSearchBoxMediaQuery.addEventListener('mouseleave', function coverSearch () {
        e.target.className = 'animatedCoverUp';
    });
});

select('icon-div').addEventListener('mouseenter', function (e) {
    let coverDiv = select('cover-div-book-search2');
    e.target.className = 'animateIcons';
    coverDiv.className = 'animatedCover';
    select('cover-div-book-search2').className = 'animatedCover';
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
    select('tags-dropdown').style.display = 'flex';
    select('tags-dropdown').addEventListener('mouseleave', function (e) {
        e.target.style.display = 'none';
    })
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



select('img-upload-edit').addEventListener('change', function getBookCover (e) {
    let img = create('img');
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
    let description = '';
    let img = '';
    let newBook = new book(title, author, pages, pagesRead, reviewText, reviewStars, description, img);
    tags.All.push(newBook);
    select('book-container').innerHTML = '';
    tags.All.forEach(obj => {
        Object.setPrototypeOf(obj, book.prototype);
        obj.sUL();
    });
    localStorage['tags'] = JSON.stringify(tags);
    checkEmptyContainer();
    select('overlay').style.display = 'none';
    select('new-book-ui').style.display = 'none';
    inputClear();
    turnHoverOn();
    e.preventDefault();
    return;
})

checkEmptyContainer();