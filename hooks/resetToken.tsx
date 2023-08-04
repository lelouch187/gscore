import { useAppDispatch } from '@/store';
import { logoutUser } from '@/store/slice/userSlice';
import { routes } from '@/variables/routes';
import { useRouter } from 'next/navigation';

export function useResetToken() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const resetToken = () => {
    dispatch(logoutUser());
    router.push(routes.registration);
  };
  return resetToken;
}
