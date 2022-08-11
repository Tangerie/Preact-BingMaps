export type MicroFn<T> = () => T;

export interface Props {
    loadOptions? : Microsoft.Maps.IMapLoadOptions;
    layers? : Microsoft.Maps.Layer[];
    onLoad? : () => void;
}

export interface State {

}