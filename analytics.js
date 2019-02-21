const base64Img = require('base64-img');
const {
    createCanvas,
    loadImage
} = require('canvas')



const males = [
    "jaeger",
    "verge",
    "cobalt",
    "tech_ops",
    "cabbie",
    "malcore",
    "paradox",
    "krampus",
    "fishstick",
    "grimbles",
    "tender_defender",
    "black_knight",
    "ragnarok",
    "omega",
    "drift",
    "raven",
    "wild_card",
    "galaxy",
    "skull_trooper",
    "the_reaper",
    "overtaker",
    "battle_hound",
    "raptor",
    "omen",
    "beef_boss",
    "archetype",
    "sushi_master",
    "nite_nite",
    "love_ranger",
    "dark_voyager",
    "merry_marauder",
    "musha",
    "enforcer",
    "rex",
    "magnus",
    "wukong",
    "sky_stalker",
    "cloaked_star",
    "bandolier",
    "to_be_determined",
    "abstrakt",
    "leviathan",
    "jumpshot",
    "tomatohead",
    "venturion",
    "burnout",
    "crackshot",
    "noir",
    "the_visitor",
    "garrison",
    "chomp_sr.",
    "carbide",
    "brite_gunner",
    "funk_ops",
    "toxic_trooper",
    "vertex",
    "wingman",
    "midfield_maestro",
    "rogue_agent",
    "maverick",
    "squad_leader",
    "alpine_ace_(can)",
    "sledgehammer",
    "moisty_merman",
    "havoc",
    "rabbit_raider",
    "grill_sergeant",
    "hacivat",
    "liteshow",
    "rust_lord",
    "triage_trooper",
    "wreck_raider",
    "royale_bomber",
    "blue_squire",
    "sleuth",
    "super_striker",
    "alpine_ace_(fra)",
    "alpine_ace_(usa)",
    "blue_striker",
    "moniker",
    "battlehawk",
    "alpine_ace_(ger)",
    "mullet_marauder",
    "circuit_breaker",
    "alpine_ace_(gbr)",
    "armadillo",
    "stage_slayer",
    "yuletide_ranger",
    "warpaint",
    "diecast",
    "scoundrel",
    "alpine_ace",
    "flytrap",
    "far_out_man",
    "alpine_ace_(chn)",
    "alpine_ace_(kor)",
    "stalwart_sweeper",
    "codename_e.l.f.",
    "sun_tan_specialist",
    "sash_sergeant",
    "star-spangled_trooper",
    "absolute_zero",
    "hyperion",
    "backbone",
    "aerial_threat",
    "first_strike_specialist",
    "special_forces",
    "masked_fury",
    "midnight_ops",
    "desperado",
    "recruit_1", "radiant_striker",
    "aerial_assault_trooper",
    "sub_commander",
    "crimson_scout",
    "mission_specialist",
    "recon_scout",
    "recruit_6",
    "trooper",
    "recruit_8",
    "recruit_7",
    "infiltrator",
    "devastator",
    "ranger",
    "scout",
    "tracker",
    "highrise_assault_trooper",
    "dire",
    "dj_yonder",
    "giddy-up",
    "ludwig",
    "hay_man",
    "maximilian",
    "double_helix",
    "plague",
    "jack_gourdon",
    "hollowhead",
    "spider_knight",
    "guan_yu",
    "reflex",
    "ruckus",
    "shogun",
    "growler",
    "deadfire",
    "summit_striker",
    "sanctum",
    "dante",
    "frostbite",
    "brainiac",
    "patch_patroller",
    "a.i.m.",
    "end_zone",
    "gridiron",
    "spike",
    "strong_guard",
    "striped_soldier",
    "castor",
    "taro",
    "riot",
    "mothmando",
    "longshot",
    "cloudbreaker",
    "trog",
    "sgt._winter",
    "zenith",
    "the_ice_king",
    "frozen_love_ranger",
    "frozen_raven",
    "cloaked_shadow",
    "slushy_soldier",
    "prodigy",
    "red-nosed_ranger"
]

