import { Button, Row } from 'antd';
import PHForm from '../../../components/from/PHForm';
import PHInput from '../../../components/from/PHInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useChangePasswordMutation } from '../../../redux/api/userManagement.api';
import  { TResponse } from '../../../utils/types';
import { useAppDispatch } from '../../../redux/hooks';
import { logout } from '../../../redux/features/auth/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const updatePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const res = (await changePassword(data)) as TResponse<any>;
    console.log(res?.data?.success);
    if (res?.data?.success) {
      dispatch(logout());
      navigate('/login');
    }
  };
    return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password" />
        <PHInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
    );
  };
  
  export default updatePassword;