import { userController } from '../../controllers/user.controller';
import { userService } from '../../services/users.service';
import { Request, Response } from 'express';
import logger from '../../utils/logger.util';

// Mock dependencies
jest.mock('../../services/users.service');
jest.mock('../../utils/logger.util');

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};

describe('user.controller', () => {
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    req = {};
    res = mockResponse();
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should register user successfully', async () => {
      const mockUser = { username: 'test', email: 'test@example.com', password: 'pass' };
      (userService.createUserIntoDB as jest.Mock).mockResolvedValueOnce(mockUser);

      req.body = mockUser;

      await userController.createUser(req as Request, res);

      expect(userService.createUserIntoDB).toHaveBeenCalledWith(mockUser);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User registered successfully',
        data: mockUser,
      });
    });

    it('should handle user already exists error', async () => {
      (userService.createUserIntoDB as jest.Mock).mockRejectedValueOnce(new Error('User already exists!'));

      req.body = { email: 'test@example.com' };

      await userController.createUser(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists!' });
    });

    it('should handle unexpected error', async () => {
      (userService.createUserIntoDB as jest.Mock).mockRejectedValueOnce(new Error('Unexpected error'));

      req.body = { email: 'test@example.com' };

      await userController.createUser(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'An unexpected error occurred. Please try again later.',
      });
    });
  });

  describe('loginUser', () => {
    it('should login user and set cookie', async () => {
      const mockLogin = { userId: 'user123', token: 'mockToken' };
      (userService.loginUserFromDB as jest.Mock).mockResolvedValueOnce(mockLogin);

      req.body = { email: 'test@example.com', password: 'password' };

      await userController.loginUser(req as Request, res);

      expect(userService.loginUserFromDB).toHaveBeenCalledWith(req.body);
      expect(res.cookie).toHaveBeenCalledWith('token', 'mockToken', expect.any(Object));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User logged in successfully',
        userId: 'user123',
      });
    });

    it('should handle login errors', async () => {
      (userService.loginUserFromDB as jest.Mock).mockRejectedValueOnce(new Error('Login failed'));

      req.body = { email: 'test@example.com', password: 'password' };

      await userController.loginUser(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'An unexpected error occurred. Please try again later.',
      });
    });
  });

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      (userService.ResetPassword as jest.Mock).mockResolvedValueOnce('Password changed');

      req.body = { email: 'test@example.com', currentPassword: 'oldpass', newPassword: 'newpass' };

      await userController.resetPassword(req as Request, res);

      expect(userService.ResetPassword).toHaveBeenCalledWith('test@example.com', 'oldpass', 'newpass');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Password changed',
      });
    });

    it('should handle reset password error', async () => {
      (userService.ResetPassword as jest.Mock).mockRejectedValueOnce(new Error('Reset error'));

      req.body = { email: 'test@example.com', currentPassword: 'oldpass', newPassword: 'newpass' };

      await userController.resetPassword(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error occurred' });
    });
  });

  describe('forgotPassword', () => {
    it('should send reset link on success', async () => {
      const successMessage = 'Reset link sent to your email.please check your email or email spam folder';
      (userService.ForgotPassword as jest.Mock).mockResolvedValueOnce(successMessage);

      req.body = { email: 'test@example.com' };

      await userController.forgotPassword(req as Request, res);

      expect(userService.ForgotPassword).toHaveBeenCalledWith('test@example.com');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: successMessage,
      });
    });

    it('should handle invalid forgot password response', async () => {
      (userService.ForgotPassword as jest.Mock).mockResolvedValueOnce('Invalid email');

      req.body = { email: 'invalid@example.com' };

      await userController.forgotPassword(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid email',
      });
    });

    it('should handle forgot password server error', async () => {
      (userService.ForgotPassword as jest.Mock).mockRejectedValueOnce(new Error('Forgot error'));

      req.body = { email: 'test@example.com' };

      await userController.forgotPassword(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Server error occurred.please try again later',
      });
    });
  });

  describe('resetPasswordWithToken', () => {
    it('should reset password with token successfully', async () => {
      (userService.ResetPasswordWithToken as jest.Mock).mockResolvedValueOnce('Password reset successfully');

      req.params = { token: 'resettoken' };
      req.body = { newPassword: 'newpass' };

      await userController.resetPasswordWithToken(req as Request, res);

      expect(userService.ResetPasswordWithToken).toHaveBeenCalledWith('resettoken', 'newpass');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Password reset successfully',
      });
    });

    it('should handle invalid token or reset failure', async () => {
      (userService.ResetPasswordWithToken as jest.Mock).mockResolvedValueOnce('Invalid or expired token');

      req.params = { token: 'badtoken' };
      req.body = { newPassword: 'newpass' };

      await userController.resetPasswordWithToken(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid or expired token',
      });
    });

    it('should handle server error on token reset', async () => {
      (userService.ResetPasswordWithToken as jest.Mock).mockRejectedValueOnce(new Error('Token reset error'));

      req.params = { token: 'resettoken' };
      req.body = { newPassword: 'newpass' };

      await userController.resetPasswordWithToken(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error occurred' });
    });
  });

  describe('getUserSignupStats', () => {
    it('should get user signup stats successfully', async () => {
      const mockStats = [{ month: 'January', count: 10 }];
      (userService.getUserSignupsByMonth as jest.Mock).mockResolvedValueOnce(mockStats);

      await userController.getUserSignupStats(req as Request, res);

      expect(userService.getUserSignupsByMonth).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockStats,
        message: 'User signup statistics retrieved successfully',
      });
    });

    it('should handle stats fetching error', async () => {
      (userService.getUserSignupsByMonth as jest.Mock).mockRejectedValueOnce(new Error('Stats error'));

      await userController.getUserSignupStats(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to retrieve user signup statistics',
      });
    });
  });
});
