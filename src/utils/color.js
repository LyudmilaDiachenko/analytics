export function getColor(item_count_in_group = 20, current_index_in_group = Math.round(Math.random()*20)){
    let 
        h = Math.round(255 / item_count_in_group * (current_index_in_group-2)),
        s = Math.round(70 + Math.random() * 30),
        l = Math.round(45 + Math.random() * 30)
    return [`hsl(${h} ${s}% ${l}%)`, `hsl(${h} ${Math.round(s*0.9)}% ${Math.round(l*1.1)}% / 40%)`]
}