(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    "use strict";
    /// <reference path="../typings/index.d.ts" />
    Object.defineProperty(exports, "__esModule", { value: true });
    var FramedBox_1 = require("./FramedBox");
    var Utils = require("./engine/Utils");
    var BoxGenerator = /** @class */ (function () {
        function BoxGenerator(nOfBox, min, max) {
            var _this = this;
            this.generateBoxes = function () {
                var boxes = [];
                for (var i = 0; i < _this._nOfBox; i++) {
                    boxes[i] = new FramedBox_1.FramedBox("box" + i, { x: 200, y: 200, z: 200 }, {
                        x: Utils.randomInt(_this._range.min, _this._range.max),
                        y: 0,
                        z: Utils.randomInt(_this._range.min, _this._range.max)
                    });
                }
                return boxes;
            };
            this.updateBoxes = function (origin, boxes) {
                var originCoords = origin.position;
                var distance, boxCoord;
                for (var i = 0; i < boxes.length; i++) {
                    boxCoord = boxes[i].mesh().position;
                    distance = originCoords.distanceTo(boxCoord);
                    if (distance > _this._range.max + _this._range.max * 20 / 100 || distance < 300) {
                        boxes[i].mesh().position.set(Utils.randomInt(originCoords.x + _this._range.min, originCoords.x + _this._range.max * 2), 0, Utils.randomInt(originCoords.z + _this._range.min, originCoords.z + _this._range.max * 2));
                    }
                }
            };
            this.range = function () {
                return _this._range;
            };
            this._nOfBox = nOfBox;
            this._range = {
                min: min,
                max: max
            };
        }
        return BoxGenerator;
    }());
    exports.BoxGenerator = BoxGenerator;

    },{"./FramedBox":4,"./engine/Utils":11}],2:[function(require,module,exports){
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    exports.random = random;
    function randomInt(min, max) {
        var absMin = Math.abs(min);
        var absMax = Math.abs(max);
        var rand = Math.random();
        var output;
        if (min < 0 && max >= 0) {
            output = Math.floor(rand * (max + absMin) - absMin);
        }
        else if (min < 0 && max < 0) {
            output = Math.floor(rand * (absMin - absMax) + absMax) * -1;
        }
        else {
            output = Math.floor(rand * (max - min + 1) + min);
        }
        return output;
    }
    exports.randomInt = randomInt;

    },{}],3:[function(require,module,exports){
    "use strict";
    /// <reference path="../typings/index.d.ts" />
    Object.defineProperty(exports, "__esModule", { value: true });
    var FloatingText = /** @class */ (function () {
        function FloatingText(name, text, position) {
            var _this = this;
            this.mesh = function () {
                return _this._mesh;
            };
            this.loaded = function () {
                return _this._loaded;
            };
            this._pushText = function () {
                var loading = requestAnimationFrame(function () { return _this._pushText(); });
                if (_this._loaded === true) {
                    cancelAnimationFrame(loading);
                    var textGeometry = new THREE.TextGeometry(_this._text, {
                        font: _this._font,
                        size: 65,
                        height: 0.05,
                        curveSegments: 10
                    });
                    var textMaterial = new THREE.MeshBasicMaterial({ color: 0xF9FAF2 });
                    _this._mesh = new THREE.Mesh(textGeometry, textMaterial);
                    _this._mesh.position.set(_this._position.x, _this._position.y, _this._position.z);
                    document.dispatchEvent(_this._loadEvent);
                }
            };
            this.name = function () {
                return _this._name;
            };
            this.position = function () {
                return _this._position;
            };
            this._name = name;
            this._loadEvent = new CustomEvent('fontloaded', { detail: this });
            this._loaded = false;
            this._text = text;
            this._position = position;
            var fontLoader = new THREE.FontLoader();
            var textGeometry;
            // asynchronous font loader
            fontLoader.load('/js/res/Lato_Thin_Regular.json', function (response) {
                _this._font = response;
                _this._loaded = true;
            });
            this._pushText();
        }
        return FloatingText;
    }());
    exports.FloatingText = FloatingText;

    },{}],4:[function(require,module,exports){
    "use strict";
    /// <reference path="../typings/index.d.ts" />
    Object.defineProperty(exports, "__esModule", { value: true });
    var Utils = require("./Engine/Utils");
    var FramedBox = /** @class */ (function () {
        function FramedBox(name, size, position) {
            if (position === void 0) { position = { x: 0, y: 0, z: 0 }; }
            var _this = this;
            this.mesh = function () {
                return _this._mesh;
            };
            this.name = function () {
                return _this._name;
            };
            this.getPosition = function () {
                return _this._mesh.position;
            };
            this.rSpeed = function () {
                return _this._rotationSpeed;
            };
            this.rDir = function () {
                return _this._rotationDir;
            };
            this._name = name;
            this._box = new THREE.BoxBufferGeometry(size.x, size.y, size.z);
            var lineGeometry = new THREE.EdgesGeometry(this._box, 1);
            this._material = new THREE.MeshBasicMaterial({
                color: 0x000000
            });
            this._mesh = new THREE.Mesh(this._box, this._material);
            this._mesh.position.set(position.x, position.y, position.z);
            this._line = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: 0x777777 }));
            this._mesh.add(this._line);
            if (Math.random() >= 0.5) {
                this._rotationDir = 1;
            }
            else {
                this._rotationDir = -1;
            }
            this._rotationSpeed = Utils.random(5, 8) / 10000;
        }
        return FramedBox;
    }());
    exports.FramedBox = FramedBox;

    },{"./Engine/Utils":2}],5:[function(require,module,exports){
    "use strict";
    /// <reference path="../typings/index.d.ts" />
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Scene_1 = require("./engine/Scene");
    var Input_1 = require("./engine/Input");
    var FramedBox_1 = require("./FramedBox");
    var BoxGenerator_1 = require("./BoxGenerator");
    var FloatingText_1 = require("./FloatingText");
    var GameScene = /** @class */ (function (_super) {
        __extends(GameScene, _super);
        function GameScene(sceneName, blockId, rendererOptions, camera) {
            var _this = _super.call(this, sceneName, blockId, rendererOptions, camera) || this;
            _this.launch = function () {
                _this.init();
                _this.animate();
            };
            _this.unload = function () {
                cancelAnimationFrame(_this._animationRequest);
                document.dispatchEvent(_this._unloadEvent);
                _this._input.disable();
                _this._boxes = [];
                _this.clearMesh();
                _this._input.unassignKeys();
                _this._renderer.domElement.remove();
            };
            _this.init = function () {
                // using the generator range to define the floor size
                var floor = new FramedBox_1.FramedBox("floor", { x: _this._generator.range().max * 2, y: 0, z: _this._generator.range().max * 2 }, { x: 0, y: -101, z: 0 });
                var title1 = new FloatingText_1.FloatingText("title1", "QUENTIN B.", new THREE.Vector3(118, 10, -30));
                var title2 = new FloatingText_1.FloatingText("title2", "WEBDEV", new THREE.Vector3(174, -100, -30));
                document.addEventListener('fontloaded', function (e) {
                    _this._mesh[e.detail.name()] = e.detail.mesh();
                    _this.pushMeshes();
                });
                _this._mesh[floor.name()] = floor.mesh();
                _this._boxes = _this._generator.generateBoxes();
                _this._boxes.forEach(function (element) {
                    _this._mesh[element.name()] = element.mesh();
                });
                _this.pushMeshes();
                _this._prevTime = performance.now();
                _this.render();
                _this._input.assignKeys({
                    'up': [90, 87],
                    'down': [83],
                    'left': [81, 65],
                    'right': [68],
                    'exit': [82] // r
                });
                _this._input.run();
            };
            _this.animate = function () {
                _this._animationRequest = requestAnimationFrame(function () { return _this.animate(); });
                _this._frameCount++;
                if (_this._input.checkInput('exit')) {
                    _this.unload();
                }
                if (_this._input.hasFocus()) {
                    var time = performance.now();
                    var delta = (time - _this._prevTime);
                    // get rotation speed from FramedBox directly
                    _this._boxes.forEach(function (element) {
                        element.mesh().rotation.y += element.rDir() * element.rSpeed() * delta;
                    });
                    // invoke input motion with time diference between two frames
                    _this.motion(delta);
                    if (_this._frameCount % 10 == 0) {
                        //moves farest boxes in generator range every 10 frames
                        _this._generator.updateBoxes(_this._camera.getCamera(), _this._boxes);
                    }
                    _this.render();
                    _this._prevTime = performance.now();
                    _this._elapsed += delta;
                }
            };
            _this.motion = function (delta) {
                var direction = _this._camera.getDirection().normalize();
                var speed = 0.5;
                if (_this._input.checkInput('up')) {
                    _this._camera.move.all({
                        x: direction.x * speed * delta,
                        y: 0,
                        z: direction.z * speed * delta
                    });
                    _this._mesh.floor.position.x += direction.x * speed * delta;
                    _this._mesh.floor.position.z += direction.z * speed * delta;
                }
                if (_this._input.checkInput('down')) {
                    _this._camera.move.all({
                        x: -direction.x * speed * delta,
                        y: 0,
                        z: -direction.z * speed * delta
                    });
                    _this._mesh.floor.position.x += -direction.x * speed * delta;
                    _this._mesh.floor.position.z += -direction.z * speed * delta;
                }
                if (_this._input.checkInput('left')) {
                    _this._camera.move.all({
                        x: direction.z * speed * delta,
                        y: 0,
                        z: -direction.x * speed * delta
                    });
                    _this._mesh.floor.position.x += direction.z * speed * delta;
                    _this._mesh.floor.position.z += -direction.x * speed * delta;
                }
                if (_this._input.checkInput('right')) {
                    _this._camera.move.all({
                        x: -direction.z * speed * delta,
                        y: 0,
                        z: direction.x * speed * delta
                    });
                    _this._mesh.floor.position.x += -direction.z * speed * delta;
                    _this._mesh.floor.position.z += direction.x * speed * delta;
                }
                if (_this._input.mouseMotion().rx != 0) {
                    _this._camera.rotate.y(-_this._input.mouseMotion().rx * 0.0005 * delta);
                    _this._mesh.floor.rotation.y += -_this._input.mouseMotion().rx * 0.0005 * delta;
                }
                _this._input.resetMouseMotion();
            };
            _this._input = new Input_1.Input();
            // range of the generator defines the scene size.
            _this._generator = new BoxGenerator_1.BoxGenerator(100, -9000, 9000);
            _this._boxes = [];
            _this._unloadEvent = new Event('journeysceneunloaded');
            return _this;
        }
        return GameScene;
    }(Scene_1.Scene));
    exports.GameScene = GameScene;

    },{"./BoxGenerator":1,"./FloatingText":3,"./FramedBox":4,"./engine/Input":8,"./engine/Scene":10}],6:[function(require,module,exports){
    "use strict";
    /// <reference path="../typings/index.d.ts" />
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Scene_1 = require("./engine/Scene");
    var FramedBox_1 = require("./FramedBox");
    var PortfolioScene = /** @class */ (function (_super) {
        __extends(PortfolioScene, _super);
        function PortfolioScene(sceneName, blockId, rendererOptions, camera) {
            var _this = _super.call(this, sceneName, blockId, rendererOptions, camera) || this;
            _this.init = function () {
                var box = new FramedBox_1.FramedBox("box", { x: 200, y: 200, z: 200 }, { x: 175, y: 0, z: 0 });
                _this.addMesh({ "box": box.mesh() });
                _this.render();
            };
            _this.animate = function () {
                _this._animationRequest = requestAnimationFrame(function () { return _this.animate(); });
                _this.mesh("box").rotation.y += 0.003;
                _this.render();
            };
            _this.unload = function () {
                _this._renderer.domElement.remove();
                document.dispatchEvent(_this._unloadEvent);
                cancelAnimationFrame(_this._animationRequest);
            };
            _this._unloadEvent = new Event('portfoliosceneunloaded');
            return _this;
        }
        return PortfolioScene;
    }(Scene_1.Scene));
    exports.PortfolioScene = PortfolioScene;

    },{"./FramedBox":4,"./engine/Scene":10}],7:[function(require,module,exports){
    "use strict";
    /// <reference path="../../typings/index.d.ts" />
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Nesting THREE.PerspectiveCamera in a class
     * Everything to initialise a Camera and securely moving it
     * @export
     */
    var Camera = /** @class */ (function () {
        function Camera(cameraOptions) {
            var _this = this;
            /**
             * Push the class properties into the camera
             * @memberof Camera
             */
            this._update = function () {
                _this._camera.position.set(_this._position.x, _this._position.y, _this._position.z);
                _this._camera.fov = _this._fov;
                _this._camera.aspect = _this._aspect;
                _this._camera.near = _this._near;
                _this._camera.far = _this._far;
            };
            /**
             * Get the camera object
             * @return { THREE.PerspectiveCamera }
             * @memberof Camera
             */
            this.getCamera = function () {
                return _this._camera;
            };
            /**
             * set camera properties from an object
             * @param { { [key:string]: number } } properties Properties to push in camera.
             * @returns { boolean } False if a property is not part of class
             */
            this.setProperties = function (properties) {
                var toPush;
                for (var index in properties) {
                    if (typeof _this["_" + index] !== undefined) {
                        toPush[index] = properties[index];
                    }
                    else {
                        console.log('Camera.setProperties error. ' + index + ': is not part of camera properties');
                        return false;
                    }
                }
                _this._fov = toPush.fov;
                _this._aspect = toPush.aspect;
                _this._far = toPush.far;
                _this._near = toPush.near;
                _this._position = { x: toPush.X, y: toPush.y, z: toPush.z };
                _this._update();
                return true;
            };
            /**
             * @return { coord }
             */
            this.position = function () {
                return _this._position;
            };
            /**
             * Moves the camera to given coordinates.
             * @param { coord } newPosition
             */
            this.setPosition = function (newPosition) {
                _this._position = newPosition;
                _this._update();
            };
            /**
             * Translate the camera on axis for the given direction
             *
             * @method x
             * @method y
             * @method z
             * @method all
             * @memberof Camera
             */
            this.move = {
                /**
                 * Translate on x axis
                 * @param { number } ox Offset
                 */
                x: function (ox) {
                    _this._position.x += ox;
                    _this._update();
                },
                /**
                 * Translate on y axis
                 * @param { number } oy Offset
                 */
                y: function (oy) {
                    _this._position.y += oy;
                    _this._update();
                    ;
                },
                /**
                 * Translate on z axis
                 * @param { number } oz Offset
                 */
                z: function (oz) {
                    _this._position.z += oz;
                    _this._update();
                },
                /**
                 * Translate on all axis
                 * @param { coord } offset Object with the three distances
                 */
                all: function (offset) {
                    _this._position.x += offset.x;
                    _this._position.y += offset.y;
                    _this._position.z += offset.z;
                    _this._update();
                }
            };
            /**
             * Rotate the camera on given axis
             *
             * @method x
             * @method y
             * @method z
             *
             * @memberof Camera
             */
            this.rotate = {
                x: function (ax) {
                    _this._camera.rotateX(ax);
                },
                y: function (ay) {
                    _this._camera.rotateY(ay);
                },
                z: function (az) {
                    _this._camera.rotateZ(az);
                }
            };
            /**
             * Get the direction the camera is looking at.
             *
             * @returns { THREE.Vector3 } Normalized vector pointing towards camera direction
             * @memberof Camera
             */
            this.getDirection = function () {
                var dir = new THREE.Vector3();
                dir = _this._camera.getWorldDirection();
                return dir.normalize();
            };
            this._fov = cameraOptions.fov;
            this._aspect = cameraOptions.aspect;
            this._near = cameraOptions.near;
            this._far = cameraOptions.far;
            this._position = {
                x: cameraOptions.x,
                y: cameraOptions.y,
                z: cameraOptions.z
            };
            this._camera = new THREE.PerspectiveCamera(this._fov, this._aspect, this._near, this._far);
            this._camera.position.set(this._position.x, this._position.y, this._position.z);
        }
        return Camera;
    }());
    exports.Camera = Camera;

    },{}],8:[function(require,module,exports){
    "use strict";
    /// <reference path="../../typings/index.d.ts" />
    Object.defineProperty(exports, "__esModule", { value: true });
    var Input = /** @class */ (function () {
        function Input() {
            var _this = this;
            this._hasFocus = true;
            /**
             * Initialize all listeners for the inputs
             *
             * @memberof Input
             */
            this.run = function () {
                _this.listenToFocus();
                _this.enablePointerLock();
                document.dispatchEvent(_this._captureEvent);
                _this.mouse();
                _this.keyboard();
            };
            this.disable = function () {
                window.removeEventListener('mousemove', _this._onMouseMove);
                window.removeEventListener('keydown', _this._onKeyDown);
                window.removeEventListener('keyup', _this._onKeyUp);
                document.removeEventListener('click', _this._requestPointerLock, false);
                document.removeEventListener('pointerlockchange', _this._pointerlockchange, false);
                document.removeEventListener('mozpointerlockchange', _this._pointerlockchange, false);
                document.removeEventListener('webkitpointerlockchange', _this._pointerlockchange, false);
                document.removeEventListener('captureMouse', _this._requestPointerLock);
                delete _this._captureEvent;
            };
            this._onMouseMove = function (e) {
                var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
                var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
                _this._mouse = {
                    rx: movementX,
                    ry: movementY
                };
            };
            this.resetMouseMotion = function () {
                _this._mouse = {
                    rx: 0,
                    ry: 0
                };
            };
            /**
             * Set listener for mouse movements.
             * Update this._mouse with mousemove offsets
             *
             * @memberof Input
             */
            this.mouse = function () {
                window.addEventListener('mousemove', _this._onMouseMove);
            };
            this._onKeyDown = function (e) {
                var code = e.keyCode;
                if (_this._keyboardEvents[code] != true && _this._hasFocus) {
                    _this._keyboardEvents[code] = true;
                }
            };
            this._onKeyUp = function (e) {
                var code = e.keyCode;
                _this._keyboardEvents[code] = false;
            };
            /**
             * Set listeners on keyup and keydown.
             * Update this._keyboardEvents.
             *
             * @memberof Input
             */
            this.keyboard = function () {
                window.addEventListener('keydown', _this._onKeyDown);
                window.addEventListener('keyup', _this._onKeyUp);
            };
            /**
             * Set a listener on widow's focus event.
             * Update this._hasFocus.
             *
             * @memberof Input
             */
            this.listenToFocus = function () {
                // see https://coderwall.com/p/cwpdaw/how-to-tell-if-app-page-has-focus
                var visibilityChange;
                if (typeof document.hidden !== "undefined") {
                    visibilityChange = "visibilitychange";
                }
                else if (typeof document.mozHidden !== "undefined") {
                    visibilityChange = "mozvisibilitychange";
                }
                else if (typeof document.msHidden !== "undefined") {
                    visibilityChange = "msvisibilitychange";
                }
                else if (typeof document.webkitHidden !== "undefined") {
                    visibilityChange = "webkitvisibilitychange";
                }
                var focusChanged = function (input) {
                    if (document.hasFocus()) {
                        _this._hasFocus = true;
                    }
                    else {
                        _this._hasFocus = false;
                    }
                    for (var i in input._keyboardEvents) {
                        input._keyboardEvents[i] = false;
                    }
                };
                document.addEventListener(visibilityChange, function () { return focusChanged(_this); });
                window.addEventListener("focus", function () { return focusChanged(_this); });
                window.addEventListener("blur", function () { return focusChanged(_this); });
            };
            this._pointerlockchange = function (e) {
                var element = document.body;
                if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
                    _this._hasFocus = true;
                }
                else {
                    _this._hasFocus = false;
                }
            };
            this._requestPointerLock = function () {
                var element = document.body;
                // Ask the browser to lock the pointer
                element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
                element.requestPointerLock();
            };
            this.releasePointerLock = function () {
                document.exitPointerLock();
            };
            /**
             * Set pointerlock on the window when the game is clicked
             * Update this._hasFocus when pointer lock is caught or lost.
             *
             * @memberof Input
             */
            this.enablePointerLock = function () {
                // see https://threejs.org/examples/?q=pointer#misc_controls_pointerlock
                var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
                if (havePointerLock) {
                    var element = document.body;
                    var pointerlockerror = function (e) {
                        alert('Impossible de capturer la souris.');
                    };
                    // Hook pointer lock state change es
                    document.addEventListener('pointerlockchange', _this._pointerlockchange, false);
                    document.addEventListener('mozpointerlockchange', _this._pointerlockchange, false);
                    document.addEventListener('webkitpointerlockchange', _this._pointerlockchange, false);
                    document.addEventListener('pointerlockerror', pointerlockerror, false);
                    document.addEventListener('mozpointerlockerror', pointerlockerror, false);
                    document.addEventListener('webkitpointerlockerror', pointerlockerror, false);
                    document.addEventListener('click', _this._requestPointerLock, false);
                    document.addEventListener('captureMouse', _this._requestPointerLock);
                }
                else {
                    alert('Your browser doesn\'t seem to support Pointer Lock API');
                }
            };
            /**
             * Set a control key
             *
             * @param { string } name The control name
             * @param { number } keyCode(...) One or more keycodes for the control
             * @memberof Input
             */
            this.setKey = function (name) {
                var keyCode = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    keyCode[_i - 1] = arguments[_i];
                }
                _this._keyMap[name] = keyCode;
            };
            /**
             * Assign a variable number of controls through an objet.
             * Update this._keymap
             *
             * @param { [controlName: string]: number[] } keys Collection of { name: [ keyCode1, keyCode2?], ... }
             * @memberof Input
             */
            this.assignKeys = function (keys) {
                for (var name_1 in keys) {
                    _this._keyMap[name_1] = keys[name_1];
                }
            };
            this.unassignKeys = function () {
                for (var name_2 in _this._keyMap) {
                    delete _this._keyboardEvents[name_2];
                }
            };
            /**
             * this._keyboardEvents getter
             *
             * @returns { [key: string ]: number[] } this._keyboardEvents
             * @memberof Input
             */
            this.keyboardEvents = function () {
                return _this._keyboardEvents;
            };
            /**
             * this._keyMap getter
             *
             * @returns { [index: string]: number[] } this._keymap
             * @memberof Input
             */
            this.keyMap = function () {
                return _this._keyMap;
            };
            /**
             * this._mouse getter
             *
             * @returns { rx:number, ry:number } this._mouse
             * @memberof Input
             */
            this.mouseMotion = function () {
                return _this._mouse;
            };
            /**
             * Check if key named in the key map is pressed
             *
             * @param { string } control Control name
             * @returns { boolean } True if corresponding control key is pressed
             * @memberof Input
             */
            this.checkInput = function (control) {
                var pressed = false;
                for (var _i = 0, _a = _this._keyMap[control]; _i < _a.length; _i++) {
                    var assignedKey = _a[_i];
                    if (_this._keyboardEvents[assignedKey] === true) {
                        pressed = true;
                        break;
                    }
                }
                return pressed;
            };
            /**
             * this._hasFocus getter
             *
             * @returns { boolean } this._hasFocus
             * @memberof Input
             */
            this.hasFocus = function () {
                return _this._hasFocus;
            };
            this._keyboardEvents = {};
            this._keyMap = {};
            this._mouse = { rx: 0, ry: 0 };
            this._captureEvent = new Event('captureMouse');
        }
        return Input;
    }());
    exports.Input = Input;

    },{}],9:[function(require,module,exports){
    "use strict";
    /// <reference path="../../typings/index.d.ts" />
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Camera_1 = require("./Camera");
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.bindRayCaster = function (raycaster) {
                _this._rayCaster = raycaster;
            };
            _this.rayCaster = function () {
                return _this._rayCaster;
            };
            return _this;
        }
        return Player;
    }(Camera_1.Camera));
    exports.Player = Player;

    },{"./Camera":7}],10:[function(require,module,exports){
    "use strict";
    /// <reference path="../../typings/index.d.ts" />
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Handles a scene to render and an animation function
     * includes one renderer and one camera
     * has a collection of meshes to render
     */
    var Scene = /** @class */ (function () {
        function Scene(sceneName, blockId, rendererOptions, camera) {
            var _this = this;
            this._mesh = {};
            /**
             * Init a scene
             * @protected
             * @memberof Scene
             */
            this.load = function () {
                document.getElementById(_this._blockId).appendChild(_this._renderer.domElement);
                _this._scene = new THREE.Scene();
            };
            /**
             * Abstract unload function.
             * Must call this._renderer.domElement.remove()
             * @memberof Scene
             */
            this.unload = function () { };
            this.launch = function () {
                _this.init();
                _this.animate();
            };
            /**
             * Collect all meshes and render
             * @returns { Void }
             * @protected
             * @memberof Scene
             */
            this.render = function () {
                _this._renderer.render(_this._scene, _this._camera.getCamera());
            };
            /**
             * add meshes to the scene
             * @argument { [index: string]: THREE.Mesh } mesh Collection of meshes to be added to the render pool.
             * @returns { Void }
             * @memberof Scene
             */
            this.addMesh = function (mesh) {
                for (var element in mesh) {
                    _this._mesh[element] = mesh[element];
                    _this._scene.add(_this._mesh[element]);
                }
            };
            /**
             * Remove a mesh from renderer with its name
             * @param { String } meshName
             * @memberof Scene
             */
            this.removeMesh = function (meshName) {
                _this._scene.remove(_this._mesh[meshName]);
                delete _this._mesh[meshName];
            };
            this.clearMesh = function () {
                for (var meshName in _this._mesh) {
                    _this._scene.remove(_this._mesh[meshName]);
                    delete _this._mesh[meshName];
                }
            };
            /**
             * Add all meshes of the scene to the renderer
             * @memberof Scene
             */
            this.pushMeshes = function () {
                for (var element in _this._mesh) {
                    _this._scene.add(_this._mesh[element]);
                }
            };
            this.animate = function () { };
            this.init = function () { };
            /**
             * this._mesh table getter
             * @returns {{ [index: string]: THREE.Mesh }}
             * @memberof Scene
             */
            this.meshes = function () {
                return _this._mesh;
            };
            /**
             * this._mesh single row getter
             * @param { string } meshName Mesh name
             * @memberof Scene
             */
            this.mesh = function (meshName) {
                return _this._mesh[meshName];
            };
            this.getContext = function () {
                return _this._renderer.domElement;
            };
            this._name = sceneName;
            this._blockId = blockId;
            this._renderer = new THREE.WebGLRenderer(rendererOptions.options);
            this._renderer.setSize(rendererOptions.width, rendererOptions.height);
            this._camera = camera;
            this._frameCount = 0;
            this._elapsed = 0;
            this.load();
        }
        return Scene;
    }());
    exports.Scene = Scene;

    },{}],11:[function(require,module,exports){
    arguments[4][2][0].apply(exports,arguments)
    },{"dup":2}],12:[function(require,module,exports){
    "use strict";
    /// <reference path="typings/index.d.ts" />
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameScene_1 = require("./Classes/GameScene");
    var Player_1 = require("./Classes/engine/Player");
    var Camera_1 = require("./Classes/engine/Camera");
    var Portfolioscene_1 = require("./Classes/Portfolioscene");
    $(document).ready(function () {
        var rendererOptions = {
            options: { antialias: true },
            width: window.innerWidth,
            height: window.innerHeight
        };
        var cameraOptions = {
            fov: 50,
            aspect: rendererOptions.width / rendererOptions.height,
            near: 1,
            far: 10000,
            x: 375,
            y: -50,
            z: 800
        };
        var game, hello;
        var konamied = false;
        var isWebGl = document.createElement('canvas');
        isWebGl = isWebGl.getContext('webgl');
        isWebGl = (isWebGl instanceof WebGLRenderingContext);
        var launchJourneyButton = $('#launch-journey');
        if (isWebGl) {
            hello = new Portfolioscene_1.PortfolioScene('portfolio', 'cube', rendererOptions, new Camera_1.Camera(cameraOptions));
            hello.launch();
            launchJourneyButton.on('click', initKonami);
            document.addEventListener('journeysceneunloaded', disableKonami);
            var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
            var n = 0;
            document.addEventListener('keydown', function (e) {
                var code = e.keyCode || e.which;
                if (code == konamiCode[n++]) {
                    if (n == konamiCode.length) {
                        if (!konamied)
                            initKonami();
                    }
                }
                else {
                    n = 0;
                }
            });
        }
        else {
            console.log('Unable to load WebGl');
            var substitute = document.createElement('div');
            substitute.setAttribute('class', 'banner-substitute');
            substitute.innerHTML = '<img src="/images/cubeanimated.gif">';
            document.getElementById('cube').appendChild(substitute);
            launchJourneyButton.addClass('hidden');
        }
        function disableKonami() {
            $('#cube').removeClass('konamied');
            $('.banner-title').removeClass('hidden');
            rendererOptions.width = window.innerWidth;
            rendererOptions.height = window.innerHeight;
            cameraOptions.aspect = rendererOptions.width / rendererOptions.height;
            document.getElementById('journey-infos').remove();
            hello = new Portfolioscene_1.PortfolioScene('portfolio', 'cube', rendererOptions, new Camera_1.Camera(cameraOptions));
            hello.launch();
            enableScroll();
        }
        function initKonami() {
            $('.banner-title').addClass('hidden');
            $('html, body').animate({
                scrollTop: 0
            }, 1000, function() {
                $('#cube').addClass('konamied');
            });
            disableScroll();
            hello.unload();
            rendererOptions.width = window.innerWidth;
            rendererOptions.height = window.innerHeight;
            cameraOptions.aspect = rendererOptions.width / rendererOptions.height;
            game = new GameScene_1.GameScene('konami', 'cube', rendererOptions, new Player_1.Player(cameraOptions));
            document.addEventListener('keydown', function (e) {
                if (e.keyCode == 27) {
                    e.preventDefault;
                    game.unload();
                }
            });
            game.launch();
            addJourneyInfos();
        }
        function addJourneyInfos() {
            var infos = document.createElement('div');
            infos.setAttribute('class', 'journey-infos');
            infos.setAttribute('id', 'journey-infos');
            infos.innerHTML = '<i class="fa fa-keyboard-o" aria-hidden="true"></i> ZQSD<br>';
            infos.innerHTML += '<i class="fa fa-arrow-left" aria-hidden="true" style="font-size: 0.8em"></i> <i class="material-icons">mouse</i> <i class="fa fa-arrow-right" aria-hidden="true" style="font-size: 0.8em"></i><br>';
            infos.innerHTML += 'R / Esc: quitter';
            game.getContext().parentElement.insertBefore(infos, game.getContext());
        }
        // Functions to prevent scrolling see https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        var keys = { 37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1 };
        function preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        }
        function preventDefaultForScrollKeys(e) {
            if (keys[e.keyCode]) {
                preventDefault(e);
                return false;
            }
        }
        function disableScroll() {
            if (window.addEventListener)
                window.addEventListener('DOMMouseScroll', preventDefault, false);
            window.onwheel = preventDefault; // modern standard
            window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
            window.ontouchmove = preventDefault; // mobile
            document.onkeydown = preventDefaultForScrollKeys;
        }
        function enableScroll() {
            if (window.removeEventListener)
                window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.onmousewheel = document.onmousewheel = null;
            window.onwheel = null;
            window.ontouchmove = null;
            document.onkeydown = null;
        }
    });

    },{"./Classes/GameScene":5,"./Classes/Portfolioscene":6,"./Classes/engine/Camera":7,"./Classes/engine/Player":9}]},{},[12]);
