import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(value: string): Promise<boolean> {
    const userWithEmailExist = await this.userRepository.emailExist(value);
    return !userWithEmailExist;
  }
}

export const EmailUnique = (optionValidation: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propriety: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propriety,
      options: optionValidation,
      constraints: [],
      validator: EmailUniqueValidator,
    });
  };
};
