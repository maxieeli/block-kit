import { BlockKitError, ErrorCode } from '@maxiee/block_global/exceptions';

export class MigrationError extends BlockKitError {
  constructor(description: string) {
    super(
      ErrorCode.MigrationError,
      `Migration failed. ${description}`
    );
  }
}

export class SchemaValidateError extends BlockKitError {
  constructor(flavour: string, message: string) {
    super(
      ErrorCode.SchemaValidateError,
      `Invalid schema for ${flavour}: ${message}`
    );
  }
}
