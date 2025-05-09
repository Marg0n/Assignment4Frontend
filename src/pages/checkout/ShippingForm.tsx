/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from "@/components/shared/CustomButton";
import { UseFormRegister, FieldErrors } from "react-hook-form";

type ShippingFormProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isSubmitting: boolean;
};

const ShippingForm = ({ register, errors, isSubmitting }: ShippingFormProps) => {
  return (
    <div className="bg-white border rounded-xl shadow p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Shipping Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="input-style"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors?.name?.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="input-style"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors?.email?.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input type="tel" className="input-style" {...register("phone")} />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input type="text" className="input-style" {...register("address")} />
        </div>
      </div>

      <CustomButton
        textName={isSubmitting ? "Placing Order..." : "Place Order"}
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-4"
      />
    </div>
  );
};

export default ShippingForm;
