import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE } from "../constants";

export default async function authenticated(){
    return !! (await cookies()).get(AUTHENTICATION_COOKIE);
}