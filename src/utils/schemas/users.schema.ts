import { z } from 'zod';
import { Role } from '../../types/role';

export const createUserSchema = z.object({
	body: z.object({
		name: z
			.string({
				required_error: 'Name is required',
			})
			.min(3, 'Name must have at least 3 characters')
			.max(255, 'Name must have less than 255 characters'),
		email: z
			.string({
				required_error: 'Email is required',
			})
			.email(
				'Email is invalid. Please provide a valid email address',
			),
		password: z
			.string({
				required_error: 'Password is required',
			})
			.min(6, 'Password must have at least 6 characters')
			.max(255, 'Password must have less than 255 characters'),
		role: z.enum([Role.User, Role.Admin], {
			required_error: 'Role is invalid. Please provide a valid role',
		}),
	}),
});

export const updateUserSchema = z.object({
	params: z.object({
		id: z.string({
			required_error: 'Id is required',
		}),
	}),
	body: z.object({
		name: z.string().min(3).max(255).optional(),
		email: z.string().email().optional(),
		password: z.string().min(6).max(255).optional(),
		role: z.enum([Role.User, Role.Admin]).optional(),
	}),
});

export const deleteUserSchema = z.object({
	params: z.object({
		id: z.string({
			required_error: 'Id is required',
		}),
	}),
});

export const getUserSchema = z.object({
	params: z.object({
		id: z.string({
			required_error: 'Id is required',
		}),
	}),
});
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type DeleteUserInput = z.infer<typeof deleteUserSchema>;
export type GetUserInput = z.infer<typeof getUserSchema>;
