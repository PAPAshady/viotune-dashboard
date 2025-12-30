import { InputGroup, InputGroupInput, InputGroupButton } from '@components/ui/input-group';

function AuthInput({ buttonIcon, onButtonClick, ...props }) {
  return (
    <InputGroup>
      <InputGroupInput autoComplete="new-password" {...props} />
      {buttonIcon && (
        <InputGroupButton onClick={onButtonClick} size="sm">
          {buttonIcon}
        </InputGroupButton>
      )}
    </InputGroup>
  );
}

export default AuthInput;
