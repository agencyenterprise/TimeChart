import { axisBottom, axisLeft } from 'd3-axis';
import { select } from "d3-selection";
import { format } from "d3-format";
import { TimeChartPlugin } from ".";

export const d3Axis: TimeChartPlugin = {
    apply(chart) {
        const d3Svg = select(chart.svgLayer.svgNode)
        const xg = d3Svg.append('g');
        const yg = d3Svg.append('g');

        let xAxis = axisBottom(chart.model.xScale);
        const xRange = chart.options.xRange as { intTicks: number };
        if (xRange?.intTicks) {
            xAxis = xAxis.ticks(xRange.intTicks).tickFormat(format("0d"));
        }

        let yAxis = axisLeft(chart.model.yScale)
        const yRange = chart.options.yRange as { intTicks: number }
        if (yRange?.intTicks) {
            yAxis = yAxis.ticks(yRange.intTicks).tickFormat(format("0d"))
        }
    
        function update() {
            const xs = chart.model.xScale;
            const xts = chart.options.xScaleType()
                .domain(xs.domain().map(d => d + chart.options.baseTime))
                .range(xs.range());
            xAxis.scale(xts);
            xg.call(xAxis);

            yAxis.scale(chart.model.yScale);
            yg.call(yAxis);
        }

        chart.model.updated.on(update);

        chart.model.resized.on((w, h) => {
            const op = chart.options;
            xg.attr('transform', `translate(0, ${h - op.paddingBottom})`);
            yg.attr('transform', `translate(${op.paddingLeft}, 0)`);

            update()
        });
    }
}
