'use client';

import { MyButton } from '@/components/UI/MyButton/MyButton';
import MyInput from '@/components/UI/MyInput/MyInput';
import { Colors } from '@/variables/colors';
import s from '../../../styles/auth.module.scss';
import '../../../components/UI/MyButton/myButton.scss';
import '../../../components/UI/MyInput/myInput.scss';
import { useForm } from 'react-hook-form';
import { useRegistrationMutation } from '@/store/services';
import {
  ErrorRegistrationType,
  SuccessRegistrationType,
  registrationUser,
} from '@/store/types';
import { useState } from 'react';
import { setUser } from '@/store/slice/userSlice';
import { useAppDispatch } from '@/store';
import { useRouter } from 'next/navigation';
import { routes } from '@/variables/routes';

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registrationUser>();
  const dispatch = useAppDispatch();
  const [registration] = useRegistrationMutation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (user) => {
    setError('');
    setLoading(true);
    await registration(user)
      .unwrap()
      .then((resp) => {
        dispatch(setUser(resp as unknown as SuccessRegistrationType));
        router.push(routes.login);
      })
      .catch((error: ErrorRegistrationType) => {
        setError(error.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <>
      <div className={s.registration__text}>
        <h1 className={s.registration__title}>Create account</h1>
        <p className={s.registration__subtitle}>
          You need to enter your name and email. We will send you a temporary
          password by email
        </p>
      </div>
      <form onSubmit={onSubmit} className={s.registration__form}>
        <MyInput
          placeholder="Username"
          error={errors.username}
          {...register('username', { required: 'field cannot be empty' })}
        />
        {errors.username && (
          <span className="error_message">{errors.username.message}</span>
        )}
        <MyInput
          placeholder="Email"
          error={errors.email}
          {...register('email', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
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
          isLoading={loading}
          disabled={false}>
          Send password
        </MyButton>
        <span className="error_message">{error}</span>
      </form>
    </>
  );
}
