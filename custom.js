var stackChart = function() {
    var ajaxParams = {
        url: "data/stackChart.json",
        async: false,
        dataType: "json",
        cache: false,
        type: "GET"
    };
    ajaxLoader.fetch(ajaxParams, stack.show);
};
var groupChart = function() {
    var ajaxParams = {
        url: "data/stackChart.json",
        async: false,
        dataType: "json",
        cache: false,
        type: "GET"
    };
    ajaxLoader.fetch(ajaxParams, group.show);
};
var stack = {
    show: function(data) {
        var color = [0xFFFF00, 0xFF00FF, 0x00FF00, 0x0000FF, 0x0FFF00, 0x000FF0, 0x0FFF00];
        var gridParam = {
            lengthX: 300,
            lengthY: 100,
            step: 10,
            color: 0x000000
        };
        get.grid(gridParam);
        var basicMaterial = {
            color: color[0],
            overdraw: 0.5,
            opacity: 0.9,
            transparent: true
        };
        var basicMaterial1 = {
            color: color[1],
            overdraw: 0.5,
            opacity: 0.9,
            transparent: true
        };
        var basicMaterial2 = {
            color: color[2],
            overdraw: 0.5,
            opacity: 0.9,
            transparent: true
        };
        var basicMaterial3 = {
            color: color[3],
            overdraw: 0.5,
            opacity: 0.9,
            transparent: true
        };
        $.each(data.chart, function(i, chartData) {
            var barData = {
                name: "Budget",
                value: chartData.Budget,
                height: chartData.Budget / 10,
                material: basicMaterial,
                axisTop: 0,
                zAxis: -5,
                xAxis: 0,
                count: i
            };
            stack.bar(barData);
            var barData2 = {
                name: "Security",
                value: chartData.Security,
                height: ((chartData.Budget / 20) * chartData.Security) / (100),
                axisTop: 0,
                material: basicMaterial1,
                zAxis: 5,
                xAxis: 0,
                count: i
            };
            stack.bar(barData2);
            var barData3 = {
                name: "Development",
                value: chartData.Development,
                height: ((chartData.Budget / 20) * chartData.Development) / (100),
                material: basicMaterial2,
                axisTop: ((chartData.Budget / 20) * chartData.Security) / (100),
                zAxis: 5,
                xAxis: 0,
                count: i
            };
            stack.bar(barData3);
            var barData4 = {
                name: "Maintenance",
                value: chartData.Maintenance,
                height: ((chartData.Budget / 20) * chartData.Maintenance) / (100),
                material: basicMaterial3,
                axisTop: ((chartData.Budget / 20) * chartData.Security) / (100) + ((chartData.Budget / 20) * chartData.Development) / (100),
                zAxis: 5,
                xAxis: 0,
                count: i
            };
            stack.bar(barData4);
        });
    },
    bar: function(data) {
        var material = data.material;
        var height = data.height;
        for (var j = 0; j <= data.height; j += 10) {
            var jx;
            if (height - j >= 10) {
                jx = 10;
            } else {
                jx = height - j;
            }
            if (jx) {
                var boxParam = {
                    height: jx,
                    xAxis: data.xAxis + data.count * 20 - 105,
                    yAxis: j + (jx / 2) + data.axisTop,
                    zAxis: data.zAxis,
                    material: get.materials.basic(material),
                    addToScene: true,
                    addToObjects: true,
                    name: data.name + ": " + data.value,
                    light: "direction"
                };
                get.cube(boxParam);
            }
        }
    }
};
var group = {
    show: function(data) {
        var color = [0xFFFF00, 0xFF00FF, 0x00FF00, 0x0000FF, 0x0FFF00, 0x000FF0, 0x0FFF00];
        var gridParam = {
            lengthX: 300,
            lengthY: 100,
            step: 10,
            color: 0x000000
        };
        get.grid(gridParam);
        var basicMaterial = {
            color: color[0],
            overdraw: 0.5,
            opacity: 0.9,
            transparent: true
        };
        var basicMaterial1 = {
            color: color[1],
            overdraw: 0.5,
            opacity: 0.9,
            transparent: true
        };
        var basicMaterial2 = {
            color: color[2],
            overdraw: 0.5,
            opacity: 0.9,
            transparent: true
        };
        var basicMaterial3 = {
            color: color[3],
            overdraw: 0.5,
            opacity: 0.9,
            transparent: true
        };
        $.each(data.chart, function(i, chartData) {
            var barData = {
                name: "Budget",
                value: chartData.Budget,
                height: chartData.Budget / 10,
                material: basicMaterial,
                zAxis: 5,
                axisTop: 0,
                xAxis: 0,
                count: i
            };
            group.bar(barData);
            var barData2 = {
                name: "Security",
                value: chartData.Security,
                height: ((chartData.Budget / 20) * chartData.Security) / (100),
                axisTop: 0,
                xAxis: 2.5,
                material: basicMaterial1,
                zAxis: 5,
                count: i
            };
            group.bar(barData2);
            var barData3 = {
                name: "Development",
                value: chartData.Development,
                height: ((chartData.Budget / 20) * chartData.Development) / (100),
                material: basicMaterial2,
                axisTop: 0,
                zAxis: 5,
                xAxis: 5,
                count: i
            };
            group.bar(barData3);
            var barData4 = {
                name: "Maintenance",
                value: chartData.Maintenance,
                height: ((chartData.Budget / 20) * chartData.Maintenance) / (100),
                material: basicMaterial3,
                axisTop: 0,
                zAxis: 5,
                xAxis: 7.5,
                count: i
            };
            group.bar(barData4);
        });
    },
    bar: function(data) {
        var material = data.material;
        var height = data.height;
        for (var j = 0; j <= data.height; j += 10) {
            var jx;
            if (height - j >= 10) {
                jx = 10;
            } else {
                jx = height - j;
            }
            if (jx) {
                var boxParam = {
                    height: jx,
                    width: 2.5,
                    xAxis: data.xAxis + data.count * 20 - 100,
                    yAxis: j + (jx / 2) + data.axisTop,
                    zAxis: data.zAxis,
                    material: get.materials.basic(material),
                    addToScene: true,
                    addToObjects: true,
                    name: data.name + ": " + data.value,
                    light: "direction"
                };
                get.cube(boxParam);
            }
        }
    }
};
var onDocumentMouseDown = function(event) {
    event.preventDefault();
    if (displayLable) {
        scene.remove(displayLable);
    }
    var projector = new THREE.Projector();
    var vector;
    if (camera instanceof THREE.PerspectiveCamera) {
        vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    } else {
        vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    }
    projector.unprojectVector(vector, camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        console.log(intersects[ 0 ].object);
        var textParam = {
            title: intersects[ 0 ].object.name,
            xAxis: intersects[ 0 ].point.x,
            yAxis: intersects[ 0 ].point.y,
            zAxis: intersects[ 0 ].point.z,
            fontFamily: "helvetiker",
            lookAt: false,
            color: 0x000000,
            size: 7,
            addToScene: false,
            addToObjects: false
        };
        displayLable = get.label(textParam);
        scene.add(displayLable);
    }
    else {
        console.log("NO object found");
    }
};
var onDocumentMouseUp = function(event) {
    if (displayLable) {
        scene.remove(displayLable);
    }
    event.preventDefault();
};
var onDocumentMouseMove = function(event) {
    event.preventDefault();
    var projector = new THREE.Projector();
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    projector.unprojectVector(vector, camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
        if (displayLable) {
            scene.remove(displayLable);
        }
        if (intersects[ 0 ].object.name) {
            var textParam = {
                title: intersects[ 0 ].object.name,
                xAxis: intersects[ 0 ].point.x,
                yAxis: intersects[ 0 ].point.y,
                zAxis: intersects[ 0 ].point.z + 10,
                fontFamily: "helvetiker",
                lookAt: false,
                color: 0x000000,
                size: 10,
                addToScene: false,
                addToObjects: false
            };
            displayLable = get.label(textParam);
            scene.add(displayLable);
        }
    }
};
var Wheel = function() {
    var extrudeSettings = {
        amount: 5,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 8,
        bevelThickness: 5
    };
    var arcParam={
        centerX:0,
        centerY:0,
        outerRadius:30,
        innerRadius:20
    };
    var param={
        shape:shapes.arcCircle(arcParam),
        extrudeSettings:extrudeSettings,
        color:0xff11FF,
        xAxis:-200,
        yAxis:200,
        zAxis:50,
        scale:1,
        addToScene:false
    };
    movingWheel = get.shape.threeD(param);
    scene.add(movingWheel);
};
var animateWheel = function(animation) {
    if (animation == "wheel") {
        movingWheel.rotation.z -= 0.03;
        if (movingWheel.position.x <= -200 || movingWheel.position.x >= 300) {
            movingWheel.position.x = -200;
        }
        movingWheel.position.x += 1;
        requestAnimationFrame(function() {
            animateWheel("wheel");
        });
        render();
    } else {
        requestAnimationFrame(animate);
        controls.update();
        render();
    }
};