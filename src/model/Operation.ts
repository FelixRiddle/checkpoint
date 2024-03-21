export interface OperationType {
    IsNotFalsy: number,
    MaxLength: number,
    MinLength: number,
    IsEmail: number,
    NumRange: number,
    IsNum: number,
    IsStr: number,
    IsBool: number,
    IsArray: number,
    IsObject: number,
    LengthRange: number,
    IsInt: number,
    IsFloat: number,
}

const OPERATION: OperationType = {
    // Classics
    IsNotFalsy: 0,
    MaxLength: 1,
    MinLength: 2,
    IsEmail: 3,
    NumRange: 4,
    // Types
    IsNum: 5,
    IsStr: 6,
    IsBool: 7,
    IsArray: 8,
    IsObject: 9,
    // Others that were made after the previous ones
    LengthRange: 10,
    IsInt: 11,
    IsFloat: 12,
}

export default OPERATION;
