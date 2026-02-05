import { useState } from 'react';

import { Card, CardContent } from '@components/ui/card';
import { Spinner } from '@components/ui/spinner';
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldError,
} from '@components/ui/field';
import { Label } from '@components/ui/label';
import { Checkbox } from '@components/ui/checkbox';
import { Button } from '@components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import supabase from '@/services/supabase';
import { useNavigate } from 'react-router';

import googleLogo from '@assets/icons/google.svg';
import githubLogo from '@assets/icons/github.svg';
import OAuthButton from '@components/OAuthButton/OAuthButton';
import AuthInput from '@components/AuthInput/AuthInput';
import { getMe } from '@/services/user';
import schema from '@/schemas/auth.schema';

const OAuthProviders = [
  {
    provider: 'Google',
    iconUrl: googleLogo,
  },
  {
    provider: 'Github',
    iconUrl: githubLogo,
  },
];

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: 'zamani.nima18@gmail.com', password: '123456789' },
  });

  const onSubmit = async (userInfo) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(userInfo);
      if (data.user) {
        const user = await getMe(data.user.id);
        const isAdmin = user.role === 'admin' || user.role === 'super_admin';

        if (!isAdmin) {
          await supabase.auth.signOut();
          setError('root', { message: 'Incorrect email or password.' });
          return;
        }

        navigate('/');
      } else throw error;
    } catch (err) {
      const error = Object.fromEntries(Object.entries(err));
      let errorMsg = '';
      if (error.code === 'ERR_NETWORK' || error.status === 0) {
        errorMsg = 'Network error. Please check your connection and try again.';
      } else if (error.code === 'invalid_credentials') {
        errorMsg = 'Incorrect email or password.';
      } else {
        errorMsg = 'An unexpected error occurred. Please try again.';
        console.log('error in login user => ', error);
      }
      setError('root', { message: errorMsg });
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend className="mb-3 text-lg!">Sign In to your account</FieldLegend>
              <FieldError>{errors.root?.message}</FieldError>
              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <AuthInput
                    type="email"
                    placeholder="Enter your email"
                    aria-invalid={!!errors.email}
                    {...register('email')}
                  />
                  <FieldError>{errors.email?.message}</FieldError>
                </Field>
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <AuthInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    buttonIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    onButtonClick={() => setShowPassword((prev) => !prev)}
                    aria-invalid={!!errors.password}
                    {...register('password')}
                  />
                  <FieldError>{errors.password?.message}</FieldError>
                </Field>
                <div className="flex justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember-me" />
                    <Label htmlFor="remember-me">Remember me</Label>
                  </div>
                  <Link className="text-sm text-blue-400 underline">Forgot Password?</Link>
                </div>
              </FieldGroup>
              <Button
                type="submit"
                className="h-10 w-full bg-blue-500 text-white hover:bg-blue-500 hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="size-5" />
                    Please wait...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </FieldSet>
          </FieldGroup>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="border-border w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card text-muted-foreground px-2">Or continue with</span>
          </div>
        </div>
        <div className="space-y-3">
          {OAuthProviders.map((button) => (
            <OAuthButton key={button.provider} {...button} />
          ))}
        </div>
        <p className="text-muted-foreground mt-6 text-center text-xs">
          All rights reserved &copy; {new Date().getFullYear()}
        </p>
      </CardContent>
    </Card>
  );
}

export default SignIn;
