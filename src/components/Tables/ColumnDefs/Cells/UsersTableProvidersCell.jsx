import { MailOpenIcon } from 'lucide-react';

import githubIcon from '@assets/icons/github.svg';
import googleIcon from '@assets/icons/google.svg';

function UsersTableProvidersCell({ getValue }) {
  return (
    <div className="ms-3 flex items-center">
      {getValue().map((provider) => (
        <div
          className="border-muted-foreground bg-card -ms-2 flex size-6.5 items-center justify-center rounded-full border p-1"
          key={provider}
        >
          {provider === 'email' ? (
            <MailOpenIcon className="size-full" />
          ) : (
            <img src={provider === 'google' ? googleIcon : githubIcon} className="size-full" />
          )}
        </div>
      ))}
    </div>
  );
}

export default UsersTableProvidersCell;
