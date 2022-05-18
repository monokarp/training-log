import { SetMetadata } from '@nestjs/common';

export const SKIP_JWT = 'skipAuth';

export const SkipJwtAuth = () => SetMetadata(SKIP_JWT, true);
