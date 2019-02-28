var hex_ox=0, hex_oy=0, hex_cur=null, hexcur_lastupdate=0, hexcur_timeout=null, hexes=[], hexpos=[], mousex=0, mousey=0;
window.onload = function() {
    var nodes = document.getElementById("hexes").childNodes;
    hexes = [];
    for (var i=0; i<nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() !== "div" || !nodes[i].className.match(/\bhex\b/)) continue;
        hexes.push(nodes[i]);
    }

    document.getElementById("hexmap_area_lt").onmouseover = function(e){ hex_offset( 1, 1); };
    document.getElementById("hexmap_area_rt").onmouseover = function(e){ hex_offset(-1, 1); };
    document.getElementById("hexmap_area_lb").onmouseover = function(e){ hex_offset( 1, -1); };
    document.getElementById("hexmap_area_rb").onmouseover = function(e){ hex_offset(-1, -1); };
    document.getElementById("hexmap_area_md").onmouseover = function(e){ hex_offset( 0, 0); };

    hexpos_update();
};
function hexpos_update() {
    for (var i=hexes.length-1; i>=0; i--) {
        hexpos[i] = findpos(hexes[i]);
    }
}
document.onmousemove = function(e) {
    if (e) {
        mousex = e.pageX;
        mousey = e.pageY;
    } else {
        try {
            mousex = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            mousey = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        } catch(e) { return; } /* really, ie8? */
    }
    hexcur_update();
};
function hex_offset(ox, oy) {
    hex_ox = ox;
    hex_oy = oy;
}
function hexcur_update() {
    var now = (new Date()).getTime();
    if (hexcur_lastupdate > now - 16) {
        if (hexcur_timeout === null) hexcur_timeout = setTimeout(hexcur_update, hexcur_lastupdate + 16);
        return;
    }
    if (hexcur_timeout !== null) clearTimeout(hexcur_timeout);
    hexcur_lastupdate = now;

    var found = false;
    var hovering = false;
    hex_cur = null;
    hexpos_update();
    for (var i=hexes.length-1; i>=0; i--) {
        var hex = hexes[i];
        var pos = hexpos[i];
        var exp_ox = mousex >= pos.x+100 ? 1 : -1;
        var exp_oy = mousey >= pos.y+87 ? 1 : -1;
        if (!found && pos.x < mousex && pos.x+200 > mousex && pos.y < mousey && pos.y+174 > mousey && (!hex_ox || hex_ox == exp_ox) && (!hex_oy || hex_oy == exp_oy)) {
            found = true;
            hex_cur = hex;
            if (!hex.className.match(/\bhex_menu\b/)) continue;
            hex.className = hex.className.replace(/ hex_hover\b/, "") + " hex_hover";
            hovering = true;
        } else {
            hex.className = hex.className.replace(/ hex_hover\b/, "");
        }
    }
    document.body.style.cursor = hovering ? "pointer" : "default";
    document.getElementById("hexmap_area_lt").style.cursor = hovering ? "pointer" : "default";
    document.getElementById("hexmap_area_rt").style.cursor = hovering ? "pointer" : "default";
    document.getElementById("hexmap_area_lb").style.cursor = hovering ? "pointer" : "default";
    document.getElementById("hexmap_area_rb").style.cursor = hovering ? "pointer" : "default";
    document.getElementById("hexmap_area_md").style.cursor = hovering ? "pointer" : "default";
}
document.onclick = function(e) {
    if (!hex_cur) return;
    if (hex_cur.className.match(/\bhex_menu\b/)) {
        var links = hex_cur.getElementsByTagName("a");
        if (links.length) {
            if (e) {
                e.preventDefault();
            } else {
                event.returnValue = false;
            }
            location.href = links[0].href;
        }
    }
};
function findpos(obj) {
    var x=0, y=0;
    do {
        x += obj.offsetLeft;
        y += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return {x:x,y:y};
}
