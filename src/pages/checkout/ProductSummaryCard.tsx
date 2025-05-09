/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";

type ProductSummaryProps = {
  product: any;
  quantity: number;
  totalPrice: number;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};

const ProductSummaryCard = ({
  product,
  quantity,
  totalPrice,
  register,
  errors,
  setValue,
}: ProductSummaryProps) => {
  return (
    <div className="bg-white border rounded-xl shadow p-6 space-y-6">
      <img
        src={
          product.Img
            ? product.Img
            : "../../../src/assets/images/img/bicycle.jpg"
        }
        alt={product?.name}
        className="w-full h-64 object-cover rounded-lg"
      />

      <div>
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <p className="text-muted-foreground text-sm">
          {product.price} Tk per unit
        </p>
      </div>

      <div className="space-y-2">
        <p className="font-medium">Quantity</p>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setValue("quantity", Math.max(1, quantity - 1))}
            className="w-9 h-9 rounded-md border hover:bg-muted transition"
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            min="1"
            max="100"
            className="w-16 text-center border rounded-md py-1"
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Minimum 1 item" },
              valueAsNumber: true,
            })}
          />
          <button
            type="button"
            onClick={() => setValue("quantity", quantity + 1)}
            className="w-9 h-9 rounded-md border hover:bg-muted transition"
          >
            +
          </button>
        </div>
        {errors.quantity && (
          <p className="text-sm text-red-500">{errors?.quantity?.message as string}</p>
        )}
      </div>

      <div className="pt-4 border-t space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{totalPrice} Taka</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>{totalPrice} Taka</span>
        </div>
      </div>
    </div>
  );
};

export default ProductSummaryCard;
