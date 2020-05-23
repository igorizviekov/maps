import { Input } from "./input";
import { GoogleMaps } from "./maps";

new Input();
export const googleMaps = new GoogleMaps(process.env.GOOGLE_API as string);
googleMaps.setup();
