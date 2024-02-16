import { z } from 'zod';
import { PaymentMethod } from '../../types/payment-method';
import { State } from '../../types/state';

export const getSaleSchema = z.object({
	params: z.object({
		id: z.string({
			required_error: 'Id is required',
		}),
	}),
});

export const deleteSaleSchema = z.object({
	params: z.object({
		id: z.string({
			required_error: 'Id is required',
		}),
	}),
});

export const updateSaleSchema = z.object({
	params: z.object({
		id: z.string({
			required_error: 'Id is required',
		}),
	}),
	body: z.object({
		products: z.array(
			z.object({
				product: z.string().optional(),
				amount: z.number().optional(),
			}),
		).optional(),
		paymentMethod: z
			.enum([PaymentMethod.CASH, PaymentMethod.TRANSFER])
			.optional(),
		state: z
			.enum([State.PROCESSING, State.COMPLETED, State.CANCELED])
			.optional(),
		total: z.number().optional(),
	}),
});

export const addProductSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Id is required',
    }),
  }),
  body: z.object({
    product: z.string({
      required_error: 'Product is required',
    }),
    amount: z.number({
      required_error: 'Amount is required',
    }),
  }),
});

export const deleteProductSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Id is required',
    }),
    productId: z.string({
      required_error: 'Product id is required',
    }),
  }),
});


export type GetSaleInput = z.infer<typeof getSaleSchema>;
export type DeleteSaleInput = z.infer<typeof deleteSaleSchema>;
export type UpdateSaleInput = z.infer<typeof updateSaleSchema>;
export type AddProductInput = z.infer<typeof addProductSchema>;
export type DeleteProductInput = z.infer<typeof deleteProductSchema>;

