import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_CONSTANTS } from "../constants/constants";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),ignoreExpiration:false,secretOrKey:JWT_CONSTANTS.secret});
    }
    validate(payload: any) {
        return payload;
    }
}