import { toNano } from '@ton/core';

export const err = {
    NoAdmin: 7000,
    NotEqual: 7001,
    WrongTime: 7002,
    SmallDays: 7003,
    WrongAmount: 7004,
    EqualAddress: 7005,
    Blocked: 7006,
    NotEnough: 7007,
};

export const op = {
    Transfer: 0xf8a7ea5,
    TransferNotification: 0x7362d09c,
    InternalTransfer: 0x178d4519,
    Excesses: 0xd53276db,
    Burn: 0x595f07bc,
    BurnNotification: 0x7bdd97de,
    Mint: 21,
    NewBorrow: 0x186a0,
    topUp: 0x5372158c,
};

export const query = {
    newDepositXToken: 0x186a1,
    newDepositYToken: 0x186a2,
    deleteDeposit: 0x186a3,
    deleteBorrowXToken: 0x15ba8,
    deleteBorrowYToken: 0x15f90,
    liquidationCallXToken: 0x1adb0,
    liquidationCallYToken: 0x1abb1,
};

export const admin_op = {
    ChangeAdmin: 5000,
    ChangeWalletX: 5100,
    ChangeMinter: 5200,
    ChangeWalletF: 5300,
    Configuration: 5400,
};

export const test = {
    ChangeMa: 40666,
};

export function tonValue(value: bigint | string): bigint {
    if (typeof value === 'string') {
        value = toNano(value);
    }
    return value;
}
