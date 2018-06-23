import * as React from 'react';
import { User } from 'firebase';

const AuthUserContext = React.createContext<User | null>((undefined as any) as User);

export default AuthUserContext;