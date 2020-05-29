const { createLogger, format,transports} = require("winston");
let { infoLogger, errorLogger } = require("../src/logger");

jest.mock("winston", () => {
  let Format = {
    combine: jest.fn(),
    timestamp: jest.fn(),
  };
  let Transports = {
    DailyRotateFile: jest.fn(),
  };
  let Logger = {
    info: jest.fn(),
    error: jest.fn(),
  };
  return {
    format: Format,
    transports: Transports,
    createLogger: jest.fn(() => Logger),
  };
});

describe("logger unit test", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should pass", () => {
    infoLogger.info("pass");
    errorLogger.error("fail");
    expect(format.timestamp).toBeCalledWith({ format: "YYYY-MM-DD HH:mm:ss" });
    expect(createLogger).toBeCalledTimes(2);
    expect(format.combine).toBeCalledTimes(2);
  });
});
