/**
 * Adapted code from @vladanyes React Native Skia Charts package.
 * Check https://github.com/vladanyes/react-native-skia-charts for the original code.
 */

import { View } from "react-native";
import { Canvas, Group, Path, Skia, Text, useComputedValue, useFont } from "@shopify/react-native-skia";
import { scaleLinear, scalePoint } from "d3-scale";
import useWindowDimensions from "@/hooks/useWindowDimensions";

type LineChartProps = { data: Array<{ x: number, y: number }> };

export default function LineChart({ data }: LineChartProps) {

    const { width } = useWindowDimensions();

    const canvasStyle = { width: width - 64, height: 250 };

    const xScaleBounds = [32, canvasStyle.width] as const;

    const chartHeight = canvasStyle.height - 16;

    const yScaleBounds = [chartHeight, 16] as const;

    const font = useFont(require("../assets/fonts/OpenSans-Bold.ttf"), 16);

    const xScale = scalePoint().domain(data.map((d) => d.x.toString())).range(xScaleBounds).align(0);

    const yScaleDomain = [0, Math.max(...data.map((d) => d.y))];

    const yScale = scaleLinear().domain(yScaleDomain).range(yScaleBounds);

    const scaledData = data.map((d) => ({ x: xScale(d.x.toString())!, y: yScale(d.y) }));

    const linePath = useComputedValue(() => {

        const newPath = Skia.Path.Make();

        for (let i = 0; i < scaledData.length; i++) {

            const point = scaledData[i]!;

            if (i === 0) newPath.moveTo(point.x, point.y);

            const prev = scaledData[i - 1];

            const prevPrev = scaledData[i - 2];

            if (prev == null) continue;

            const p0 = prevPrev ?? prev;
            const p1 = prev;

            if (i !== scaledData.length - 1) {

                const cp1x = (2 * p0.x + p1.x) / 3;
                const cp1y = (2 * p0.y + p1.y) / 3;
                const cp2x = (p0.x + 2 * p1.x) / 3;
                const cp2y = (p0.y + 2 * p1.y) / 3;
                const cp3x = (p0.x + 4 * p1.x + point.x) / 6;
                const cp3y = (p0.y + 4 * p1.y + point.y) / 6;

                newPath.cubicTo(cp1x, cp1y, cp2x, cp2y, cp3x, cp3y);

            } else {

                newPath.cubicTo(
                    p1.x,
                    p1.y,
                    (p1.x + point.x) / 2,
                    (p1.y + point.y) / 2,
                    point.x,
                    point.y
                );

            }

        }

        return newPath;

    }, [scaledData]);

    return (
        <View className="flex-1">
            <Canvas style={canvasStyle}>
                {font ? (
                    <Group>
                        {yScale.ticks(6).map((label: number, index: number) => {
                            const yPoint = yScale(label);
                            return (
                                <Group key={label + index.toString()}>
                                    <Text
                                        color="#ffffff"
                                        font={font}
                                        x={0}
                                        y={yPoint}
                                        text={label.toString()}
                                    />
                                </Group>
                            )
                        })}
                    </Group>
                ) : null}
                <Path
                    style="stroke"
                    path={linePath}
                    strokeWidth={3}
                    strokeJoin="round"
                    strokeCap="round"
                    color="#3b82f6"
                />
            </Canvas>
        </View>
    )

}
