
import * as React from "react";
import ReactGridLayout from "react-grid-layout";
import './Carousel.css'


//This is unfinished, it's not yet a carousel.
class Carousel extends React.Component<any, any> {
    render() {
        // layout is an array of objects, see the demo for more complete usage
        let layout: Array<ReactGridLayout.Layout> = [
            { i: "a", x: 0, y: 0, w: 3, h: 5, static: true },
            { i: "b", x: 3, y: 0, w: 3, h: 5 },
            { i: "c", x: 6, y: 0, w: 3, h: 5 }
        ];
        return (
            <div className="gridParent">
                <ReactGridLayout
                    className="layout"
                    layout={layout}
                    cols={12}
                    rowHeight={110}
                    width={1920}
                    isBounded={true}
                    compactType={'horizontal'}
                >
                    <div className="gridElement" key="a">                   
                        <img src="https://xl.movieposterdb.com/13_06/2013/2194499/xl_2194499_c0435606.jpg?v=2021-10-22%2017:59:47" alt="About Time" width={200} />
                    </div>
                    
                    <div className="gridElement" key="b">
                        <img src="https://xl.movieposterdb.com/21_07/2019/5697572/xl_5697572_4df88fbb.jpg" alt="Cats" width={200} />
                    </div>
                    
                    <div className="gridElement" key="c">
                        <img src="https://xl.movieposterdb.com/09_12/1927/17136/xl_17136_ebe9705f.jpg?v=2021-09-01%2000:21:32" alt="Metropolis" width={200} />
                    </div>
                

                </ReactGridLayout>
            </div>
        );
    }
    componentDidMount() {
        // fetch data and set state
    }
}
export default Carousel;
