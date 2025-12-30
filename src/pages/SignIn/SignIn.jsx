import { Card, CardContent } from '@components/ui/card';
import { Field, FieldLabel, FieldGroup, FieldSet, FieldLegend } from '@components/ui/field';
import { InputGroup, InputGroupInput, InputGroupButton } from '@components/ui/input-group';
import { Label } from '@components/ui/label';
import { Checkbox } from '@components/ui/checkbox';
import { Button } from '@components/ui/button';
import { EyeIcon } from 'lucide-react';
import googleLogo from '@assets/icons/google.svg';
import githubLogo from '@assets/icons/github.svg';
import { Link } from 'react-router';

function SignIn() {
  return (
    <Card className="w-full">
      <CardContent className="space-y-6">
        <form>
          <FieldGroup>
            <FieldSet>
              <FieldLegend className="mb-3 text-lg!">Sign In to your account</FieldLegend>
              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      autoComplete="new-password"
                      type="email"
                      required
                      placeholder="Enter your email"
                    />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      autoComplete="new-password"
                      type="password"
                      required
                      placeholder="Enter your password"
                    />
                    <InputGroupButton size="sm">
                      <EyeIcon />
                    </InputGroupButton>
                  </InputGroup>
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
              >
                Sign In
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
          <Button className="h-10 w-full" variant="secondary">
            <img src={googleLogo} alt="Google" className="me-1 size-5" />
            Sign in with Google
          </Button>
          <Button className="h-10 w-full" variant="secondary">
            <img src={githubLogo} alt="Google" className="me-1 size-5" />
            Sign in with Github
          </Button>
        </div>
        <p className="text-muted-foreground text-center text-sm">
          Don't have an account? <Link className="text-sm text-blue-400 underline">Sign Up</Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignIn;
