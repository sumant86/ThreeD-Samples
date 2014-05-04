var get = {
    grid: function(param) {
        var gridX = param.lengthX / 2;
        var gridY = param.lengthY / 2;
        var geometry = new THREE.Geometry();
        for (var i = -gridY; i <= gridY; i += param.step) {
            if (i <= gridY && i >= -gridY) {
                geometry.vertices.push(new THREE.Vector3(-gridX, 0, i));
                geometry.vertices.push(new THREE.Vector3(gridX, 0, i));
            }
        }
        for (var j = -gridX; j <= gridX; j += param.step) {
            if (j <= gridX && j >= -gridX) {
                geometry.vertices.push(new THREE.Vector3(j, 0, -gridY));
                geometry.vertices.push(new THREE.Vector3(j, 0, gridY));
            }
        }
        var material = new THREE.LineBasicMaterial({color: param.color, opacity: 0.2, transparent: true});
        var line = new THREE.Line(geometry, material);
        line.type = THREE.LinePieces;
        if (param.rx)
            line.rotation.x = param.rx;
        if (param.ry)
            line.rotation.y = param.ry;
        if (param.rz)
            line.rotation.z = param.rz;
        scene.add(line);
        objects.push(line);
    },
    cube: function(param) {
        var width = (param.width) ? param.width : 10;
        var height = (param.height) ? param.height : 10;
        var depth = (param.depth) ? param.depth : 10;
        var geometry = new THREE.CubeGeometry(width, height, depth);
        var cube = new THREE.Mesh(geometry, param.material);
        cube.position.x = param.xAxis;
        cube.position.y = param.yAxis;
        cube.position.z = param.zAxis;
        if (param.rotatex)
            cube.rotation.x = param.rotatex;
        if (param.rotatey)
            cube.rotation.y = param.rotatey;
        if (param.rotatez)
            cube.rotation.z = param.rotatez;
        if (param.name)
            cube.name = param.name;
        if (param.light == "direction")
            get.light.direction();
        if (param.light == "ambient")
            get.light.ambient();

        if (param.addToObjects)
            objects.push(cube);
        if (param.addToScene)
            scene.add(cube);
        else
            return cube
    },
    plane: function(param) {
        get.cube(param);
    },
    box: function(param) {
        get.cube(param);
    },
    label: function(param) {
        var text3d = new THREE.TextGeometry(param.title, {size: param.size, height: 1, curveSegments: 2, font: param.fontFamily, opacity: 0.5});
        var textMaterial = new THREE.MeshBasicMaterial({color: param.color, overdraw: true});
        var text = new THREE.Mesh(text3d, textMaterial);
        text.position.x = param.xAxis;
        text.position.y = param.yAxis;
        text.position.z = param.zAxis;
        if (param.xRotation)
            text.rotation.x = param.xRotation;
        if (param.yRotation)
            text.rotation.y = param.yRotation;
        if (param.zRotation)
            text.rotation.z = param.zRotation;
        group = new THREE.Object3D();
        group.add(text);
        if (param.lookAt)
            text.lookAt(camera.position);
        if (param.addToObjects)
            objects.push(group);
        if (param.addToScene)
            scene.add(group);
        else
            return group
    },
    tube: function(path, segments, radiusSegments, material, closed) {
        if (!closed)
            closed = false;
        var geometry = new THREE.TubeGeometry(path, segments, 2, radiusSegments, closed, false);
        var tube = new THREE.Mesh(geometry, material);
        scene.add(tube);
    },
    torus: function(radius, tubeDiameter, radialSegments, tubularSegments, px, py, pz, rx, ry, rz, material) {
        var geometry = new THREE.TorusGeometry(radius, tubeDiameter, radialSegments, tubularSegments);
        var torus = new THREE.Mesh(geometry, material);
        torus.position.x = px;
        torus.position.y = py;
        torus.position.z = pz;
        if (rx)
            torus.rotation.x = rx;
        if (ry)
            torus.rotation.y = ry;
        if (rz)
            torus.rotation.z = rz;
        get.light.direction();
        scene.add(torus);

        objects.push(torus);
    },
    cylinder: function(rTop, rBot, height, x, y, z, material) {
        var geometry = new THREE.CylinderGeometry(rTop, rBot, height, 30, 30);
        geometry.name = height;
        geometry.wireframe = true;
        var cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.x = x;
        cylinder.position.y = y;
        cylinder.position.z = z;
        cylinder.bevelEnabled = true;
        cylinder.bevelSegments = 2;
        scene.add(cylinder);
        get.light.ambient();
        get.light.direction();
        objects.push(cylinder);
    },
    ring: function(material) {
        var geometry = new THREE.RingGeometry(45, 50, 30, 55, 20, Math.PI * 2);
        var ring = new THREE.Mesh(geometry, material);
        ring.position.set(200, 100, 0);
        scene.add(ring);
    },
    sphere: function(radius, widthSegments, heightSegments, px, py, pz, material) {
        var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        var sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = px;
        sphere.position.y = py;
        sphere.position.z = pz;
        scene.add(sphere);
        get.light.direction();
        objects.push(sphere);
    },
    sprite: function() {

    },
    lineBasic: function(x1, y1, z1, x2, y2, z2, color1, color2) {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(x1, y1, z1));
        geometry.vertices.push(new THREE.Vector3(x2, y2, z2));
        geometry.colors.push(new THREE.Color(color1));
        geometry.colors.push(new THREE.Color(color2));
        var material = new THREE.LineBasicMaterial({
            linewidth: 1,
            vertexColors: THREE.VertexColors,
            opacity: 1
        });
        var line = new THREE.Line(geometry, material);
        scene.add(line);
        objects.push(line);
    },
    lineDashed: function(x1, y1, z1, x2, y2, z2, color1, color2) {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(x1, y1, z1));
        geometry.vertices.push(new THREE.Vector3(x2, y2, z2));
        geometry.colors.push(new THREE.Color(color1));
        geometry.colors.push(new THREE.Color(color2));
        var material = new THREE.LineDashedMaterial({
            color: 0xFFFFFF,
            linewidth: 1,
            dashSize: 3,
            gapSize: 1,
            vertexColors: false
        });
        var line = new THREE.Line(geometry, material, THREE.LineStrip);
        scene.add(line);
        objects.push(line);
    },
    pipe: function(x1, y1, z1, x2, y2, z2) {
        var path = new THREE.SplineCurve3([new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2)]);
        var material = new THREE.MeshNormalMaterial({vertexColors: false, color: 0xFFFFFF, overdraw: 0.5});
        get.tube(path, 0, 3, material, false, false);
    },
    curvePipe: function(path) {
        var material = new THREE.MeshNormalMaterial({vertexColors: false, color: 0xFFFFFF, overdraw: 0.5});
        get.tube(path, 0, 3, material, false, false);
    },
    light: {
        direction: function() {
            var directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff);
            directionalLight.position.x = Math.random() - 0.5;
            directionalLight.position.y = Math.random() - 0.5;
            directionalLight.position.z = Math.random() - 0.5;
            directionalLight.position.normalize();
            scene.add(directionalLight);
        },
        ambient: function() {
            var ambientLight = new THREE.AmbientLight(0x222222);
            scene.add(ambientLight);
        }
    },
    shape: {
        threeD: function(param) {
            var geometry = new THREE.ExtrudeGeometry(param.shape, param.extrudeSettings);
            var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, [
                new THREE.MeshLambertMaterial({
                    color: param.color
                }), 
                new THREE.MeshBasicMaterial({
                    color: 0xFF00FF, 
                    wireframe: true, 
                    transparent: true
                })
            ]);
            mesh.position.set(param.xAxis, param.yAxis, param.zAxis);
            mesh.scale.set(param.scale,param.scale,param.scale);
            mesh.rotation.set((param.rotatex) ? param.rotatex : 0, (param.rotatey) ? param.rotatey : 0, (param.rotatez) ? param.rotatez : 0);
            if (param.addToScene)
                scene.add(mesh);
            else
                return mesh;
        },
        flat: function(shape, color, x, y, z, rx, ry, rz, s) {
            var geometry = new THREE.ShapeGeometry(shape);

            var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, [new THREE.MeshLambertMaterial({color: color}), new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true, transparent: true})]);
            mesh.position.set(x, y, z - 125);
            mesh.rotation.set(rx, ry, rz);
            mesh.scale.set(s, s, s);
            scene.add(mesh);
        },
        solidLine: function(shape, color, x, y, z, rx, ry, rz, s) {
            var points = shape.createPointsGeometry();
            var line = new THREE.Line(points, new THREE.LineBasicMaterial({color: color, linewidth: 2}));
            line.position.set(x, y, z + 25);
            line.rotation.set(rx, ry, rz);
            line.scale.set(s, s, s);
            scene.add(line);
        },
        vertisus: function(shape, color, x, y, z, rx, ry, rz, s) {
            var points = shape.createPointsGeometry();
            var particles = new THREE.ParticleSystem(points, new THREE.ParticleSystemMaterial({color: color, size: 2, opacity: 0.75}));
            particles.position.set(x, y, z + 75);
            particles.rotation.set(rx, ry, rz);
            particles.scale.set(s, s, s);
            //group.add(particles);
            scene.add(particles);
        },
        equidistanceSampledPoints: function() {
            var spacedPoints = shape.createSpacedPointsGeometry(100);
            var particles2 = new THREE.ParticleSystem(spacedPoints, new THREE.ParticleSystemMaterial({color: color, size: 2, opacity: 0.5}));
            particles2.position.set(x, y, z + 125);
            particles2.rotation.set(rx, ry, rz);
            particles2.scale.set(s, s, s);
            group.add(particles2);
        }
    },
    materials: {
        basic: function(data) {
            var material;
            if (data.texture)
                material = new THREE.MeshBasicMaterial({map: data.texture});
            else
                material = new THREE.MeshBasicMaterial(data);
            return material;
        },
        normal: function(data) {
            var material = new THREE.MeshNormalMaterial(data);
            return material;
        },
        phong: function(data) {
            var material = new THREE.MeshPhongMaterial(data);
            return material;
        },
        lambart: function(data) {
            var material = new THREE.MeshLambertMaterial(data);
            return material;
        },
        face: function(data) {
            var material = new THREE.MeshFaceMaterial(data);
            return material;
        }
    }
};
var shapes = {
    heart: function(x, y) {
        var heartShape = new THREE.Shape();
        heartShape.moveTo(x + 25, y + 25);

        //bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y)
        //cp1x:The x-coordinate of the first Bézier control point
        //cp1y:The y-coordinate of the first Bézier control point
        //cp2x:The x-coordinate of the second Bézier control point
        //cp2y:The y-coordinate of the second Bézier control point
        //x:The x-coordinate of the ending point
        //y:The y-coordinate of the ending point

        heartShape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);
        heartShape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35);
        heartShape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
        heartShape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
        heartShape.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y);
        heartShape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);
        return heartShape;
    },
    traingle: function() {
        var triangleShape = new THREE.Shape();
        triangleShape.moveTo(80, 20);
        triangleShape.lineTo(40, 80);
        triangleShape.lineTo(120, 80);
        triangleShape.lineTo(80, 20); // close path
        return triangleShape;
    },
    square: function(sqLength) {
        //var sqLength = 80;
        var squareShape = new THREE.Shape();
        squareShape.moveTo(0, 0);
        squareShape.lineTo(0, sqLength);
        squareShape.lineTo(sqLength, sqLength);
        squareShape.lineTo(sqLength, 0);
        squareShape.lineTo(0, 0);
        return squareShape;
    },
    rectangle: function(rectLength, rectWidth) {
        //var rectLength = 120, rectWidth = 40;
        var rectShape = new THREE.Shape();
        rectShape.moveTo(0, 0);
        rectShape.lineTo(0, rectWidth);
        rectShape.lineTo(rectLength, rectWidth);
        rectShape.lineTo(rectLength, 0);
        rectShape.lineTo(0, 0);
        return rectShape;
    },
    roundedRect: function(x, y, width, height, radius) {
        var roundedRectShape = new THREE.Shape();

        //(function roundedRect(ctx, x, y, width, height, radius) {

        roundedRectShape.moveTo(x, y + radius);
        roundedRectShape.lineTo(x, y + height - radius);
        roundedRectShape.quadraticCurveTo(x, y + height, x + radius, y + height);
        roundedRectShape.lineTo(x + width - radius, y + height);
        roundedRectShape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        roundedRectShape.lineTo(x + width, y + radius);
        roundedRectShape.quadraticCurveTo(x + width, y, x + width - radius, y);
        roundedRectShape.lineTo(x + radius, y);
        roundedRectShape.quadraticCurveTo(x, y, x, y + radius);

        //})(roundedRectShape, 0, 0, 50, 50, 20);
        return roundedRectShape;
    },
    circle: function(circleRadius) {
        //var circleRadius = 40;
        var circleShape = new THREE.Shape();
        circleShape.moveTo(0, circleRadius);
        circleShape.quadraticCurveTo(circleRadius, circleRadius, circleRadius, 0);
        circleShape.quadraticCurveTo(circleRadius, -circleRadius, 0, -circleRadius);
        circleShape.quadraticCurveTo(-circleRadius, -circleRadius, -circleRadius, 0);
        circleShape.quadraticCurveTo(-circleRadius, circleRadius, 0, circleRadius);
        return circleShape;
    },
    fish: function(x, y) {
        var fishShape = new THREE.Shape();

        fishShape.moveTo(x, y);
        fishShape.quadraticCurveTo(x + 50, y - 80, x + 90, y - 10);
        fishShape.quadraticCurveTo(x + 100, y - 10, x + 115, y - 40);
        fishShape.quadraticCurveTo(x + 115, y, x + 115, y + 40);
        fishShape.quadraticCurveTo(x + 100, y + 10, x + 90, y + 10);
        fishShape.quadraticCurveTo(x + 50, y + 80, x, y);

        return fishShape;
    },
    arcCircle: function(param) {
        var arcShape = new THREE.Shape();
        arcShape.moveTo(param.centerX + param.outerRadius, param.centerY);
        arcShape.absarc(param.centerX, param.centerY, param.outerRadius, 0, Math.PI * 2, false);

        if (param.innerRadius > 0) {
            var holePath = new THREE.Path();
            holePath.moveTo(param.centerX + param.innerRadius, param.centerY);
            holePath.absarc(param.centerX, param.centerY, param.innerRadius, 0, Math.PI * 2, true);
            arcShape.holes.push(holePath);
        }
        return arcShape;
    },
    smily: function() {
        var smileyShape = new THREE.Shape();
        smileyShape.moveTo(80, 40);
        smileyShape.absarc(40, 40, 40, 0, Math.PI * 2, false);

        var smileyEye1Path = new THREE.Path();
        smileyEye1Path.moveTo(35, 20);
        // smileyEye1Path.absarc( 25, 20, 10, 0, Math.PI*2, true );
        smileyEye1Path.absellipse(25, 20, 10, 10, 0, Math.PI * 2, true);

        smileyShape.holes.push(smileyEye1Path);

        var smileyEye2Path = new THREE.Path();
        smileyEye2Path.moveTo(65, 20);
        smileyEye2Path.absarc(55, 20, 10, 0, Math.PI * 2, true);
        smileyShape.holes.push(smileyEye2Path);

        var smileyMouthPath = new THREE.Path();
        // ugly box mouth
        // smileyMouthPath.moveTo( 20, 40 );
        // smileyMouthPath.lineTo( 60, 40 );
        // smileyMouthPath.lineTo( 60, 60 );
        // smileyMouthPath.lineTo( 20, 60 );
        // smileyMouthPath.lineTo( 20, 40 );

        smileyMouthPath.moveTo(20, 40);
        smileyMouthPath.quadraticCurveTo(40, 60, 60, 40);
        smileyMouthPath.bezierCurveTo(70, 45, 70, 50, 60, 60);
        smileyMouthPath.quadraticCurveTo(40, 80, 20, 60);
        smileyMouthPath.quadraticCurveTo(5, 50, 20, 40);

        smileyShape.holes.push(smileyMouthPath);
        return smileyShape;
    },
    customPath: function(cx, cy, radius) {
        var t = 0;
        var path = new THREE.Shape();
        path.moveTo(cx, cy);
        for (t = 0; t <= 360; t++) {
            cy = radius * Math.cos(t);
            cx = radius * Math.sin(t);
            path.lineTo(cx, cy);
            t += 0.1;
        }
        return path;
    }
};
var set = {
    extrude: function() {
        var extrudeSettings = {amount: 5}; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5
        extrudeSettings.bevelEnabled = true;
        extrudeSettings.bevelSegments = 2;
        extrudeSettings.steps = 2;
        return extrudeSettings;
    }
};