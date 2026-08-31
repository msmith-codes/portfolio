import { USAMap, CanadaMap, EuropeMap, AsiaMap } from "../_components/maps";
import
{
    visitedUsStates,
    visitedCanadaProvinces,
    visitedEuropeCountries,
    visitedAsiaCountries,
} from "./visitedPlaces";

function MapLegend()
{
    return (
        <div className="flex items-center gap-2 text-sm text-foreground/70 font-mono">
            <span className="inline-block w-3 h-3 border border-foreground" style={{ backgroundColor: "#22c55e" }} />
            <span>Visited</span>
        </div>
    );
}

export default function TravelsPage()
{
    return (
        <main className="max-w-6xl mx-auto px-12 py-8">
            <div className="space-y-8">
                {/* Page Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground font-mono mb-4">My Travels</h1>
                    <div className="w-24 h-0.5 bg-foreground/20 mx-auto"></div>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">United States</h2>
                    <USAMap visited={visitedUsStates} className="w-full max-w-3xl mx-auto h-auto" />
                    <MapLegend />
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Canada</h2>
                    <CanadaMap visited={visitedCanadaProvinces} className="w-full max-w-2xl mx-auto h-auto" />
                    <MapLegend />
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Europe</h2>
                    <EuropeMap visited={visitedEuropeCountries} className="w-full max-w-2xl mx-auto h-auto" />
                    <MapLegend />
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground font-mono">Asia</h2>
                    <AsiaMap visited={visitedAsiaCountries} className="w-full max-w-2xl mx-auto h-auto" />
                    <MapLegend />
                </section>

            </div>
        </main>
    );
}
