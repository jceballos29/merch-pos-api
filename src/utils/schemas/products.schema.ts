import { z } from 'zod';

export const createProductSchema = z.object({
	body: z.object({
		name: z
			.string({ required_error: 'Name is required' })
			.min(2, 'Name must have at least 2 characters')
			.max(255, 'Name must have less than 255 characters'),
		price: z.number({ required_error: 'Price is required' }),
	}),
});

export const createManyProductsSchema = z.object({
  body: z.array(
    z.object({
      name: z
        .string({ required_error: 'Name is required' })
        .min(2, 'Name must have at least 2 characters')
        .max(255, 'Name must have less than 255 characters'),
      price: z.number({ required_error: 'Price is required' }),
    }),
  ),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Id is required' }),
  }),
  body: z.object({
    name: z.string().min(2).max(255).optional(),
    price: z.number().optional(),
  }),
});

export const deleteProductSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Id is required' }),
  }),
});

export const getProductSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Id is required' }),
  }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateManyProductsInput = z.infer<typeof createManyProductsSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type DeleteProductInput = z.infer<typeof deleteProductSchema>;
export type GetProductInput = z.infer<typeof getProductSchema>;
