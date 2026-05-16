import { Library } from "./Library";
import { Book } from "./Book";
import { Command } from "./CommandEnum";
export class Simulator{
    private library: Library;
    
    // create few book and add it to library
    constructor(){
        const books:Book[] = [    
           new Book('B01'),
           new Book('B02')
        ]
        this.library = new Library(books);
    }
    
    execute(command: string):void{
        let args  = command.trim().split(" ");
        let action = args[0];
        // todo: add guards
        let userId = args[1]; // userId
        let bookId = args[2]; // bookId 

        switch(action){
            case 'REGISTER_USER' : 
                this.library.registerUser(userId); 
                return;
            case 'BORROW' : {
                this.library.borrowBook(userId, bookId);
                return;
            }
            case 'RETURN' : 
                this.library.returnBook(userId,bookId);
                return;

            case 'PRINT_BORROWED' :
                this.library.printBorrowedBooks(userId);
                return;
        }

    }
}