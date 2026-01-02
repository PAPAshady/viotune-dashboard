import { Button } from '@components/ui/button';

function OAuthButton({ iconUrl, provider }) {
  return (
    <Button className="h-10 w-full" variant="secondary">
      <img src={iconUrl} alt={provider} className="me-1 size-5" />
      Sign in with {provider}
    </Button>
  );
}

export default OAuthButton;
