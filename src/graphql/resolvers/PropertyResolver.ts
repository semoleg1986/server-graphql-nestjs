import {
  Args,
  Int,
  Query,
  ResolveField,
  Resolver,
  Parent,
} from '@nestjs/graphql';
import { Property } from '../models/Property';
import { mockProperties } from 'src/_mocks/mockProperties';
import { PropertySetting } from '../models/PropertySetting';
import { mockPropertiesSettings } from 'src/_mocks/mockPropertiesSettings';

@Resolver(() => Property)
export class PropertyResolver {
  @Query(() => Property, { nullable: true })
  getPropertyById(@Args('id', { type: () => Int }) id: number) {
    return mockProperties.find((property) => property.id === id);
  }

  @Query(() => [Property])
  getProperties() {
    return mockProperties;
  }

  @ResolveField(() => PropertySetting, {
    name: 'settings',
    nullable: true,
  })
  getProperySettings(@Parent() property: Property) {
    return mockPropertiesSettings.find(
      (setting) => setting.propertyId === property.id,
    );
  }
}
