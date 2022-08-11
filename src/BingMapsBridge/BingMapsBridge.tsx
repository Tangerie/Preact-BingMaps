/* eslint-disable react/prefer-stateless-function */


import { Component, createRef, h } from "preact";
import Defaults from "./Defaults";
import { Props, State } from "./types";
import { DiffProps, InsertScripts, ResizeMap } from "./Utility";

export default class BingMapsBridge extends Component<Props, State> {
    containerRef = createRef<HTMLDivElement>();
    map : Microsoft.Maps.Map | undefined;
    defaults : ReturnType<typeof Defaults>;

    componentDidMount(): void {
        this.resize();

        window.addEventListener("resize", this.resize.bind(this));

        InsertScripts().then(this.onLoad.bind(this));
    }

    private onLoad() {
        console.log("Bing Maps Ready");

        this.defaults = Defaults();

        this.map = new Microsoft.Maps.Map(this.containerRef.current, 
            this.props.loadOptions ?? this.defaults.LoadOptions);

        if(this.props.layers) this.addLayers(this.props.layers);
        if(this.props.onLoad) this.props.onLoad();
    }

    componentWillUnmount(): void {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
        const propsDiff = DiffProps(this.props, nextProps);

        if(propsDiff.layers) {
            const toAdd : Microsoft.Maps.Layer[] = [];
            const toRemove : number[] = [];

            for(let i = 0; i < Math.max(propsDiff.layers.length, this.map.layers.length); i++) {
                const current = this.map.layers[i];
                const next = propsDiff.layers[i];
                if(!current) {
                    toAdd.push(next);
                } else if(!next) {
                    toRemove.push(i)
                } else if(current.getId() != next.getId()) {
                    toRemove.push(i);
                    toAdd.push(next);
                }
            }
            
            for(const key of toRemove) {
                this.map.layers.removeAt(key);
            }

            this.addLayers(toAdd);
        }
        
        return false;   
    }

    private resize() {
        ResizeMap(this.containerRef.current);
    }

    private addLayers(layers : Microsoft.Maps.Layer[]) {
        this.map.layers.insertAll(layers);
    }

    render() {
        return <div ref={this.containerRef}>
        </div>
    }
}