const fs = require("file-system");

class Analytics {
    constructor() {
        this.WIDTH = 1920;
        this.HEIGHT = 1080;
        this.left = 260;
        this.top = 100;
        this.graphHeight = 800;
        this.graphWidth = 1400;
        this.canvas = createCanvas(this.WIDTH, this.HEIGHT);
        this.ctx = this.canvas.getContext("2d");

        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, 1920, 1080); // Clear
        /* this.title = */


    }

    preRender(type) {
        this.ctx.fillStyle = "black";
        for (var i = 0; i < this.graphWidth + 1; i++) {
            if (i % 100 == 0 && type != "bar") this.ctx.fillRect(i + this.left, this.top, 1, this.graphHeight);
            if (i % 100 == 0 && i < this.graphHeight) this.ctx.fillRect(this.left, i + this.top, this.graphWidth, 1);
        }

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.left, this.top, 5, this.graphHeight);
        this.ctx.fillRect(this.left, this.graphHeight + this.top, this.graphWidth, 5);
    }

    render() {
        this.ctx.fillStyle = "black"
        this.ctx.font = "50px Roboto";
        this.ctx.fillText(this.title, this.left, this.HEIGHT - 50);
        this.ctx.font = "40px Roboto";
        this.ctx.fillText(this.xName, this.WIDTH / 2 - this.ctx.measureText(this.xName).width / 2, this.HEIGHT - 100);

        this.ctx.save();
        this.ctx.translate(-300, 725);
        this.ctx.rotate(-.5 * Math.PI);
        this.ctx.fillText(this.yName, this.left - 100, this.HEIGHT / 2 - this.ctx.measureText(this.yName).width / 2)
        this.ctx.restore();

        this.ctx.font = "20px Roboto";
        for (var i = 0; i < this.graphWidth + 1; i++) {
            if (i % 200 == 0) {
                //var x = (point.x - this.lowestX) * this.xScale;
                var text = Math.round(((i / this.xScale) + this.lowestX) / 1000) * 1000;
                if (this.type !== "bar") this.ctx.fillText(text, i + this.left - this.ctx.measureText(text).width / 2, this.graphHeight + this.top + 30);

                text = Math.round((((this.graphHeight - i) / this.yScale) + this.lowestY) * 10) / 10;
                this.ctx.fillText(text, this.left - 50, i + this.top + 10);
            }
        }

        function coordinatesToIndex(x, y) {
            return x + (this.WIDTH * y);
        }

        function indexToCoordinates(index) {
            let x = index % this.WIDTH;
            let y = (index - x) / this.WIDTH;
            return {
                x: x,
                y: y
            };
        }

        loadImage("analytics.livfor.it.png").then(image => {
            this.ctx.drawImage(image, this.WIDTH - 280, this.HEIGHT - 220, 300, 300);
            base64Img.imgSync(this.canvas.toDataURL(), "", this.title, (err, filepath) => {})
        })

        console.log("Exported")
    }

    dotPlot(title, data, xName, yName) {
        this.title = title;
        this.preRender();
        if (xName == undefined) xName = "";
        if (yName == undefined) yName = "";
        this.xName = xName;
        this.yName = yName

        this.highestX
        this.highestY
        this.lowestX
        this.lowestY;

        for (var point of data) {
            if (point.x > this.highestX || this.highestX === undefined) this.highestX = point.x;
            if (point.y > this.highestY || this.highestY === undefined) this.highestY = point.y;
            if (point.x < this.lowestX || this.lowestX === undefined) this.lowestX = point.x;
            if (point.y < this.lowestY || this.lowestY === undefined) this.lowestY = point.y;
        }

        this.xRange = this.highestX - this.lowestX;
        this.yRange = this.highestY - this.lowestY;

        this.xScale = this.graphWidth / this.xRange;
        this.yScale = this.graphHeight / this.yRange;


        for (point of data) {
            var x = (point.x - this.lowestX) * this.xScale;
            var y = (point.y - this.lowestY) * this.yScale;
            /* x = -x;
            x += this.graphWidth */
            y = -y;
            y += this.graphHeight;
            this.ctx.fillStyle = point.color;
            this.ctx.beginPath();
            this.ctx.arc(x + this.left, y + this.top, 10, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fill();

            //console.log(x, y, point.color)
        }

        this.render();
    }

    /**
     * 
     * @param {*} name Name of the graph
     * @param {*} data Array of bars. ex {data: int, color: string, title: string}
     * @param {*} yName Name of the Y-axis
     * @param {*} options
     */
    barGraph(title, data, yName, options) {
        this.title = title;
        this.type = "bar";
        this.yName = yName;
        this.xName = "";
        this.preRender(this.type);
        var width = 300;

        var min, max, range;
        for (var value of data) {
            if (value.data < min || min === undefined) min = value.data;
            if (value.data > max || max === undefined) max = value.data;
        }

        if (options.max !== undefined) max = options.max;
        if (options.min !== undefined) min = options.min;
        if (options.width !== undefined) width = options.width;
        this.highestY = max;
        this.lowestY = min;
        range = max - min;
        this.yRange = range;
        this.yScale = this.graphHeight / range;

        var padding = this.graphWidth;
        padding -= data.length * width; // Remove bar widths from padding
        padding /= data.length + 1; // Chop up the padding for each data, to center and position them along X-Axis

        var left = 0;
        for (var value of data) {
            left += padding;
            this.ctx.fillStyle = value.color;
            this.ctx.fillRect(left + this.left, this.graphHeight + this.top, width, -value.data * this.yScale);

            this.ctx.save();
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = "black";

            this.ctx.font = "40px Roboto";
            this.ctx.fillText(value.title, left + this.left + width/2, this.graphHeight + this.top + 50)

            this.ctx.restore();

            left += width;
        }

        this.render();
    }
}


