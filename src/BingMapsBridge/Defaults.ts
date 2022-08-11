export default function Defaults() {
    const LoadOptions : Microsoft.Maps.IMapLoadOptions = {
        mapTypeId: Microsoft.Maps.MapTypeId.canvasDark,
        zoom: 0
    }

    return {
        LoadOptions
    }
}