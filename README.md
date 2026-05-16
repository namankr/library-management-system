# Library Management System

A simple command-driven Library Management System built with TypeScript.

The simulator reads commands from an input file and supports user registration, borrowing, returning, and printing borrowed books.

## Features

- Register a user
- Borrow a book
- Return a book
- Print borrowed books for a user

## Commands

Use one command per line in your input file.

- `REGISTER_USER <USER_ID>`
- `BORROW <USER_ID> <BOOK_ID>`
- `RETURN <USER_ID> <BOOK_ID>`
- `PRINT_BORROWED <USER_ID>`

### Example

```text
REGISTER_USER U01
BORROW U01 B01
PRINT_BORROWED U01
RETURN U01 B01
PRINT_BORROWED U01
```

## Project Structure

```text
src/
	Book.ts
	CommandEnum.ts
	Library.ts
	main.ts
	Simulator.ts
	User.ts
test/
	Library.test.ts
	Simulator.test.ts
```

## Prerequisites

- Node.js 18+
- npm

## Install

```bash
npm install
```

## Run Tests

```bash
npm test -- --runInBand
```

## Build

```bash
npm run build
```

## Run the Program

1. Add commands to `input.txt` (or create your own input file).
2. Run:

```bash
npx ts-node src/main.ts input.txt
```

## Notes

- The simulator starts with books `B01` and `B02`.
- Borrow/return actions require the user to be registered.
