import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { PropertyType } from './property.type';
import { PropertyService } from './property.service';
import { CreatePropertyInput } from './inputs/create-property.input';
import { UpdatePropertyInput } from './inputs/update-property.input';

@Resolver(() => PropertyType)
export class PropertyResolver {
  constructor(private propertyService: PropertyService) {}

  @Query(() => [PropertyType])
  async getPropertyWithId(@Args('id') id: string) {
    const property = await this.propertyService.getPropertyWithId(id);
    return [property];
  }

  @Query(() => [PropertyType])
  async getPropertyWithCategory(@Args('category') category: string) {
    return await this.propertyService.getPropertyWithCategory(category);
  }

  @Query(() => [PropertyType])
  async getProperties() {
    return await this.propertyService.getAllProperties();
  }

  @Mutation(() => PropertyType)
  async createProperty(
    @Args('createPropertyInput') createPropertyInput: CreatePropertyInput,
  ) {
    return await this.propertyService.createProperty(createPropertyInput);
  }

  @Mutation(() => PropertyType)
  async updateProperty(
    @Args('id') id: string,
    @Args('updatePropertyInput') updatePropertyInput: UpdatePropertyInput,
  ) {
    return await this.propertyService.updateProperty(id, updatePropertyInput);
  }

  @Mutation(() => Boolean)
  async deleteProperty(@Args('id') id: string): Promise<boolean> {
    try {
      await this.propertyService.deleteProperty(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
