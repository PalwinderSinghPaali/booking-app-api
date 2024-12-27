"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyActivationToken = exports.generateActivationToken = exports.verifyToken = exports.generateToken = void 0;
// import Users from '../db/models/users.model';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secret = type === "refresh" ? process.env.JWT_SECRET_REFRESH : process.env.JWT_SECRET_ACCESS;
        const options = {
            expiresIn: type === "refresh" ? process.env.JWT_SECRET_REFRESH_EXP : process.env.JWT_SECRET_ACCESS_EXP
        };
        let token = yield jsonwebtoken_1.default.sign(payload, secret || "yJC_3M}&d=NQ$D(G52c:qY", options);
        return { token, success: true, };
    }
    catch (err) {
        return { error: err, success: false };
    }
});
exports.generateToken = generateToken;
function verifyToken(token, type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const secret = type === "refresh" ? process.env.JWT_SECRET_REFRESH : process.env.JWT_SECRET_ACCESS;
            var r = yield jsonwebtoken_1.default.verify(token, secret || "yJC_3M}&d=NQ$D(G52c:qY");
            return { data: r, error: null };
        }
        catch (error) {
            return { data: null, error };
        }
    });
}
exports.verifyToken = verifyToken;
function generateActivationToken(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const secret = process.env.JWT_SECRET_ACTIVATION;
        var r = yield jsonwebtoken_1.default.sign(payload, secret || "yJC_3M}&d=NQ$D(G52c:qY");
        return { token: r, success: true };
    });
}
exports.generateActivationToken = generateActivationToken;
const verifyActivationToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secret = process.env.JWT_SECRET_ACTIVATION;
        let decoded = yield jsonwebtoken_1.default.verify(token, secret || "yJC_3M}&d=NQ$D(G52c:qY");
        return { data: decoded, error: null };
    }
    catch (error) {
        return { data: null, error };
    }
});
exports.verifyActivationToken = verifyActivationToken;
// export async function getAccessByRefreshToken(token: string) {
//     var u = await Users.findOne({where: { refreshToken: token }});
//     if (!u) return null;
//     const res = await generateToken({id:u?.id, userId:u?.userId}, "access");
//     // await User.updateOne({ _id: u._id }, { $pull: { refreshTokens: token } });
//     return res;
//   }
