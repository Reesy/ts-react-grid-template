// @flow
import * as React from "react";
import _ from "lodash";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import './BoundedLayout.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// type Props = {|
//   className: string,
//   cols: {[string]: number},
//   onLayoutChange: Function,
//   rowHeight: number,
// |};
// type State = {|
//   currentBreakpoint: string,
//   compactType: CompactType,
//   mounted: boolean,
//   layouts: {[string]: Layout}
// |};

export default class BoundedLayout extends React.Component<any, any> {
    static defaultProps: any = {
        className: "layout",
        rowHeight: 30,
        onLayoutChange: function () { },
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    };

    state: any = {
        currentBreakpoint: "lg",
        compactType: "horizontal",
        mounted: false,
        layouts: { lg: generateLayout() }
    };

    componentDidMount() {
        this.setState({ mounted: true });
    }

    generateDOM(): any {
        return _.map(this.state.layouts.lg, function (l, i) {
            // window.alert('this is i, ' + JSON.stringify(l, null, 2));
            return (
                <div className="imageParent" key={i}>
                    <img className="image" src="https://xl.movieposterdb.com/13_06/2013/2194499/xl_2194499_c0435606.jpg?v=2021-10-22%2017:59:47" alt="About Time" />
                </div>
            );
        });
    }

    onBreakpointChange: (Breakpoint: any) => void = (breakpoint) => {
        this.setState({
            currentBreakpoint: breakpoint
        });
    };

    // onCompactTypeChange: () => void = () => {
    //     const { compactType: oldCompactType } = this.state;
    //     const compactType =
    //         oldCompactType === "horizontal"
    //             ? "vertical"
    //             : oldCompactType === "vertical"
    //                 ? null
    //                 : "horizontal";
    //     this.setState({ compactType });
    // };

    onLayoutChange: any = (layout: any, layouts: any) => {
        this.props.onLayoutChange(layout, layouts);
    };

    onNewLayout: any = () => {
        this.setState({
            layouts: { lg: generateLayout() }
        });
    };

    onDrop: (layout: Layout, item: any, e: Event) => void = (elemParams) => {
        alert(`Element parameters: ${JSON.stringify(elemParams)}`);
    };

    render(): any {
        // eslint-disable-next-line no-unused-vars
        return (
            <div>
                {/* <div>
                    Current Breakpoint: {this.state.currentBreakpoint} (
                    {this.props.cols[this.state.currentBreakpoint]} columns)
                </div>
                <div>
                    Compaction type:{" "}
                    {_.capitalize(this.state.compactType) || "No Compaction"}
                </div>
                <button onClick={this.onNewLayout}>Generate New Layout</button>
                <button onClick={this.onCompactTypeChange}>
                    Change Compaction Type
                </button> */}
                <ResponsiveReactGridLayout
                    {...this.props}
                    layouts={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                    onLayoutChange={this.onLayoutChange}
                    // WidthProvider option
                    measureBeforeMount={false}
                    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                    // and set `measureBeforeMount={true}`.
                    useCSSTransforms={this.state.mounted}
                    compactType={this.state.compactType}
                    preventCollision={!this.state.compactType}
                >
                    {this.generateDOM()}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

function generateLayout() {
    return _.map(_.range(0, 25), function (item, i) {
        return {
            x: 0,
            y: 0,
            w: 2,
            h: 10,
            i: i.toString(),
            static: Math.random() < 0.05
        };
        // var y = Math.ceil(Math.random() * 4) + 1;
        // return {
        //     x: 10,
        //     y: Math.floor(i / 6) * y,
        //     w: 2,
        //     h: y,
        //     i: i.toString(),
        //     static: Math.random() < 0.05
        // };
    });
}