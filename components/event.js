class EventPlotter {
    constructor(container, projection) {
        this.container = container;
        this.projection = projection;

        this.event_type = ['Armed clash', 'Non-state actor overtakes territory', 'Government regains territory']
        this.event_type_colormap = ['#44444480', '#FF2222C0', '#22FF22C0'];
    }

    initialize(options) {
        this.zScale = d3.scaleOrdinal()
            .domain(this.event_type)
            .range([0, 1, 2])

        d3.csv('output.csv').then(data => {
            this.data = data;
            this.update(options);
        });
    }

    update(options) {
        let show_clash = options.toggle.show_clash;
        let show_overtake = options.toggle.show_overtake;
        let show_regain = options.toggle.show_regain;

        this.circles = this.container.selectAll('circle')
            .data(this.data)
            .join('circle')
        
        this.circles
            .attr('cx', d => projection([d.longitude, d.latitude])[0])
            .attr('cy', d => projection([d.longitude, d.latitude])[1])
            .attr('fill', d => colormap[zScale(d.sub_event_type)])
            .attr('r', 3)
            .style('display', d => check_display(d, [show_clash, show_overtake, show_regain]) ? 'inline' : 'none')
            .style('z-index', d => zScale(d.sub_event_type) + 1)
        
        this.circles
            .append('title')
            .text(d => d.sub_event_type);
    }

    check_display(item, option_list) {
        let idx = this.event_type[item.sub_event_type];
        return option_list[idx];
    }
}