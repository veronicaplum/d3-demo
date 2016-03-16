/* 575 boilerplate main.js */
//execute script when window is loaded
window.onload = function(){
    var w =900, h = 500 ; 
    
        /*Shandong Provience, China*/
        var cityPop = [
        { 
            city: 'Jinan',
            population: 3527566
        },
        {
            city: 'Zibo',
            population: 2261717
        },
        {
            city: 'Qingdao',
            population: 3990942
        },
        {
            city: 'TaiAn',
            population: 1123541
        }
    ];
    
    var container = d3.select("body") //get the <body> element from the DOM
        .append("svg") //put a new svg in the body
        .attr("width",w)
        .attr("height", h)
        .attr("class", "container") //assings class name, useful that it assigns it to block name
                                    //class names are useful for stylizing
        .style("background-color", "rgba(20,0,130, 0.8)");
    
    var innerRect = container.append("rect") ///new inside svg
        .datum(400)
        .attr("width", function(d){ //rectangle width
            return d * 2; //400 * 2 = 800
        }) 
        .attr("height", function(d){ //rectangle height
            return d; //400
        })
        .attr("class", "innerRect") //class name
        .attr("x", 50) //position from left on the x (horizontal) axis
        .attr("y", 50) //position from top on the y (vertical) axis
        .style("fill", "#FFFFFF"); //fill color
    
    
    //contaier block creates svg and rect! Try no to make more than one new element per block!
    //so svg and rect are at the limit for container
          //Example 2.3 line 1
    
   // var dataArray = [10, 20, 30, 40, 50];
    

    
    //above Example 2.8 line 20
    //find the minimum value of the array
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //find the maximum value of the array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });

    //scale for circles center y coordinate
    var y = d3.scale.linear()
        .range([440, 95])
        .domain([
            minPop,
            maxPop
        ]);
    
    
 //above Example 2.8 line 20
    var x = d3.scale.linear() //create the scale
        .range([90, 810]) //output min and max
        .domain([0, 3]); //input min and max
    
        //color scale generator 
    var color = d3.scale.linear()
        .range([
            "#FDBE00",
            "#D00701"
        ])
        .domain([
            minPop, 
            maxPop
        ]);
    
      //below Example 3.5...create y axis generator
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
    
     //create axis g element and add axis
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);
       
    
   var circles = container.selectAll(".circles") //create an empty selection
        .data(cityPop) //here we feed in an array
        .enter() //one of the great mysteries of the universe
        .append("circle") //inspect the HTML--holy crap, there's some circles there
        .attr("class", "circles")
        .attr("id", function(d){
            return d.city;
        })
        .attr("r", function(d){
            //calculate the radius based on population value as circle area
            var area = d.population*0.003; // * 0.01;
            return Math.sqrt(area/Math.PI);
        })
      .attr("cx", function(d, i){
            //use the scale generator with the index to place each circle horizontally
            return x(i);
        })
       //Example 3.4 line 1
        .attr("cy", function(d){
            return y(d.population);
        })
        .style("fill", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
        })
        .style("stroke", "#000"); //black circle stroke
    console.log(innerRect);
};