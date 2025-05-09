/* eslint-disable @typescript-eslint/no-explicit-any */
import ResponsiveNavbar from "@/components/home/ResponsiveNavbar";
import CustomButton from "@/components/shared/CustomButton";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../../components/shared/Loading";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const Checkout = () => {
  const axiosCommon = useAxiosCommon();
  const { id } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState("");

  //* navigation
  const navigate = useNavigate();

  //* check data for stock
  const { data, isLoading, isError } = useGetProductByIdQuery(id as string);

  const productData = data?.data;

  useEffect(() => {
    if (productData && productData?.inStock === false) {
      toast.info("Item is not available!");
      navigate("/");
    }
  }, [productData, navigate]);

  useEffect(() => {
    const localUser = localStorage.getItem("userData");
    if (localUser) {
      const user = JSON.parse(localUser);
      setUserId(user?._id);
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      quantity: 1,
      contact: "",
      deliveryAddress: "",
    },
  });

  const { isPending, data: product } = useQuery({
    queryKey: ["checkoutProduct", id],
    queryFn: async () => {
      try {
        const response = await axiosCommon.get(`/api/products/${id}`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data.data;
      } catch (error: any) {
        console.error("Error fetching product:", error);
        toast.error(error.message);
        throw error;
      }
    },
    enabled: !!id,
  });

  const quantity = watch("quantity");

  useEffect(() => {
    if (product && product.price) {
      const total = product.price * quantity;
      setTotalPrice(Number(total.toFixed(2)));
    }
  }, [product, quantity]);

  const onSubmit = async (formData: {
    quantity: number;
    contact: string;
    deliveryAddress: string;
  }) => {
    const orderData = {
      products: [
        {
          product: id,
          quantity: formData.quantity,
          price: product.price,
        },
      ],
      user: userId,
      totalPrice: totalPrice,
      isDeleted: false,
      status: "PENDING",
      paymentStatus: "UNPAID",
      contact: formData.contact,
      deliveryAddress: formData.deliveryAddress,
    };

    console.log(orderData);
    // const response = await axiosCommon.post("/api/orders/create-order", orderData);
    // window.location.replace(response.data.data.GatewayPageURL);
  };

  if (isPending) return <Loading />;
  if (isError) return toast.error("Something went wrong!");
  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen container mx-auto px-4 py-10 lg:px-8">
      <ResponsiveNavbar />

      {product && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12"
        >
          {/* Left: Product Summary */}
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
              <p className="text-muted-foreground text-sm font-semibold">
                {product.price} Tk per unit
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Quantity</p>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() =>
                    setValue("quantity", Math.max(1, quantity - 1))
                  }
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
                <p className="text-sm text-red-500">
                  {errors.quantity.message}
                </p>
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

          {/* Right: Shipping Details (Phone & Address) */}
          <div className="bg-white border rounded-xl shadow p-6 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-3">
                <label className="block text-sm font-medium">Contact</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  {...register("contact", {
                    required: "Phone number is required",
                  })}
                />
                {errors.contact && (
                  <p className="text-sm text-red-500">
                    {errors?.contact?.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="block text-sm font-medium">
                  Delivery Address
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  {...register("deliveryAddress", {
                    required: "Address is required",
                  })}
                  rows={5}
                />
                {errors.deliveryAddress && (
                  <p className="text-sm text-red-500">
                    {errors?.deliveryAddress?.message}
                  </p>
                )}
              </div>
            </div>

            <CustomButton
              textName={isSubmitting ? "Placing Order..." : "Place Order"}
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
