// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/Background/Night/1.png":[function(require,module,exports) {
module.exports = "/1.c8e22775.png";
},{}],"assets/Background/Night/2.png":[function(require,module,exports) {
module.exports = "/2.932723b4.png";
},{}],"assets/Tiles/Tileset.png":[function(require,module,exports) {
module.exports = "/Tileset.8f01998d.png";
},{}],"assets/TileStuff/map1.json":[function(require,module,exports) {
module.exports = {
  "compressionlevel": -1,
  "height": 21,
  "infinite": false,
  "layers": [{
    "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 9, 10, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 9, 10, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 42, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 42, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 9, 10, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 42, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 10, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    "height": 21,
    "id": 1,
    "name": "layer1",
    "opacity": 1,
    "type": "tilelayer",
    "visible": true,
    "width": 36,
    "x": 0,
    "y": 0
  }],
  "nextlayerid": 2,
  "nextobjectid": 1,
  "orientation": "orthogonal",
  "renderorder": "right-down",
  "tiledversion": "1.10.1",
  "tileheight": 32,
  "tilesets": [{
    "columns": 8,
    "firstgid": 1,
    "image": "..\/Tiles\/Tileset.png",
    "imageheight": 256,
    "imagewidth": 256,
    "margin": 0,
    "name": "tiles1",
    "spacing": 0,
    "tilecount": 64,
    "tileheight": 32,
    "tilewidth": 32
  }],
  "tilewidth": 32,
  "type": "map",
  "version": "1.10",
  "width": 36
};
},{}],"assets/Soldier/Bullet.png":[function(require,module,exports) {
module.exports = "/Bullet.f7380256.png";
},{}],"assets/Soldier/Idle.png":[function(require,module,exports) {
module.exports = "/Idle.b697d94f.png";
},{}],"assets/Soldier/Walk.png":[function(require,module,exports) {
module.exports = "/Walk.04c4456d.png";
},{}],"assets/Soldier/Run.png":[function(require,module,exports) {
module.exports = "/Run.728ec01a.png";
},{}],"assets/Soldier/Shot1.png":[function(require,module,exports) {
module.exports = "/Shot1.9db501e8.png";
},{}],"assets/Soldier/Dead.png":[function(require,module,exports) {
module.exports = "/Dead.1eadcc18.png";
},{}],"assets/ZombieWoman/Idle.png":[function(require,module,exports) {
module.exports = "/Idle.c45572c1.png";
},{}],"assets/ZombieWoman/Walk.png":[function(require,module,exports) {
module.exports = "/Walk.17c7b8d2.png";
},{}],"assets/ZombieWoman/Run.png":[function(require,module,exports) {
module.exports = "/Run.c2b93eef.png";
},{}],"assets/ZombieWoman/Attack2.png":[function(require,module,exports) {
module.exports = "/Attack2.93e4d0aa.png";
},{}],"assets/ZombieWoman/Dead.png":[function(require,module,exports) {
module.exports = "/Dead.4aec24f1.png";
},{}],"platformer.js":[function(require,module,exports) {
"use strict";

var _ = _interopRequireDefault(require("./assets/Background/Night/1.png"));
var _2 = _interopRequireDefault(require("./assets/Background/Night/2.png"));
var _Tileset = _interopRequireDefault(require("./assets/Tiles/Tileset.png"));
var _map = _interopRequireDefault(require("./assets/TileStuff/map1.json"));
var _Bullet = _interopRequireDefault(require("./assets/Soldier/Bullet.png"));
var _Idle = _interopRequireDefault(require("./assets/Soldier/Idle.png"));
var _Walk = _interopRequireDefault(require("./assets/Soldier/Walk.png"));
var _Run = _interopRequireDefault(require("./assets/Soldier/Run.png"));
var _Shot = _interopRequireDefault(require("./assets/Soldier/Shot1.png"));
var _Dead = _interopRequireDefault(require("./assets/Soldier/Dead.png"));
var _Idle2 = _interopRequireDefault(require("./assets/ZombieWoman/Idle.png"));
var _Walk2 = _interopRequireDefault(require("./assets/ZombieWoman/Walk.png"));
var _Run2 = _interopRequireDefault(require("./assets/ZombieWoman/Run.png"));
var _Attack = _interopRequireDefault(require("./assets/ZombieWoman/Attack2.png"));
var _Dead2 = _interopRequireDefault(require("./assets/ZombieWoman/Dead.png"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var game;
var settings = {
  gravity: 700,
  soldierWalkSpeed: 100,
  soldierRunSpeed: 330,
  soldierOffsetY: 64,
  soldierOffsetXRight: 43,
  soldierOffsetXLeft: 75,
  zombieWalkSpeed: 80,
  zombieRunSpeed: 350,
  zombieOffsetY: 32,
  zombieOffsetXRight: 35,
  zombieOffsetXLeft: 55,
  bulletSpeed: 1,
  restartTime: 1000
};
window.onload = function () {
  var gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1152,
      height: 672
    },
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
        gravity: {
          y: 0
        }
      }
    },
    scene: [Level1, Level2]
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
};
var Level1 = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(Level1, _Phaser$Scene);
  var _super = _createSuper(Level1);
  function Level1() {
    _classCallCheck(this, Level1);
    return _super.call(this, "Level1");
  }
  _createClass(Level1, [{
    key: "preload",
    value: function preload() {
      this.load.image("background1", _.default);
      this.load.image("background2", _2.default);
      this.load.image("tiles", _Tileset.default);
      this.load.image("bullet", _Bullet.default);
      this.load.tilemapTiledJSON("map1", _map.default);
      var soldierSize = {
        frameWidth: 128,
        frameHeight: 128
      };
      var zombieSize = {
        frameWidth: 96,
        frameHeight: 96
      };
      this.load.spritesheet("soldierIdleSheet", _Idle.default, soldierSize);
      this.load.spritesheet("soldierWalkSheet", _Walk.default, soldierSize);
      this.load.spritesheet("soldierRunSheet", _Run.default, soldierSize);
      this.load.spritesheet("soldierAttackSheet", _Shot.default, soldierSize);
      this.load.spritesheet("soldierDeadSheet", _Dead.default, soldierSize);
      this.load.spritesheet("zombieIdleSheet", _Idle2.default, zombieSize);
      this.load.spritesheet("zombieWalkSheet", _Walk2.default, zombieSize);
      this.load.spritesheet("zombieRunSheet", _Run2.default, zombieSize);
      this.load.spritesheet("zombieAttackSheet", _Attack.default, zombieSize);
      this.load.spritesheet("zombieDeadSheet", _Dead2.default, zombieSize);
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;
      this.physics.world.setBounds(game.config.width, game.config.height);
      this.background = this.add.image(game.config.width / 2, game.config.height / 2, "background1").setScale(2);
      this.background = this.add.image(game.config.width / 2, game.config.height / 2, "background2").setScale(2);
      this.map = this.make.tilemap({
        key: "map1",
        tileWidth: 32,
        tileHeight: 32
      });
      this.tileset = this.map.addTilesetImage("tiles1", "tiles");
      this.layer = this.map.createLayer("layer1", this.tileset, 0, 0);
      this.layer.setCollisionBetween(1, 63);
      this.add.text(40, 450, " left & right arrow: move\n up arrow: jump\n down arrow: shoot\n shift + move: run", {
        fontSize: 16,
        color: "#BBBBBB"
      });
      this.soldier = this.physics.add.sprite(200, 400, "soldierIdleSheet");
      this.soldier.body.gravity.y = settings.gravity;
      this.soldier.setSize(32, 63);
      this.soldier.setOffset(settings.soldierOffsetXRight, settings.soldierOffsetY);
      this.soldierDirection = 1;
      this.soldierLocation = [0, 0];
      this.soldierDead = false;
      this.soldierDeadTimer = 0;
      this.bullets = this.physics.add.group({
        classType: Bullet,
        runChildUpdate: true
      });
      this.zombies = this.physics.add.group({
        classType: Zombie,
        runChildUpdate: true
      });
      this.zombie1 = this.createZombie(400, 500);
      this.zombie2 = this.createZombie(405, 500);
      this.physics.add.overlap(this.bullets, this.layer, function (bullet, tile) {
        bullet.destroy();
      }, function (bullet, tile) {
        return tile.collides;
      });
      this.physics.add.overlap(this.bullets, this.zombies, function (bullet, zombie) {
        if (!_this.bullet.hasKilled) {
          _this.bullet.hasKilled = true;
          bullet.destroy();
          zombie.die();
          _this.zombies.remove(zombie);
        }
      });
      this.soldierZombieCollider = this.physics.add.overlap(this.soldier, this.zombies, function (soldier, zombie) {
        console.log("Zombie killed soldier");
        _this.soldierDead = true;
        zombie.attacking = false;
        zombie.body.velocity.x = 0;
        zombie.anims.play("zombieAttack", true);
        zombie.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "zombieAttack", function () {
          zombie.anims.play("zombieIdle", true);
        });
        _this.soldier.anims.play("soldierDead", true);
        _this.soldierZombieCollider.destroy();
      });
      this.physics.add.collider(this.soldier, this.layer, function (soldier, tile) {
        _this.soldierLocation = [tile.x, tile.y];
        console.log(_this.soldierLocation);
      });
      this.cursors = this.input.keyboard.createCursorKeys();
      this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
      this.cameras.main.setBounds(0, 0, 1152, 648);
      this.cameras.main.setZoom(2);
      this.cameras.main.startFollow(this.soldier, true, 0.05, 0.05);
      this.createSoldierAnimations();
      this.createZombieAnimations();
      this.soldier.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "soldierAttack", function () {
        _this.soldier.anims.play("soldierIdle", true);
      });
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      if (this.soldier.y > game.config.height || this.soldier.y < 0 || this.soldierDeadTimer > settings.restartTime) {
        this.scene.start();
      }
      if (!this.soldierDead) {
        this.soldierController();
        this.checkSoldierLocation();
      } else {
        this.soldier.body.velocity.x *= 0.95;
        this.soldierDeadTimer += delta;
      }
    }
  }, {
    key: "soldierController",
    value: function soldierController() {
      if (this.cursors.left.isDown && this.shift.isDown && this.soldier.body.onFloor()) {
        if (this.soldier.body.velocity.x > -settings.soldierRunSpeed) {
          this.soldier.body.velocity.x -= 10;
        }
        this.soldier.anims.play("soldierRun", true);
      } else if (this.cursors.left.isDown && this.soldier.body.velocity.x >= -settings.soldierWalkSpeed) {
        this.soldier.body.velocity.x = -settings.soldierWalkSpeed;
        if (this.soldier.body.onFloor()) {
          this.soldier.anims.play("soldierWalk", true);
        }
      } else if (this.cursors.right.isDown && this.shift.isDown && this.soldier.body.onFloor()) {
        if (this.soldier.body.velocity.x < settings.soldierRunSpeed) {
          this.soldier.body.velocity.x += 10;
        }
        this.soldier.anims.play("soldierRun", true);
      } else if (this.cursors.right.isDown && this.soldier.body.velocity.x <= settings.soldierWalkSpeed) {
        this.soldier.body.velocity.x = settings.soldierWalkSpeed;
        this.soldier.anims.play("soldierWalk", true);
      } else if (this.soldier.body.onFloor()) {
        if (this.soldier.body.velocity.x < 0.1 && this.soldier.body.velocity.x > -0.1) {
          this.soldier.body.velocity.x = 0;
        } else {
          this.soldier.body.velocity.x *= 0.7;
        }
      }
      if (this.soldier.body.velocity.x == 0 && this.soldier.anims.getName() != "soldierAttack") {
        this.soldier.anims.play("soldierIdle", true);
      } else if (this.soldier.body.velocity.x < 0) {
        this.soldier.setScale(-1, 1);
        this.soldier.setOffset(settings.soldierOffsetXLeft, settings.soldierOffsetY);
        this.soldierDirection = -1;
      } else if (this.soldier.body.velocity.x > 0) {
        this.soldier.setScale(1, 1);
        this.soldier.setOffset(settings.soldierOffsetXRight, settings.soldierOffsetY);
        this.soldierDirection = 1;
      }
      if (this.cursors.up.isDown && this.soldier.body.onFloor()) {
        this.soldier.body.velocity.y = -settings.soldierRunSpeed;
      }
      if (this.soldier.body.velocity.y < 0) {
        this.soldier.anims.play("soldierJump", true);
      } else if (this.soldier.body.velocity.y > 0) {
        this.soldier.anims.play("soldierFall", true);
      }
      if (Phaser.Input.Keyboard.JustDown(this.cursors.down) && this.soldier.body.velocity.x == 0 && this.soldier.body.velocity.y == 0) {
        this.bullet = this.bullets.get();
        this.soldier.anims.play("soldierAttack", true);
        if (this.bullet) {
          this.bullet.fire(this.soldier, this.soldierDirection);
        }
      }
    }
  }, {
    key: "checkSoldierLocation",
    value: function checkSoldierLocation() {
      var string = "7,19 9,19 8,19";
      if (string.includes(this.soldierLocation.toString()) && !this.soldierDead) {
        this.zombie1.attack(this.soldier);
      }
    }
  }, {
    key: "createZombie",
    value: function createZombie(x, y) {
      var zombie = this.zombies.get(x, y);
      zombie.setSize(20, 64);
      zombie.setScale(1, 1);
      zombie.setOffset(settings.zombieOffsetXRight, settings.zombieOffsetY);
      zombie.body.gravity.y = settings.gravity;
      this.physics.add.collider(zombie, this.layer);
      return zombie;
    }
  }, {
    key: "createSoldierAnimations",
    value: function createSoldierAnimations() {
      this.anims.create({
        key: "soldierIdle",
        frames: this.anims.generateFrameNumbers("soldierIdleSheet", {
          start: 0,
          end: 8
        }),
        frameRate: 5,
        repeat: -1
      });
      this.anims.create({
        key: "soldierWalk",
        frames: this.anims.generateFrameNumbers("soldierWalkSheet", {
          start: 0,
          end: 7
        }),
        frameRate: 8,
        repeat: -1
      });
      this.anims.create({
        key: "soldierRun",
        frames: this.anims.generateFrameNumbers("soldierRunSheet", {
          start: 0,
          end: 7
        }),
        frameRate: 12,
        repeat: -1
      });
      this.anims.create({
        key: "soldierJump",
        frames: [{
          key: "soldierRunSheet",
          frame: 2
        }],
        frameRate: 10
      });
      this.anims.create({
        key: "soldierFall",
        frames: [{
          key: "soldierRunSheet",
          frame: 3
        }],
        frameRate: 10
      });
      this.anims.create({
        key: "soldierAttack",
        frames: this.anims.generateFrameNumbers("soldierAttackSheet", {
          start: 0,
          end: 3
        }),
        frameRate: 16
      });
      this.anims.create({
        key: "soldierDead",
        frames: this.anims.generateFrameNumbers("soldierDeadSheet", {
          start: 0,
          end: 3
        }),
        frameRate: 8
      });
    }
  }, {
    key: "createZombieAnimations",
    value: function createZombieAnimations() {
      this.anims.create({
        key: "zombieIdle",
        frames: this.anims.generateFrameNumbers("zombieIdleSheet", {
          start: 0,
          end: 4
        }),
        frameRate: 2,
        repeat: -1
      });
      this.anims.create({
        key: "zombieWalk",
        frames: this.anims.generateFrameNumbers("zombieWalkSheet", {
          start: 0,
          end: 6
        }),
        frameRate: 8,
        repeat: -1
      });
      this.anims.create({
        key: "zombieRun",
        frames: this.anims.generateFrameNumbers("zombieRunSheet", {
          start: 0,
          end: 6
        }),
        frameRate: 12,
        repeat: -1
      });
      this.anims.create({
        key: "zombieJump",
        frames: [{
          key: "zombieRunSheet",
          frame: 0
        }],
        frameRate: 10
      });
      this.anims.create({
        key: "zombieFall",
        frames: [{
          key: "zombieRunSheet",
          frame: 5
        }],
        frameRate: 10
      });
      this.anims.create({
        key: "zombieAttack",
        frames: this.anims.generateFrameNumbers("zombieAttackSheet", {
          start: 0,
          end: 3
        }),
        frameRate: 16
      });
      this.anims.create({
        key: "zombieDead",
        frames: this.anims.generateFrameNumbers("zombieDeadSheet", {
          start: 0,
          end: 4
        }),
        frameRate: 10
      });
    }
  }]);
  return Level1;
}(Phaser.Scene);
var Zombie = /*#__PURE__*/function (_Phaser$Physics$Arcad) {
  _inherits(Zombie, _Phaser$Physics$Arcad);
  var _super2 = _createSuper(Zombie);
  function Zombie(scene, x, y) {
    var _this2;
    _classCallCheck(this, Zombie);
    _this2 = _super2.call(this, scene, x, y, "zombieIdleSheet");
    _this2.direction = 1;
    _this2.dead = false;
    _this2.attacking = false;
    return _this2;
  }
  _createClass(Zombie, [{
    key: "attack",
    value: function attack(target) {
      this.target = target;
      this.targetX = target.body.position.x;
      this.attacking = true;
    }
  }, {
    key: "die",
    value: function die() {
      var _this3 = this;
      this.dead = true;
      this.body.velocity.x = 0;
      if (this.direction == 1) {
        this.setScale(-1, 1);
        this.setOffset(settings.zombieOffsetXLeft, settings.zombieOffsetY);
      } else {
        this.setScale(1, 1);
        this.setOffset(settings.zombieOffsetXRight, settings.zombieOffsetY);
      }
      this.anims.play("zombieDead", true);
      this.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "zombieDead", function () {
        _this3.setActive(0);
      });
    }
  }, {
    key: "update",
    value: function update() {
      if (this.attacking && !this.dead) {
        if (Phaser.Math.Difference(this.targetX, this.body.position.x) < 1) {
          this.body.velocity.x = 0;
        } else if (this.targetX < this.body.position.x) {
          this.body.velocity.x = -settings.zombieWalkSpeed;
        } else if (this.targetX > this.body.position.x) {
          this.body.velocity.x = settings.zombieWalkSpeed;
        }
        if ((this.body.blocked.left || this.body.blocked.right) && this.body.velocity.y == 0) {
          this.body.velocity.y = -settings.zombieWalkSpeed * 3;
        }
      }
      if (this.body.velocity.y < 0) {
        this.anims.play("zombieJump", true);
      } else if (this.body.velocity.y > 0) {
        this.anims.play("zombieFall", true);
      }
      if (this.body.velocity.x == 0 && this.anims.getName() != "zombieAttack" && !this.dead) {
        this.anims.play("zombieIdle", true);
      } else if (this.body.velocity.x < 0 && this.body.velocity.y == 0) {
        this.anims.play("zombieWalk", true);
        this.direction = -1;
        this.setScale(-1, 1);
        this.setOffset(settings.zombieOffsetXLeft, settings.zombieOffsetY);
        this.zombieDirection = -1;
      } else if (this.body.velocity.x > 0 && this.body.velocity.y == 0) {
        this.anims.play("zombieWalk", true);
        this.direction = 1;
        this.setScale(1, 1);
        this.setOffset(settings.zombieOffsetXRight, settings.zombieOffsetY);
        this.zombieDirection = 1;
      }
      if (this.body.onFloor()) {
        if (this.body.velocity.x < 0.1 && this.body.velocity.x > -0.1) {
          this.body.velocity.x = 0;
        } else {
          this.body.velocity.x *= 0.7;
        }
      }
    }
  }]);
  return Zombie;
}(Phaser.Physics.Arcade.Sprite);
var Bullet = /*#__PURE__*/function (_Phaser$Physics$Arcad2) {
  _inherits(Bullet, _Phaser$Physics$Arcad2);
  var _super3 = _createSuper(Bullet);
  function Bullet(scene) {
    var _this4;
    _classCallCheck(this, Bullet);
    _this4 = _super3.call(this, scene, 0, 0, "bullet");
    _this4.hasKilled = false;
    return _this4;
  }
  _createClass(Bullet, [{
    key: "fire",
    value: function fire(shooter, direction) {
      if (direction == 1) {
        this.setPosition(shooter.x + 33, shooter.y + 19);
        this.speed = settings.bulletSpeed;
      } else if (direction == -1) {
        this.setPosition(shooter.x - 33, shooter.y + 19);
        this.speed = -settings.bulletSpeed;
      }
      this.lifespan = 1000;
    }
  }, {
    key: "preUpdate",
    value: function preUpdate(time, delta) {
      _get(_getPrototypeOf(Bullet.prototype), "preUpdate", this).call(this, time, delta);
      this.lifespan -= delta;
      this.x += this.speed * delta;
      if (this.lifespan <= 0) {
        this.destroy();
      }
    }
  }]);
  return Bullet;
}(Phaser.Physics.Arcade.Sprite);
},{"./assets/Background/Night/1.png":"assets/Background/Night/1.png","./assets/Background/Night/2.png":"assets/Background/Night/2.png","./assets/Tiles/Tileset.png":"assets/Tiles/Tileset.png","./assets/TileStuff/map1.json":"assets/TileStuff/map1.json","./assets/Soldier/Bullet.png":"assets/Soldier/Bullet.png","./assets/Soldier/Idle.png":"assets/Soldier/Idle.png","./assets/Soldier/Walk.png":"assets/Soldier/Walk.png","./assets/Soldier/Run.png":"assets/Soldier/Run.png","./assets/Soldier/Shot1.png":"assets/Soldier/Shot1.png","./assets/Soldier/Dead.png":"assets/Soldier/Dead.png","./assets/ZombieWoman/Idle.png":"assets/ZombieWoman/Idle.png","./assets/ZombieWoman/Walk.png":"assets/ZombieWoman/Walk.png","./assets/ZombieWoman/Run.png":"assets/ZombieWoman/Run.png","./assets/ZombieWoman/Attack2.png":"assets/ZombieWoman/Attack2.png","./assets/ZombieWoman/Dead.png":"assets/ZombieWoman/Dead.png"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62774" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","platformer.js"], null)
//# sourceMappingURL=/platformer.e36f062b.js.map