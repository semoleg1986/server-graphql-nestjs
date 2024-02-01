import { Query, Resolver } from '@nestjs/graphql';
import { Property } from '../models/Property';

@Resolver()
export class PropertyResolver {
  @Query(() => Property)
  getProperty() {
    return {
      name: 'Уютная квартира',
      cost: 100000,
      description: 'Прекрасная квартира с видом на город',
      location: 'Центральный район',
      contacts: 'Телефон: 123-456-789',
    };
  }
}
