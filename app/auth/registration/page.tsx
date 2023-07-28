import { MyButton } from '@/components/UI/MyButton/MyButton';
import MyInput from '@/components/UI/MyInput/MyInput';
import { Colors } from '@/variables/colors';

export default function Registration() {
  return (
    <form>
      <MyInput />
      <MyInput />
      <MyButton variant={Colors.primary} isLoading={false} disabled={false} />
    </form>
  );
}
