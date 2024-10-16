import { Writer, Reader } from "protobufjs/minimal";

export interface IMsgExchangeToGovToken {
    sender: string;
    amount: string;
}

export const MsgExchangeToGovToken = {
    typeUrl: "/cysicmint.govtoken.v1.MsgExchangeToGovToken",
    encode(message: IMsgExchangeToGovToken, writer: Writer = Writer.create()): Writer {
        writer.uint32(10).string(message.sender);
        writer.uint32(18).string(message.amount);
        return writer;
    },
    decode(input: Uint8Array | Reader, length?: number): IMsgExchangeToGovToken {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { sender: "", amount: "" } as IMsgExchangeToGovToken;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.amount = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object: IMsgExchangeToGovToken): IMsgExchangeToGovToken {
        const message = { sender: "", amount: "" } as IMsgExchangeToGovToken;
        message.sender = object.sender ?? "";
        message.amount = object.amount ?? "";
        return message;
    },
};

export interface IMsgExchangeToPlatformToken {
    sender: string;
    amount: string;
}

export const MsgExchangeToPlatformToken = {
    typeUrl: "/cysicmint.govtoken.v1.MsgExchangeToPlatformToken",
    encode(message: IMsgExchangeToPlatformToken, writer: Writer = Writer.create()): Writer {
        writer.uint32(10).string(message.sender);
        writer.uint32(18).string(message.amount);
        return writer;
    },
    decode(input: Uint8Array | Reader, length?: number): IMsgExchangeToPlatformToken {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { sender: "", amount: "" } as IMsgExchangeToPlatformToken;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.amount = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object: IMsgExchangeToPlatformToken): IMsgExchangeToPlatformToken {
        const message = { sender: "", amount: "" } as IMsgExchangeToPlatformToken;
        message.sender = object.sender ?? "";
        message.amount = object.amount ?? "";
        return message;
    },
};
