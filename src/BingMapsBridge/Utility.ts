import { BingMapsKey, BingMapsUrl } from "./Constants";
import { Props } from "./types";

export function ResizeMap(mapEl : HTMLDivElement) {
    mapEl.style.width = document.body.clientWidth + "px";
    mapEl.style.height = document.body.clientHeight + "px";
}


let hasInserted = false;
export async function InsertScripts() {
    if(hasInserted) return;
    hasInserted = true;

    const script = document.createElement("script");
    script.src = BingMapsUrl + `&key=${BingMapsKey}`;
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);

    return new Promise<void>(resolve => {
        //@ts-ignore
        window.BingCallback = resolve;
    })
}


export function DiffProps(current : Props, next : Props) {
    const diff = {};

    for(const key in current) {
        if(current[key] != next[key]) {
            diff[key] = next[key]
        }
    }

    for(const key in next) {
        if(current[key] != next[key]) {
            diff[key] = next[key]
        }
    }

    return diff as Partial<Props>;
}