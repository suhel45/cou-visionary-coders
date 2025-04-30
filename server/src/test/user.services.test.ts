import { userService } from '../services/users.service';
import userModel from '../models/user.Model';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/token.util';
import nodemailer from 'nodemailer';

// Mock dependencies
jest.mock('../models/user.Model');
jest.mock('argon2');
jest.mock('jsonwebtoken');
jest.mock('../utils/token.util');
jest.mock('nodemailer');

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUserIntoDB', () => {
    it('should create a new user successfully', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValue(null);
      (argon2.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (userModel as any).mockImplementation(() => ({
        save: jest.fn().mockResolvedValue('newUserSaved'),
      }));

      const result = await userService.createUserIntoDB({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
      } as any);

      expect(result).toBe('newUserSaved');
    });

    it('should throw error if user already exists', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValue(true);

      await expect(
        userService.createUserIntoDB({
          username: 'testuser',
          email: 'test@example.com',
          password: 'Password123!',
        } as any),
      ).rejects.toThrow('User already exists!');
    });
  });

  describe('loginUserFromDB', () => {
    it('should login a user and return token', async () => {
      const fakeUser = {
        _id: 'userId',
        email: 'test@example.com',
        password: 'hashedPwd',
      };
      (userModel.findOne as jest.Mock).mockResolvedValue(fakeUser);
      (argon2.verify as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('fakeToken');
      process.env.JWT_SECRET_KEY = 'test_secret';

      const result = await userService.loginUserFromDB({
        email: 'test@example.com',
        password: 'Password123!',
      });

      expect(result).toEqual({ userId: 'userId', token: 'fakeToken' });
    });

    it('should throw error if user not found', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        userService.loginUserFromDB({
          email: 'test@example.com',
          password: 'Password123!',
        }),
      ).rejects.toThrow('User not found');
    });

    it('should throw error if password is invalid', async () => {
      const fakeUser = {
        _id: 'userId',
        email: 'test@example.com',
        password: 'wrongHash',
      };
      (userModel.findOne as jest.Mock).mockResolvedValue(fakeUser);
      (argon2.verify as jest.Mock).mockResolvedValue(false);

      await expect(
        userService.loginUserFromDB({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow('Invalid password');
    });
  });

  describe('loginOrCreateUserWithGoogle', () => {
    it('should login if user exists', async () => {
      const fakeUser = {
        _id: 'userId',
        email: 'test@example.com',
        password: 'hashedPwd',
      };
      (userModel.findOne as jest.Mock).mockResolvedValue(fakeUser);
      (jwt.sign as jest.Mock).mockReturnValue('fakeToken');
      process.env.JWT_SECRET_KEY = 'test_secret';

      const token = await userService.loginOrCreateUserWithGoogle(
        'test@example.com',
        'Test User',
      );

      expect(token).toBe('fakeToken');
    });

    it('should create new user if not exists', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValue(null);
      (argon2.hash as jest.Mock).mockResolvedValue('randomHashedPassword');
      (userModel as any).mockImplementation(() => ({
        save: jest
          .fn()
          .mockResolvedValue({ _id: 'newUser', email: 'test@example.com' }),
      }));
      (jwt.sign as jest.Mock).mockReturnValue('newToken');
      process.env.JWT_SECRET_KEY = 'test_secret';

      const token = await userService.loginOrCreateUserWithGoogle(
        'test@example.com',
        'Test User',
      );

      expect(token).toBe('newToken');
    });
  });

  describe('ResetPassword', () => {
    it('should reset password successfully', async () => {
      const fakeUser = { password: 'oldHashedPassword', save: jest.fn() };
      (userModel.findOne as jest.Mock).mockResolvedValue(fakeUser);
      (argon2.verify as jest.Mock)
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false);
      (argon2.hash as jest.Mock).mockResolvedValue('newHashedPassword');

      const message = await userService.ResetPassword(
        'test@example.com',
        'oldPass12@3',
        'newPass12@3',
      );

      expect(message).toBe('Password updated successfully');
    });

    it('should return error if user not found', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValue(null);

      const message = await userService.ResetPassword(
        'test@example.com',
        'oldPass12@3',
        'newPass12@3',
      );

      expect(message).toBe(
        'User not found.Please enter a validate email address',
      );
    });
  });

  describe('ForgotPassword', () => {
    it('should send reset link if user found', async () => {
      const fakeUser = { email: 'test@example.com', save: jest.fn() };
      (userModel.findOne as jest.Mock).mockResolvedValue(fakeUser);
      (generateToken as jest.Mock).mockReturnValue('resetToken');
      (nodemailer.createTransport as jest.Mock).mockReturnValue({
        sendMail: jest.fn().mockResolvedValue(true),
      });
      process.env.FRONTEND_BASE_URL = 'http://localhost:3000';

      const message = await userService.ForgotPassword('test@example.com');

      expect(message).toContain('Reset link sent to your email');
    });

    it('should return error if user not found', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValue(null);

      const message = await userService.ForgotPassword('invalid@example.com');

      expect(message).toBe(
        'User not found. Please enter a valid email address',
      );
    });
  });

  describe('ResetPasswordWithToken', () => {
    it('should reset password if token valid', async () => {
      const fakeUser = { password: 'oldHashedPassword', save: jest.fn() };
      (userModel.findOne as jest.Mock).mockResolvedValue(fakeUser);
      (argon2.verify as jest.Mock).mockResolvedValue(false);
      (argon2.hash as jest.Mock).mockResolvedValue('newHashedPassword');

      const message = await userService.ResetPasswordWithToken(
        'validToken',
        'newPass12@3',
      );

      expect(message).toBe('Password reset successfully');
    });

    it('should return error if token invalid', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValue(null);

      const message = await userService.ResetPasswordWithToken(
        'invalidToken',
        'newPass',
      );

      expect(message).toBe('Invalid or expired reset token');
    });
  });

  describe('getUserSignupsByMonth', () => {
    it('should return monthly user signup stats', async () => {
      const sampleData = [
        { month: 1, year: 2024, count: 10 },
        { month: 2, year: 2024, count: 15 },
      ];
      (userModel.aggregate as jest.Mock).mockResolvedValue(sampleData);

      const stats = await userService.getUserSignupsByMonth();

      expect(stats).toEqual(sampleData);
    });
  });
});
