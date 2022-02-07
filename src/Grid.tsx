
import * as React from "react";
import ReactGridLayout from "react-grid-layout";
import './Grid.css'
class Grid extends React.Component<any, any> {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    let layout : Array<ReactGridLayout.Layout> = [
      { i: "a", x: 0, y: 0, w: 3, h: 5, static: true},
      { i: "b", x: 3, y: 0, w: 3, h: 5 },
      { i: "c", x: 6, y: 0, w: 3, h: 5 }
    ];
    return (
      <ReactGridLayout 
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1920}
        isBounded={true}
      >
        <div className="gridElement" key="a">a</div>
        <div className="gridElement" key="b">b</div>
        <div className="gridElement" key="c">c</div>
      </ReactGridLayout>
    );
  }
  componentDidMount() {
    // fetch data and set state
  }
}
export default Grid;
