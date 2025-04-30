import http from 'http';

describe('Server Initialization', () => {
  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it('should start server after successful DB connection', async () => {
    jest.doMock('../db/database.connection', () => ({
      __esModule: true,
      default: jest.fn(() => Promise.resolve()),
    }));

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const mockClose = jest.fn((cb) => cb?.());
    const mockServer = {
      close: mockClose,
    } as unknown as http.Server;

    jest.doMock('../app', () => ({
      __esModule: true,
      default: {
        listen: jest.fn((port: number, cb: () => void) => {
          cb(); // simulate server start
          return mockServer;
        }),
      },
    }));

    const { startServer } = await import('../server');
    await startServer();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('Server is running at http://localhost:'),
    );

    logSpy.mockRestore();
  });

  it('should handle DB connection error and exit', async () => {
    jest.doMock('../db/database.connection', () => ({
      __esModule: true,
      default: jest.fn(() => Promise.reject(new Error('DB FAIL'))),
    }));

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('mock-exit'); // prevents Jest from stopping
    });

    const { startServer } = await import('../server');

    await expect(startServer()).rejects.toThrow('mock-exit');
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(errorSpy).toHaveBeenCalledWith(
      'DATABASE CONNECTION ERROR:',
      expect.any(Error),
    );

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});
