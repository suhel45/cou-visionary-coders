import { authController } from '../../controllers/auth.controller';
import { userService } from '../../services/users.service';
import { Request, Response } from 'express';

// Mock the userService
jest.mock('../../services/users.service');

describe('authController - loginWithGoogle', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let cookieMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    cookieMock = jest.fn().mockReturnThis();

    res = {
      status: statusMock,
      json: jsonMock,
      cookie: cookieMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if email is not provided', async () => {
    req = {
      body: {
        username: 'testuser',
      },
    };

    await authController.loginWithGoogle(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Email is required' });
  });

  it('should log in successfully and set a cookie', async () => {
    req = {
      body: {
        email: 'test@example.com',
        username: 'testuser',
      },
    };

    (userService.loginOrCreateUserWithGoogle as jest.Mock).mockResolvedValue('mocked-token');

    await authController.loginWithGoogle(req as Request, res as Response);

    expect(userService.loginOrCreateUserWithGoogle).toHaveBeenCalledWith('test@example.com', 'testuser');
    expect(cookieMock).toHaveBeenCalledWith('token', 'mocked-token', expect.objectContaining({
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 3600000,
    }));
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      message: 'User logged in successfully',
    });
  });

  it('should handle unexpected errors', async () => {
    req = {
      body: {
        email: 'test@example.com',
        username: 'testuser',
      },
    };

    (userService.loginOrCreateUserWithGoogle as jest.Mock).mockRejectedValue(new Error('Unexpected error'));

    await authController.loginWithGoogle(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'An unexpected error occurred. Please try again later.',
    });
  });
});
