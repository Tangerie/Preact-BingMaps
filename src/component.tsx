import { h, VNode } from 'preact';
import BingMapsBridge from './BingMapsBridge';
import { useCallback, useEffect, useState } from "preact/hooks";

import './style.css';
import { MicroFn } from './BingMapsBridge/types';

interface Props {
    color?: string;
}

function randomBetween(min : number, max : number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomLocation() {
    return new Microsoft.Maps.Location(randomBetween(-90, 90), randomBetween(-180, 180));
}

export default function App(props: Props): VNode {
    const [layers, setLayers] = useState<Microsoft.Maps.Layer[]>([]);

    const genRandomLayer = () => {
        const l = new Microsoft.Maps.Layer();

        for(let i = 0; i < 5; i++) {

            const p = new Microsoft.Maps.Polyline([
                randomLocation(),
                randomLocation(),
                randomLocation(),
                randomLocation(),
            ], {
                strokeColor: "red"
            })
    
            Microsoft.Maps.Events.addHandler(p, "click", () => l.remove(p));
            
            l.add(p);
        }

        return l;
    }

    const onLoad = () => {
        console.log("OnLoad");
        
        setLayers([genRandomLayer()]);
    }

    return (
        <BingMapsBridge layers={layers} onLoad={onLoad}/>
    );
}
