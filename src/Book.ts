export class Book {
    private id:string;
    private available:boolean = true;
    constructor(id:string){
        this.id = id;
    }

    getId():string {
        return this.id;
    }
    
    IsBookAvailble():boolean {
        return this.available;
    }

    markBorrowed():boolean {
        return this.available = false;
    }

    markAvailable():boolean {
        return this.available = true;
    }
}