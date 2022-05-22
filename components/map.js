// class MapPlot {
//     constructor(svg, data, width=1440, height=900) {
//         this.svg = svg;
//         this.data = data;
//         this.width = width;
//         this.height = height;
//         this.handlers = {};

//         this.map_url = 'https://raw.githubusercontent.com/org-scn-design-studio-community/sdkcommunitymaps/master/geojson/Europe/Ukraine-regions.json'
//     }

//     initialize() {
//         this.svg_ = d3.select(this.svg)
//         this.container = this.svg_.append('g')
//             .attr('width', width)
//             .attr('height', height);

//         this.projection = d3.geoMercator()
//             .center([32, 49])
//             .scale(2800)
//             .translate([this.width / 2, this.height / 2]);
//         this.path_gen = d3.geoPath()
//             .projection(projection);
        
//         this.svg_.call(
//             d3.zoom().on('zoom', ({ transform }) => {
//                 g.attr('transform', transform);
//             })
//         );
//     }

//     update(options) {
//         colormap = ['#44444480', '#FF2222C0', '#22FF22C0']
//         let zScale = d3.scaleOrdinal()
//             .domain(['Armed clash', 'Non-state actor overtakes territory', 'Government regains territory'])
//             .range([0, 1, 2])
        
//         this.circles = this.container.selectAll('circle')
//             .data(data)
//             .join('circle')
        
//         this.circles
//             .attr('cx', d => projection([d.longitude, d.latitude])[0])
//             .attr('cy', d => projection([d.longitude, d.latitude])[1])
//             .attr('fill', d => colormap[zScale(d.sub_event_type)])
//             .attr('r', 3)
//             .style('display', )
//             .style('z-index', d => zScale(d.sub_event_type) + 1)
//             .append('title')
//             .text(d => d.sub_event_type);
//     }

//     render_map() {
//         d3.json(this.map_url).then(
//             data => {
//                 const regions = topojson.feature(data, data.objects.UKR_adm1);

//                 this.map = this.container.selectAll('path')
//                     .data(regions.features)
//                     .join('path')
                
//                 this.map
//                     .attr('d', path)
//                     .attr('fill', 'grey')
//                     .attr('stroke', 'white')
//                     .attr('stroke-width', '1')
//                     .style('z-index', -10)
//                     // .on('mouseover', 
//                     // (e, d) => {
//                     //     d.attr('fill', 'red');
//                     // })
//                     .append('title') // Add a tooltop
//                     .text(d => d.properties.NAME_1);
//             }
//         )
//     }
// }

class MapRenderer {
    constructor(svg, width=1440, height=900) {
        this.svg = svg;
        this.data = null;
        this.width = width;
        this.height = height;

        this.map = null;
        this.map_url = 'https://raw.githubusercontent.com/org-scn-design-studio-community/sdkcommunitymaps/master/geojson/Europe/Ukraine-regions.json'
    }

    initialize() {
        this.container = this.svg.append('g')
            .attr('width', width)
            .attr('height', height);
        
        this.projection = d3.geoMercator()
            .center([32, 49])
            .scale(2800)
            .translate([this.width / 2, this.height / 2])
        this.path_gen = d3.geoPath()
            .projection(this.projection);

        this.svg.call(
            d3.zoom().on('zoom', ({transform}) => {
                this.container.attr('transform', transform);
            })
        );

        d3.json(this.map_url).then(data => {
            this.data = topojson.feature(data, data.objects.UKR_adm1);
            this.render();
        })
    }

    render() {
        this.map = this.container.selectAll('path')
            .data(this.data.features)
            .join('path')
        
        this.map
            .attr('d', path)
            .attr('fill', 'grey')
            .attr('stroke', 'white')
            .attr('stroke-width', '1')
            .style('z-index', -10)
            .append('title')
            .text(d => d.properties.NAME_1);
    }
}