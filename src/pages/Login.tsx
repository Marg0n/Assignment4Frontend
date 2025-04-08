import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Flex, Form, Input } from "antd";
import { TbFidgetSpinner } from "react-icons/tb";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomButton from "@/components/shared/CustomButton";

const Login = () => {
  // useLogin mutation hook
  const [login, { isLoading }] = useLoginMutation();

  // navigation
  const navigate = useNavigate();

  // useAppDispatch hook
  const dispatch = useAppDispatch();

  // onFinish function for submitting the form
  const onFinish = async (values: { email: string; password: string }) => {
    // console.log("Received values of form: ", values);

    const toastId = toast.loading("Logging in...");

    const userInfo = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.token);

      if (user) {
        dispatch(setUser({ 
          user: user as TUser, 
          token: res.token
        }));
        toast.success("Logged in successfully", {
          id: toastId,
          duration: 2000,
        });

        navigate("/");
      } else {
        toast.error("Failed to verify", { id: toastId });
        return <Navigate to="/login" replace={true} />;
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.log('error',error)
      toast.error(`${error?.data?.message || 'Something went wrong!'}`, { id: toastId });
      return <Navigate to="/login" replace={true} />;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 border rounded shadow-md border-purple-600 shadow-purple-600">
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          {/* email */}
          <label>Email</label>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} type="email" placeholder="Email" />
          </Form.Item>

          {/* password */}
          <label>Password</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {/* remember me and forget password */}
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="">Forgot password</a>
            </Flex>
          </Form.Item>

          {/* login button */}
          <Form.Item>
            <CustomButton 
              className="w-full !py-1.5"
              textName={
                isLoading ? (
                  <TbFidgetSpinner className="animate-spin" />
                ) : (
                  "Log in"
                )
              }
            />
            <p className="text-center mt-2">
              Don&apos;t have an account? <a href="">Register now!</a>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
