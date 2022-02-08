
import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "./BoundedLayout.css";

const ReactGridLayout = WidthProvider(RGL);

class BoundedLayout extends React.PureComponent<any, any> {
    static defaultProps = {
        className: "layout",
        items: 40,
        rowHeight: 30,
        onLayoutChange: function () { },
        cols: 12
    };

    constructor(props: any) {
        super(props);

        const layout = this.generateLayout();
        this.state = { layout };
    }
    generateDOM() {
        return _.map(_.range(this.props.items), function (i) {
            return (
                <div className="imageParent" key={i}>
                       <img className="image" src="https://xl.movieposterdb.com/13_06/2013/2194499/xl_2194499_c0435606.jpg?v=2021-10-22%2017:59:47" alt="About Time" />
                    {/* <span className="text">{i}</span> */}
                </div>
            );
        });
    }

    generateLayout() {
        const p = this.props;

        return _.map(new Array(p.items), function (item: any, i: any) {
            let y :any  = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
            return {
                x: (i * 2) % 12,
                y: (Math.floor(i / 6) * y),
                w: 1.53,
                h: 7.5,
                i: i.toString()
            };
        });
    }

    onLayoutChange(layout: any) {
        this.props.onLayoutChange(layout);
    }

    render() {
        return (
            <div className="gridParent">
                <ReactGridLayout
                    layout={this.state.layout}
                    onLayoutChange={this.onLayoutChange}
                    isBounded={true}
                    {...this.props}
                >
                    {this.generateDOM()}
                </ReactGridLayout>
            </div>
        );
    }
}

export default BoundedLayout;
