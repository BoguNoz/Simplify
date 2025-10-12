export enum BasePalettesEnum {
    Warm = "warm",
    Cool = "cool",
    Diverging = "diverging",
    Perlin = "perlin",
    NeutralTemp = "neutralTemp",
    GreyScale = "greyScale",
}

export function getPalette(palette: BasePalettesEnum): string[] {
    switch (palette) {
        case BasePalettesEnum.Cool:
            return ["#313695", "#74add1", "#ffffbf", "#f46d43", "#a50026"];

        case BasePalettesEnum.Warm:
            return ["#ffffcc", "#ffeda0", "#feb24c", "#f03b20", "#bd0026"];

        case BasePalettesEnum.Diverging:
            return [
                "#000004",
                "#08012b",
                "#1c0c41",
                "#320a5a",
                "#4b0b6b",
                "#620a5a",
                "#7c2160",
                "#98476e",
                "#b73779",
                "#d95f8f",
                "#f06e8d",
                "#ff6f59",
                "#ff8c42",
                "#fcaa5c",
                "#fcbf49",
                "#fcfdbf"
            ];


        case BasePalettesEnum.Perlin:
            return ["#1a9850", "#d9ef8b", "#ffffbf", "#fee08b", "#d73027"];

        case BasePalettesEnum.GreyScale:
            return [
                "#0a0a0f", "#141418", "#1e1e22", "#28282c", "#323236",
                "#3c3c40", "#46464a", "#505054", "#5a5a5e", "#646468",
                "#6e6e72", "#78787c", "#828286", "#8c8c90", "#96969a",
                "#a0a0a4", "#aaaaae", "#b4b4b8", "#bebec2", "#c8c8cc",
                "#d2d2d6", "#dcdce0", "#e6e6ea", "#f0f0f4", "#fafafc",
                "#fcfcfe", "#ffffff"
            ];


        case BasePalettesEnum.NeutralTemp:
            return ["#6366f1", "#a3a3a3", "#171717"];

        default:
            return ["#50a3ba", "#eac763", "#d94e5d"];
    }
}