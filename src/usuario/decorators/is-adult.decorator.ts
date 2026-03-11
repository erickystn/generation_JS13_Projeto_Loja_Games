import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { differenceInYears, parseISO } from 'date-fns';

@ValidatorConstraint({ name: 'isAdult', async: false })
export class IsAdultConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    // Se vier string "2010-01-01", o parseISO resolve. Se vier Date, ele mantém.
    const birthDate = typeof value === 'string' ? parseISO(value) : value;

    if (!(birthDate instanceof Date) || isNaN(birthDate.getTime()))
      return false;

    const hoje = new Date();

    // Ordem: (Data Mais Recente, Data Mais Antiga)
    const idade = differenceInYears(hoje, birthDate);

    console.log(`Idade calculada: ${idade}`); // Debug para você ver no terminal

    return idade >= 18;
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
