import {geoMercator, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import type {FeatureCollection, Geometry} from 'geojson';
import type {GeometryCollection, Topology} from 'topojson-specification';
import atlas from 'world-atlas/countries-50m.json';

export type Coordinate = [longitude: number, latitude: number];

const topology = atlas as unknown as Topology;
const countries = feature(
  topology,
  topology.objects.countries as GeometryCollection,
) as FeatureCollection<Geometry>;
const land = feature(topology, topology.objects.land as GeometryCollection) as FeatureCollection<Geometry>;

export type FlatMapProps = {
  center: Coordinate;
  scale: number;
  highlightIds?: string[];
  marker?: Coordinate;
  cameraZoom?: number;
  markerLabel?: string;
};

export const FlatMap = ({
  center,
  scale,
  highlightIds = [],
  marker,
  cameraZoom = 1,
  markerLabel,
}: FlatMapProps) => {
  const projection = geoMercator().center(center).scale(scale).translate([540, 800]);
  const path = geoPath(projection);
  const point = marker ? projection(marker) : null;
  const highlight = new Set(highlightIds);

  return (
    <svg viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice" style={{width: '100%', height: '100%', display: 'block'}}>
      <rect width="1080" height="1920" fill="#a9c4d9" />
      <g transform={`translate(540 800) scale(${cameraZoom}) translate(-540 -800)`}>
        <path d={path(land) ?? ''} fill="#e0e9e9" />
        {countries.features.filter((country) => highlight.has(String(country.id))).map((country) => (
          <path key={String(country.id)} d={path(country) ?? ''} fill="#07558a" />
        ))}
        {point && (
          <g transform={`translate(${point[0]} ${point[1]})`}>
            <circle r="34" fill="#ffcd3c" fillOpacity="0.28" />
            <circle r="15" fill="#ffcd3c" stroke="white" strokeWidth="5" />
            {markerLabel && (
              <g transform="translate(26 -48)">
                <rect x="0" y="0" width="330" height="64" rx="16" fill="#07558a" />
                <text x="18" y="44" fill="white" fontSize="38" fontWeight="800" fontFamily="Arial, sans-serif">{markerLabel}</text>
              </g>
            )}
          </g>
        )}
      </g>
    </svg>
  );
};