// Testing
var skins = JSON.parse(fs.readFileSync("skins.txt"))
var rarityColors = ["legendary", "#aa5228", "epic", "#6b41a8", "rare", "#007dbc", "uncommon", "#488c2c", "common", "#9d9d9d", "unknown", "#303030"]
var data = [];

skins.sort((a, b) => {
    return a.rating - b.rating;
})

skins.sort((a, b) => {
    return rarityColors.indexOf(a.rarity) - rarityColors.indexOf(b.rarity);
})



for (skin of skins) {

    if (skin.type == "outfit") {
        var color = "#1e7cff";
        if(males.indexOf(skin.code.toLowerCase()) == -1){
            color = "#ff4f83";
        }
        data.push({
            color: color,
            x: skin.votes,
            y: skin.rating
        })
    }
}


var analytics = new Analytics()
analytics.dotPlot("Karaktärer (Kön)", data, "Mängd röster", "Poäng");

var total_male = 0,
    total_female = 0,
    avg_male_rating, avg_female_rating,
    total_female_score = 0,
    total_male_score = 0;

for (skin of skins) {
    if (skin.type == "outfit") {
        if (males.indexOf(skin.code.toLowerCase()) != -1) {
            // Male skin
            total_male++;
            total_male_score += skin.rating;
        } else {
            total_female++;
            total_female_score += skin.rating;
        }
    }
}

avg_male_rating = total_male_score / total_male;
avg_female_rating = total_female_score / total_female;

/* analytics.barGraph("Genomsnittlig poäng per kön", [{
    title: "Kvinnor (" + Math.round(avg_female_rating*100)/100 + ")",
    color: "#ff4f83",
    data: avg_female_rating
},{
    title: "Män (" + Math.round(avg_male_rating*100)/100 + ")",
    color: "#1e7cff",
    data: avg_male_rating
}], "Rating", {
    max: 5,
    min: 0
})
 */
//console.log("Avg male: " + avg_male_rating + " Avg female: " + avg_female_rating)