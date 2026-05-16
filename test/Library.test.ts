import { Library } from "../src/Library";
import {Book } from "../src/Book";

describe('Library', ()=>{

    let library: Library;

    beforeEach(()=>{
        const books = [new Book('B01'), new Book('B02')];
        library = new Library(books);
    })

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
            const consoleSpy = jest.spyOn(console, 'log');

            // ACT 
            library.registerUser('U01');
            library.registerUser('U01');

            expect(consoleSpy).toHaveBeenCalledWith('user already exist', 'U01');

        });

    });
});