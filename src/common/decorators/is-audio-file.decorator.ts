import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsAudioFileConstraint implements ValidatorConstraintInterface {
  validate(file: any) {
    // Проверка MIME типа файла
    const allowedMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/*'];
    return allowedMimeTypes.includes(file.mimetype);
  }

  defaultMessage() {
    return 'The file is not a valid audio file';
  }
}

export function IsAudioFile(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAudioFileConstraint,
    });
  };
}
