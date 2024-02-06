import { Module } from '@nestjs/common';
import { PropertyResolver } from './property.resolver';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  providers: [PropertyResolver, PropertyService],
})
export class PropertyModule {}
