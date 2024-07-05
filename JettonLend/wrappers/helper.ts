import { Address, Cell, beginCell } from "@ton/core";
export async function packOracleResponse(who_send: Address, value: number, price: number, body: Cell) {
        const data = beginCell()
                .storeAddress(who_send)
                .storeUint(0, 64)
                .storeCoins(value)
                .storeUint(price, 64)
                .storeRef(body)
        .endCell();
        return data;
}

