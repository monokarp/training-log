import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { <%= pascal(name) %>Controller } from './<%=name %>.controller';
import { <%= pascal(name) %>Repository } from './<%=name %>.repository';
import { <%= pascal(name) %>Service } from './<%=name %>.service';

@Module({
	imports: [SharedModule],
	controllers: [<%= pascal(name) %>Controller],
	providers: [<%= pascal(name) %>Service, <%= pascal(name) %>Repository],
})
export class <%= pascal(name) %>Module {}
