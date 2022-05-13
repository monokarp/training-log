import { Injectable } from '@nestjs/common';
import { <%= pascal(name) %>Repository } from './<%=name %>.repository';

@Injectable()
export class <%= pascal(name) %>Service {
	constructor(private <%= name %>Repository: <%= pascal(name) %>Repository) {}
}
