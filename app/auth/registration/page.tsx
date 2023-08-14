'use client';

import { MyButton } from '@/components/UI/MyButton/MyButton';
import MyInput from '@/components/UI/MyInput/MyInput';
import { Colors } from '@/variables/colors';
import s from '../../../styles/auth.module.scss';
import '../../../components/UI/MyButton/myButton.scss';
import '../../../components/UI/MyInput/myInput.scss';
import { useForm } from 'react-hook-form';
import { useRegistrationMutation } from '@/store/services';
import { ErrorRegistrationType, registrationUserType, successLoginType } from '@/store/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/variables/routes';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectGetUser, setUser } from '@/store/slice/userSlice';
import { EMAILVALIDATION } from '@/variables/constant';

export default function Registration() {
  const user = useAppSelector(selectGetUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registrationUserType>();
  const [registration, { isLoading, error }] = useRegistrationMutation<any>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = handleSubmit(async (user) => {
    await registration(user)
      .unwrap()
      .then((resp) => {
        const { username, token } = resp;
        dispatch(setUser({ username, token }));
        router.push(routes.checkout);
      });
  });

  if (user.token) {
    router.push(routes.chooseCard);
  }

  return (
    <>
      <div className={s.registration__text}>
        <h1 className={s.registration__title}>Create account</h1>
        <p className={s.registration__subtitle}>
          You need to enter your name and email. We will send you a temporary password by email
        </p>
      </div>
      <form onSubmit={onSubmit} className={s.registration__form}>
        <MyInput
          placeholder="Username"
          error={errors.username}
          {...register('username', { required: 'field cannot be empty' })}
        />
        {errors.username && <span className="error_message">{errors.username.message}</span>}
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
        {errors.email && <span className="error_message">{errors.email.message}</span>}
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
        {errors.password && <span className="error_message">{errors.password.message}</span>}
        <MyButton
          type="submit"
          className={`${Colors.primary} registration`}
          isLoading={isLoading}
          disabled={false}>
          Send password
        </MyButton>
        {error && <span className="error_message">{error.data.message}</span>}
        <p className={s.registration__subtitle}>
          Have an account?
          <Link href="/auth/login" className={s.registration__link}>
            Go to the next step
          </Link>
        </p>
      </form>
    </>
  );
}
