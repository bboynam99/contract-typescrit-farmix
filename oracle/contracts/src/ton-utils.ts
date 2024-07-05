import {Address, TupleBuilder} from "@ton/core";


export function createTupleItems(
    items: (bigint | boolean | number | string)[]
) {
    const tuple = new TupleBuilder();

    items.forEach((v) => tuple.writeNumber(BigInt(v)))

    return tuple.build();
}


export function bigintAddressHash(addr: Address) {
    return BigInt(`0x${addr.hash.toString('hex')}`)
}