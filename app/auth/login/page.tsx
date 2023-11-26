'use client';

import MyInput from '@/components/UI/MyInput/MyInput';
import s from '../../../styles/auth.module.scss';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import { useForm } from 'react-hook-form';
import { loginUserType } from '@/store/types';
import { useAppDispatch, useAppSelector } from '@/store';
import { useRouter } from 'next/navigation';
import { Colors } from '@/variables/colors';
import { useLoginMutation } from '@/store/services';
import { selectGetUser, setUser } from '@/store/slice/userSlice';
import { routes } from '@/variables/routes';
import { EMAILVALIDATION } from '@/variables/constant';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserType>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectGetUser);
  const [login, { error, isLoading }] = useLoginMutation<any>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (user) => {
    await login(user)
      .unwrap()
      .then((resp) => {
        const {
          token,
          user: { username },
        } = resp;
        dispatch(setUser({ token, username }));
        router.push(routes.checkout);
      });
  });

  return (
    <>
      <div className={s.registration__text}>
        <h1 className={s.registration__title}>Log in</h1>
      </div>
      <form onSubmit={onSubmit} className={s.registration__form}>
        <MyInput
          placeholder="Email"
          error={errors.email}
          {...register('email', {
            pattern: {
              value: EMAILVALIDATION,
              message: 'incorrect email',
            },
          })}
        />
        {errors.email && (
          <span className="error_message">{errors.email.message}</span>
        )}
        <MyInput
          placeholder="Password"
          error={errors.password}
          {...register('password', {
            minLength: {
              value: 6,
              message: 'password cannot be shorter than 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className="error_message">{errors.password.message}</span>
        )}
        <MyButton
          type="submit"
          className={`${Colors.primary} registration`}
          isLoading={isLoading}>
          Log in
        </MyButton>
        {error && <span className="error_message">{error.data.message}</span>}
      </form>
    </>
  );
}
