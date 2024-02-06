import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreatePropertyInput } from './inputs/create-property.input';
import { UpdatePropertyInput } from './inputs/update-property.input';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async getAllProperties(): Promise<Property[]> {
    return await this.propertyRepository.find();
  }
  async getPropertyWithId(id: string): Promise<Property> {
    return await this.propertyRepository.findOne({ where: { id } });
  }

  async getPropertyWithCategory(category: string): Promise<Property[]> {
    return await this.propertyRepository.find({ where: { category } });
  }

  async createProperty(propertyData: CreatePropertyInput): Promise<Property> {
    const property = this.propertyRepository.create({
      ...propertyData,
      id: uuid(),
      createdAt: new Date(),
    });
    return await this.propertyRepository.save(property);
  }

  async updateProperty(
    id: string,
    updatePropertyInput: UpdatePropertyInput,
  ): Promise<Property> {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with id ${id} not found`);
    }

    for (const key in updatePropertyInput) {
      if (updatePropertyInput[key] !== undefined) {
        property[key] = updatePropertyInput[key];
      }
    }

    return await this.propertyRepository.save(property);
  }

  async deleteProperty(id: string): Promise<void> {
    const property = await this.propertyRepository.findOne({ where: { id } });

    if (!property) {
      throw new Error(`Property with ID ${id} not found.`);
    }

    await this.propertyRepository.remove(property);
  }
}
