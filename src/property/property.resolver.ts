import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { CreatePropertyInput } from './inputs/create-property.input';
import { UpdatePropertyInput } from './inputs/update-property.input';
import { CurrentUser } from 'src/auth/get-current-user.decorator';
import { User } from 'src/users/user.entity';
import { Property } from './property.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Resolver(() => Property)
export class PropertyResolver {
  constructor(private propertyService: PropertyService) {}

  @Query(() => [Property])
  async getPropertyWithId(@Args('id') id: string) {
    const property = await this.propertyService.getPropertyWithId(id);
    return [property];
  }

  @Query(() => [Property])
  async getPropertyWithCategory(@Args('category') category: string) {
    return await this.propertyService.getPropertyWithCategory(category);
  }

  @Query(() => [Property])
  async getProperties() {
    return await this.propertyService.getAllProperties();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Property])
  async getAllPropertiesByUser(@CurrentUser() user: User): Promise<Property[]> {
    return this.propertyService.getAllPropertiesByUser(user);
  }

  @Query(() => Property)
  async getPropertyByUser(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<Property> {
    return this.propertyService.getPropertyByUser(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Property)
  async createProperty(
    @Args('createPropertyInput') createPropertyInput: CreatePropertyInput,
    @CurrentUser() user: any,
  ): Promise<Property> {
    return await this.propertyService.createProperty(createPropertyInput, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Property)
  async updateProperty(
    @CurrentUser() user: User,
    @Args('updatePropertyInput') updatePropertyInput: UpdatePropertyInput,
  ): Promise<Property> {
    return await this.propertyService.updateProperty(updatePropertyInput, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteProperty(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<Property> {
    return this.propertyService.deleteProperty(id, user);
  }
}
