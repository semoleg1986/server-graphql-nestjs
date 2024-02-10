import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyInput } from './inputs/create-property.input';
import { UpdatePropertyInput } from './inputs/update-property.input';
import { PropertyStatus } from './property.status';
import { User } from 'src/users/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async getAllProperties(): Promise<Property[]> {
    return await this.propertyRepository.find();
  }

  async getAllPropertiesByUser(user): Promise<Property[]> {
    const properties = await this.propertyRepository.find({ where: { user } });
    if (!properties) {
      throw new InternalServerErrorException();
    }
    return properties;
  }

  async getPropertyWithId(id: string): Promise<Property> {
    return await this.propertyRepository.findOne({ where: { id } });
  }

  async getPropertyByUser(id: string, user: User): Promise<Property> {
    const propertyFound = await this.propertyRepository.findOne({
      where: { id, user },
    });
    if (!propertyFound) {
      throw new NotFoundException(`Property with ID ${id} not found.`);
    }
    return propertyFound;
  }

  async getPropertyWithCategory(category: string): Promise<Property[]> {
    return await this.propertyRepository.find({ where: { category } });
  }

  async createProperty(
    propertyData: CreatePropertyInput,
    user: User,
  ): Promise<Property> {
    const newProperty = this.propertyRepository.create({
      ...propertyData,
      id: uuid(),
      status: PropertyStatus.PENDING,
      user,
    });

    try {
      await this.propertyRepository.save(newProperty);
      return newProperty;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateProperty(
    updatePropertyInput: UpdatePropertyInput,
    user: User,
  ): Promise<Property> {
    const property = await this.getPropertyByUser(updatePropertyInput.id, user);
    if (!property) {
      throw new NotFoundException(
        `Property with id ${updatePropertyInput.id} not found`,
      );
    }

    for (const key in updatePropertyInput) {
      if (updatePropertyInput[key] !== undefined) {
        property[key] = updatePropertyInput[key];
      }
    }

    return await this.propertyRepository.save(property);
  }

  async deleteProperty(id: string, user: User): Promise<Property> {
    const propertyFound = await this.getPropertyByUser(id, user);
    const removedPropertyId = propertyFound.id;
    const result: Property =
      await this.propertyRepository.remove(propertyFound);
    if (!result) {
      throw new NotFoundException(`Property with ID ${id} not found.`);
    }
    result.id = removedPropertyId;
    return result;
  }
}
