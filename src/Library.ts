import { Book } from "./Book";
import { User } from "./User";

export class Library {

    private bookMap = new Map<string, Book>;
    private registeredUserMap = new Map<string, User>;
    private borrowedBookByUser = new Map<string, Book[]>;  // if a book is already borrowed we cannot lend it  -->> const books: Book[] = [];

    constructor(books: Book[]) {
        books.forEach(b => this.bookMap.set(b.getId(), b));
    }

    registerUser(userId: string): void {
        if (!this.registeredUserMap.has(userId)) {
            this.registeredUserMap.set(userId, new User(userId));
        } else {
            console.log('user already exist', userId);
            return;
        }
    }

    borrowBook(userId: string, bookId: string): void {
        // check if user is registered 
        if (!this.registeredUserMap.has(userId)) {
            console.log("user not found: " + userId);
            return;
        }
        // find book and check if available
        const book = this.bookMap.get(bookId);
        if (!book) {
            console.log("book not found: " + bookId);
            return;
        }
        // Step 3 — book must not be already borrowed
        if (!book.IsBookAvailble()) {
            console.log(`book not available for borrowing: ${bookId}`);
        }
        // book is reserverd
        book.markBorrowed();
        // assign book to user 
        const userBooks = this.borrowedBookByUser.get(userId) ?? [];
        userBooks.push(book);
        this.borrowedBookByUser.set(userId, userBooks);
        console.log(`✓ ${userId} borrowed ${bookId}`);
    }

    returnBook(userId: string, bookId: string): void {
        // check if user is registered 
        if (!this.registeredUserMap.has(userId)) {
            console.log("user not found: " + userId);
            return;
        }
        // find Book
        const book = this.bookMap.get(bookId);
        if(book == undefined) {
            console.log("book doesn't exist" + bookId);
            return;
        }
        // check if book is borrowed
        if(book.IsBookAvailble()){
            console.log("book is not borrowed: " + bookId);
            return;
        }

        // return book
        const books = this.borrowedBookByUser.get(userId) ?? [];
        const updatedBookList = books.filter(b=> b.getId() !== bookId)
        this.borrowedBookByUser.set(userId,updatedBookList);
        // mark book as available
        book.markAvailable();
    }

    printBorrowedBooks(userId: string): void {
        // Step 1 — check user exists
        if (!this.registeredUserMap.has(userId)) {
            console.log(`User not found: ${userId}`);
            return;
        }
        // Step 2 — get their books
        const booksBorrowed = this.borrowedBookByUser.get(userId) ?? [];
        if (booksBorrowed.length === 0) {
            console.log(`${userId} has no borrowed books`);
            return;
        }

        // Step 3 — print IDs not objects
        booksBorrowed.forEach(book => console.log(book.getId()));
    }

}