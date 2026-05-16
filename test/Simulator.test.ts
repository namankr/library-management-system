import { Simulator } from "../src/Simulator";

describe("Simulator", () => {
  const createMockLibrary = () => ({
    registerUser: jest.fn<void, [string]>(),
    borrowBook: jest.fn<void, [string, string]>(),
    returnBook: jest.fn<void, [string, string]>(),
    printBorrowedBooks: jest.fn<void, [string]>(),
  });

  const setup = () => {
    const simulator = new Simulator();
    const mockLibrary = createMockLibrary();

    // Replace internal dependency to make command routing assertions deterministic.
    (simulator as unknown as { library: typeof mockLibrary }).library = mockLibrary;

    return { simulator, mockLibrary };
  };

  it("routes REGISTER_USER to library.registerUser", () => {
    const { simulator, mockLibrary } = setup();

    simulator.execute("REGISTER_USER U1");

    expect(mockLibrary.registerUser).toHaveBeenCalledTimes(1);
    expect(mockLibrary.registerUser).toHaveBeenCalledWith("U1");
  });

  it("routes BORROW to library.borrowBook", () => {
    const { simulator, mockLibrary } = setup();

    simulator.execute("BORROW U1 B01");

    expect(mockLibrary.borrowBook).toHaveBeenCalledTimes(1);
    expect(mockLibrary.borrowBook).toHaveBeenCalledWith("U1", "B01");
  });

  it("routes RETURN to library.returnBook", () => {
    const { simulator, mockLibrary } = setup();

    simulator.execute("RETURN U1 B01");

    expect(mockLibrary.returnBook).toHaveBeenCalledTimes(1);
    expect(mockLibrary.returnBook).toHaveBeenCalledWith("U1", "B01");
  });

  it("routes PRINT_BORROWED to library.printBorrowedBooks", () => {
    const { simulator, mockLibrary } = setup();

    simulator.execute("PRINT_BORROWED U1");

    expect(mockLibrary.printBorrowedBooks).toHaveBeenCalledTimes(1);
    expect(mockLibrary.printBorrowedBooks).toHaveBeenCalledWith("U1");
  });

  it("ignores unknown commands", () => {
    const { simulator, mockLibrary } = setup();

    simulator.execute("UNKNOWN U1 B01");

    expect(mockLibrary.registerUser).not.toHaveBeenCalled();
    expect(mockLibrary.borrowBook).not.toHaveBeenCalled();
    expect(mockLibrary.returnBook).not.toHaveBeenCalled();
    expect(mockLibrary.printBorrowedBooks).not.toHaveBeenCalled();
  });

  it("trims extra whitespace before parsing", () => {
    const { simulator, mockLibrary } = setup();

    simulator.execute("   BORROW U2 B02   ");

    expect(mockLibrary.borrowBook).toHaveBeenCalledTimes(1);
    expect(mockLibrary.borrowBook).toHaveBeenCalledWith("U2", "B02");
  });
});
