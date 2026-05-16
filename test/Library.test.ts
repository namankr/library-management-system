import { Library } from "../src/Library";
import {Book } from "../src/Book";

describe('Library', ()=>{

    let library: Library;

    beforeEach(()=>{
        const books = [new Book('B01'), new Book('B02')];
        library = new Library(books);
    });

    afterEach(()=>{
        jest.restoreAllMocks();
    });

    describe('registerUser', ()=>{
        it('should register a new user successfully', ()=>{
            // ACT 
            library.registerUser('U01');
            // ASSERT — borrow works only if registered
            // if user wasn't registered this would fail
            expect(()=>{
                library.borrowBook('U01','B01');
            }).not.toThrow();
        });

        it('should not register same user twice', ()=>{
              // ARRANGE
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(()=>{});

            // ACT 
            library.registerUser('U01');
            library.registerUser('U01');

            expect(consoleSpy).toHaveBeenCalledWith('user already exist', 'U01');

        });

    });

    describe('borrowBook', ()=>{
        it('should not allow borrowing for an unregistered user', ()=>{
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(()=>{});

            library.borrowBook('U01', 'B01');

            expect(consoleSpy).toHaveBeenCalledWith('user not found: U01');
        });

        it('should not allow borrowing a non-existing book', ()=>{
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(()=>{});
            library.registerUser('U01');

            library.borrowBook('U01', 'B99');

            expect(consoleSpy).toHaveBeenCalledWith('book not found: B99');
        });
    });

    describe('returnBook', ()=>{
        it('should not allow returning a book that is not borrowed', ()=>{
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(()=>{});
            library.registerUser('U01');

            library.returnBook('U01', 'B01');

            expect(consoleSpy).toHaveBeenCalledWith('book is not borrowed: B01');
        });

        it('should allow borrowing again after return', ()=>{
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(()=>{});
            library.registerUser('U01');

            library.borrowBook('U01', 'B01');
            library.returnBook('U01', 'B01');
            consoleSpy.mockClear();
            library.borrowBook('U01', 'B01');

            expect(consoleSpy).toHaveBeenCalledWith('✓ U01 borrowed B01');
        });
    });

    describe('printBorrowedBooks', ()=>{
        it('should log when user is not found', ()=>{
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(()=>{});

            library.printBorrowedBooks('U01');

            expect(consoleSpy).toHaveBeenCalledWith('User not found: U01');
        });

        it('should log when user has no borrowed books', ()=>{
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(()=>{});
            library.registerUser('U01');

            library.printBorrowedBooks('U01');

            expect(consoleSpy).toHaveBeenCalledWith('U01 has no borrowed books');
        });

        it('should print borrowed book IDs for a user', ()=>{
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(()=>{});
            library.registerUser('U01');
            library.borrowBook('U01', 'B01');
            library.borrowBook('U01', 'B02');
            consoleSpy.mockClear();

            library.printBorrowedBooks('U01');

            expect(consoleSpy).toHaveBeenNthCalledWith(1, 'B01');
            expect(consoleSpy).toHaveBeenNthCalledWith(2, 'B02');
        });
    });
});