import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { differenceInYears, parseISO } from 'date-fns';

@ValidatorConstraint({ name: 'isAdult', async: false })
export class IsAdultConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    // Aceita objeto Date ou string ISO
    const date = typeof value === 'string' ? parseISO(value) : value;
    
    if (!(date instanceof Date) || isNaN(date.getTime())) return false;

    return differenceInYears(new Date(), date) >= 18;
  }

  defaultMessage() {
    return 'A pessoa deve ter pelo menos 18 anos.';
  }
}

export function IsAdult(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAdultConstraint,
    });
  };
}