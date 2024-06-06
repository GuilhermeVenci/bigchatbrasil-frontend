import AuthActions from '@/app/(auth)/actions';
import Button from '@/components/ui/button';
import PasswordConfirmInput from './inputs/password-confirm-input';
import EmailInput from './inputs/email-input';

const SignUpForm = () => {
  return (
    <form action={AuthActions.signUp} className="mt-6 flex flex-col gap-y-5">
      <EmailInput label="Email" id="email" name="email" required />
      <PasswordConfirmInput className="-mt-4" />
      <Button>Cadastrar</Button>
    </form>
  );
};

export default SignUpForm;
