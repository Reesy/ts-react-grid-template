import * as React from "react";
import { Layout, Layouts, Responsive as ResponsiveGridLayout, WidthProvider } from "react-grid-layout";
import './Grid.css'

const ResponsiveReactGridLayout = WidthProvider(ResponsiveGridLayout);


interface Props 
{
    cols: {};
}

interface State 
{
    layouts: Layouts;
}

export default class Grid extends React.Component<Props, State>
{
    static itemCount : number = 98;

    static defaultProps: any = {
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
    };

    constructor(_props: any)
    {
        super(_props);
        

        //Layouts are created in advance, for each breakpoint (lg, md, sm, xs, xxs)
        //The react-grid-layout component will have a different number of columns based on the size of the screen, determined by breakpoints: 
        //    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        //    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        //If the breakpoint is lg, then the number of columns will be 12
        //If the breakpoint is xxs, then the number of columns will be 2
        //Unless specifically stated, the number of columns will be interpolated (this doesn't seem to be the most reliable, so its best to provide the layouts for each size/breakpoint)
        const lgLayout = this.createLayouts(12, Grid.itemCount);
        const mdLayout = this.createLayouts(10, Grid.itemCount);
        const smLayout = this.createLayouts(6, Grid.itemCount);
        const xsLayout = this.createLayouts(4, Grid.itemCount);
        const xxsLayout = this.createLayouts(2, Grid.itemCount);

        const layouts: Layouts = { 
            lg: lgLayout,
            md: mdLayout,
            sm: smLayout,
            xs: xsLayout,
            xxs: xxsLayout
        };

        this.state = {
            layouts: layouts
        };

    }
    
    /**
     * 
     * @param _cols Number of columns in the grid
     * @param _elementCount Number of items in the grid
     * @returns An array representing the layout of the grid
     */
    private createLayouts(_cols: number, _elementCount: number): Layout[] 
    {
       
        let layouts: Layout[] = [];
        const itemWidth = 1;
        const itemHeight = 1;

        //Using map may be cleaner, but I think this is more readable for this example
        for (let element = 1; element <= _elementCount; element++) 
        {
            const horizontalPosition = (element - 1) % _cols;
            let layout : Layout =  { 
                        i: element.toString(), 
                        x: horizontalPosition === 0 ? 0 : horizontalPosition * itemWidth, 
                        y: Math.floor((element - 1) / _cols), 
                        w: itemWidth, 
                        h: itemHeight, 
                        static: true } ;
            
            
            layouts.push(layout);
        };

        return layouts;

    };

    /**
     * 
     * @param _elementCount The number of items that should be populated on the screen/ Ideally this would be passed in or data grabbed from an API then rendered accordingly.
     * @returns 
     */
    private createDOM (_elementCount: number): any
    {
        let elements: any[] = [];

        for (let element = 1; element <= _elementCount; element++) 
        {
            let elementDOM: JSX.Element = 
            <div className="imageParent" key={element}>
                <img className="image" src="https://xl.movieposterdb.com/13_06/2013/2194499/xl_2194499_c0435606.jpg?v=2021-10-22%2017:59:47" alt="About Time" />   {/* It's 'about time' I finished this project. */}
            </div>
            elements.push(elementDOM);
        }

        return elements;
    };
    render() {
        return (
            <div>
                <ResponsiveReactGridLayout
                    className="layout"
                    layouts={this.state.layouts}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    isDraggable={false}
                    width={1200}
                    compactType={"horizontal"}
                >
                    {this.createDOM(Grid.itemCount)}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}