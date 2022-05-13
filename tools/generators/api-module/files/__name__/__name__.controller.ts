import { Controller } from '@nestjs/common';
import { <%= pascal(name) %>Service } from './<%= name %>.service';

@Controller('<%= name %>')
export class <%= pascal(name) %>Controller {
	constructor(private <%= name %>Service: <%= pascal(name) %>Service) {}
}
