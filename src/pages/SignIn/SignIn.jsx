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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import supabase from '@/services/supabase';
import { useNavigate } from 'react-router';

import AuthInput from '@components/AuthInput/AuthInput';
import { getMe } from '@/services/user';
import schema from '@/schemas/auth.schema';

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
    defaultValues: { email: 'johndoe@gmail.com', password: '123456789' },
  });

  const onSubmit = async (userInfo) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(userInfo);
      if (data.user) {
        const user = await getMe(data.user.id);
        const isUser = user.role === 'user';
        const isBanned = user.status === 'banned';

        if (isUser) {
          await supabase.auth.signOut();
          setError('root', { message: 'You don’t have permission to access this page.' });
          return;
        }

        if (isBanned) {
          await supabase.auth.signOut();
          setError('root', {
            message:
              'Your banned from this platform. Contact zamani.nima18@gmail.com for more info.',
          });
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
              <FieldLegend className="mb-5 text-lg!">Sign In to your account</FieldLegend>
              <FieldError>{errors.root?.message}</FieldError>
              <FieldGroup className="gap-6">
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

        <p className="text-muted-foreground mt-6 text-center text-xs">
          All rights reserved &copy; {new Date().getFullYear()}
        </p>
      </CardContent>
    </Card>
  );
}

export default SignIn;
