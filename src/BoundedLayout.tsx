// @flow
import * as React from "react";
import _ from "lodash";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import './BoundedLayout.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class BoundedLayout extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            currentBreakpoint: "lg",
            compactType: "horizontal",
            mounted: false,
            layouts: { lg: this.generateLayout() }
        };
        this.generateLayout = this.generateLayout.bind(this);
        // this.generateLayout();
    }
    static defaultProps: any = {
        className: "layout",
        rowHeight: 25,
        onLayoutChange: function () { },
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    };

    componentDidMount() {
        this.setState({ mounted: true });
    }

    generateDOM(): any {
        return _.map(this.state.layouts.lg, function (l, i) {
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

    onLayoutChange: any = (layout: any, layouts: any) => {
        this.props.onLayoutChange(layout, layouts);
    };

    onNewLayout: any = () => {
        console.log('onNewLayout called');
        this.setState({
            layouts: { lg: this.generateLayout() }
        });
    };

    onDrop: (layout: Layout, item: any, e: Event) => void = (elemParams) => {
        alert(`Element parameters: ${JSON.stringify(elemParams)}`);
    };
    //create a 2d array
    generateLayout = () => {
        console.log('state', this);


        //How do i access the class state here?



        console.log('inside state', this.props);
        let currentY = 0;
        let currentX = 0;
        let itemWidth = 2;   //In React-grid-layout grid units. 
        let itemHeight = 10; //In React-grid-layout grid units.
        let layout: any = _.map(_.range(0, 20), function (item, i) {
            if (i !== 0) {
                currentX += 2
            };

            if (currentX >= 12) {
                currentX = 0;
                currentY += 10;
            };

            return {
                x: currentX,
                y: currentY,
                w: itemWidth,
                h: itemHeight,
                i: i.toString(),
                static: true
            };

        });
        // if(typeof(this.state) === 'undefined')
        // {
        // console.log('state', this.state);

        console.log('layout', layout);
        return layout

    }
    render(): any {
        // eslint-disable-next-line no-unused-vars
        return (
            <div>
                <div>
                    Current Breakpoint: {this.state.currentBreakpoint} (
                    {this.props.cols[this.state.currentBreakpoint]} columns)
                </div>
                {/* <div>
                    Compaction type:{" "}
                    {_.capitalize(this.state.compactType) || "No Compaction"}
                </div>
                <button onClick={this.onNewLayout}>Generate New Layout</button>
                <button onClick={this.onCompactTypeChange}>
                    Change Compaction Type
                </button>  */}
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
                    isDraggable={true}
                >
                    {this.generateDOM()}
                </ResponsiveReactGridLayout>
            </div>
        );
    }

};
