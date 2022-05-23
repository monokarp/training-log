import { TestAttributes } from '@training-log/shared';
import { ComponentObject } from './component-object';

class LoginPage extends ComponentObject {}

export const login = new LoginPage(TestAttributes.LoginForm);
