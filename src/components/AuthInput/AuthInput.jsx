import { InputGroup, InputGroupInput, InputGroupButton } from '@components/ui/input-group';

function AuthInput({ buttonIcon, ...props }) {
  return (
    <InputGroup>
      <InputGroupInput autoComplete="new-password" required {...props} />
      <InputGroupButton size="sm">{buttonIcon}</InputGroupButton>
    </InputGroup>
  );
}

export default AuthInput;
