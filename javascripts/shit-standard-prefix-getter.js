// PREREQUISITES: break_eternity.js
// USAGE: ss(illion: Decimal)
function ss(illion, c = false) {
  const r = [
    "k m b t qa q sa s o n", " u d t qa q sa s o n", " de ve te qe qf se sf oe ne", " cn dn tn qn qo sn so on nn",
    " mi mm ni pi fi ai zi yi ri qi mc dc tc td pc hc hd oc ec is mis dis tis trs pis his hps ois eis", " mc dc tc td pc hc hd oc ec", " qi is tt tr pt ht hr ot et", " hl dh th tl ph hh he ol el",
    " kq mq gq tq pq eq zq yq rq qq hk tk td pk ek zk yk nk ik ike ikd ikt itr ikp iex ikz iky ikr", " e d t tr p ex z y r", " dk ik to td po eo zo yo no", " hu bu tu tv pu eu zu yu nu",
    " kj mj gj aj lj fj jj sj bj gp gm sp vj mp pj gg kp oj pp hj", " gp gm bp gb ab lb fb jb sb bb", " hb mb gub aub lub fub jub sub bub",
    " hz oz nz dz uz ez fz sz bz", " gz ay hy ky py sy px ny zy", " aw bw gw dw tw iw kw lw sw",
    " hÞ dÞ tÞ tß aÞ sÞ sß cÞ nÞ eÞ að hð lð oð pð cð wð að gð oð tø sø lø jø gø iø xø wø mø hø", " eÞ oð hø uæ væ sæ tæ hæ næ aæ tœ iœ uœ qœ tſ bœ tƹ nœ zœ", " aæ nſ bſ kſ gſ pſ vſ uſ lſ",
    " rƹ zƹ dƹ vƹ fƹ"
  ].map(a => a.split(" "));
  function rnd(d, m = false, n = illion) {
    return n.div(new Decimal("10").pow(d)).floor().mod(m ? "1e3" : "10").toNumber();
  }
  let nm = illion.toNumber();
  let td = Decimal.fromNumber;
  function getT6(t6) {
    if (t6.lt("30")) {
      return r[18][t6.toNumber()];
    } else if (t6.lt("200")) {
      return `${r[19][t6.div("10").floor()]}${r[18][rnd("0", 0, t6)]}`
    } else if (t6.lt("1e3")) {
      return `${r[20][rnd("2", 0, t6)]}${getT6(t6.mod("100"))}`
    } else {
      const s6 = [];
      let l6 = t6.log10().div("3").floor(), tier7ill = l6;
      for (let i6 = 0; i6 < (l6.gte("1e9") ? 1 : l6.gte("1e3") ? 2 : l6.gte("100") ? 6 : l6.add("1").toNumber()); i6++) {
        let j6 = tier7ill.mul("3");
        let pref6 = r[21][tier7ill.toNumber()];
        if (tier7ill.gte("1")) {
          if (rnd(j6, 1, t6) != 0) {
            s6.push(`${getT6(td(rnd(j6, 1, t6) == 1 ? 0 : rnd(j6, 1, t6)))}${pref6}`);
          }
        } else {
          let st5 = getT6(td(rnd("0", 1, t6)));
          if (st5 !== "") {
            s6.push(st5);
          }
        };
        tier7ill = tier7ill.sub("1");
      };
      return s6.join("§");
    }
  }
  function getT5(t5) {
    if (t5.lt("1e3")) {
      return `${r[17][rnd("2", 0, t5)]}${r[16][rnd("1", 0, t5)]}${r[15][rnd("0", 0, t5)]}`;
    } else {
      const s5 = [];
      let l5 = t5.log10().div("3").floor(), tier6ill = l5;
      if (l6.gte("1e9")) return getT6(l5);
      for (let i5 = 0; i5 < (l5.gte("1e9") ? 1 : l5.gte("1e3") ? 2 : l5.gte("100") ? 6 : l5.add("1").toNumber()); i5++) {
        let j5 = tier6ill.mul("3");
        let pref5 = getT6(tier6ill);
        if (tier6ill.gte("1")) {
          if (rnd(j5, 1, t5) != 0) {
            s5.push(`${getT5(td(rnd(j5, 1, t5) == 1 ? 0 : rnd(j5, 1, t5)))}${pref5}`);
          }
        } else {
          let st4 = getT5(td(rnd("0", 1, t5)));
          if (st4 !== "") {
            s5.push(st4);
          }
        };
        tier6ill = tier6ill.sub("1");
      };
      return s5.join("€");
    }
  }
  function getT4(t4) {
    if (t4.lt("20")) {
      return r[12][t4.toNumber()];
    } else if (t4.lt("1e3")) {
      return `${r[14][rnd("2", 0, t4)]}${t4.mod("100").lt("20") && t4.mod("100").gt("10") ? r[12][t4.mod("100").toNumber()] : `${r[13][rnd("1", 0, t4)]}${r[12][rnd("0", 0, t4)]}`}`;
    } else {
      const s4 = [];
      let l4 = t4.log10().div("3").floor(), tier5ill = l4;
      if (l4.gte("1e9")) return getT5(l4);
      for (let i4 = 0; i4 < (l4.gte("1e9") ? 1 : l4.gte("1e3") ? 2 : l4.gte("100") ? 6 : l4.add("1").toNumber()); i4++) {
        let j4 = tier5ill.mul("3");
        let pref4 = getT5(tier5ill);
        if (tier5ill.gte("1")) {
          if (rnd(j4, 1, t4) != 0) {
            s4.push(`${getT4(td(rnd(j4, 1, t4) == 1 ? 0 : rnd(j4, 1, t4)))}${pref4}`);
          }
        } else {
          let st3 = getT4(td(rnd("0", 1, t4)));
          if (st3 !== "") {
            s4.push(st3);
          }
        };
        tier5ill = tier5ill.sub("1");
      };
      return s4.join("!");
    }
  }
  function getT3(t3) {
    if (t3.lt("30")) {
      return r[8][t3.toNumber()];
    } else if (t3.lt("1e3")) {
      return `${r[11][rnd("2", 0, t3)]}${t3.mod("100").lt("30") && t3.mod("100").gt("10") ? r[8][t3.mod("100").toNumber()] : `${r[10][rnd("1", 0, t3)]}${r[9][rnd("0", 0, t3)]}`}`;
    } else {
      const s3 = [];
      let l3 = t3.log10().div("3").floor(), tier4ill = l3;
      if (l3.gte("1e9")) return getT4(l3);
      for (let i3 = 0; i3 < (l3.gte("1e9") ? 1 : l3.gte("1e3") ? 2 : l3.gte("100") ? 6 : l3.add("1").toNumber()); i3++) {
        let j3 = tier4ill.mul("3");
        let pref3 = getT4(tier4ill);
        if (tier4ill.gte("1")) {
          if (rnd(j3, 1, t3) != 0) {
            s3.push(`${getT3(td(rnd(j3, 1, t3) == 1 ? 0 : rnd(j3, 1, t3)))}${pref3}`);
          }
        } else {
          let st2 = getT3(td(rnd("0", 1, t3)));
          if (st2 !== "") {
            s3.push(st2);
          }
        };
        tier4ill = tier4ill.sub("1");
      };
      return s3.join("?");
    }
  }
  function getT2(t2, d = false) {
    if (d ? false : t2.lt("30")) {
      return r[4][t2.toNumber()];
    } else if (t2.lt("1e3")) {
      return `${t2.mod("100").lt("30") && t2.mod("100").gt("10") ? r[4][t2.mod("100").toNumber()] : `${r[5][rnd(0, 0, t2)]}${r[6][rnd(1, 0, t2)]}`}${r[7][rnd(2, 0, t2)]}`;
    } else {
      const s2 = [];
      let l2 = t2.log10().div("3").floor(), tier3ill = l2;
      if (l2.gte("1e9")) return getT3(l2);
      for (let i2 = 0; i2 < (l2.gte("1e9") ? 1 : l2.gte("1e3") ? 2 : l2.gte("100") ? 6 : l2.add("1").toNumber()); i2++) {
        let j2 = tier3ill.mul("3");
        let pref2 = getT3(tier3ill);
        if (tier3ill.gte("1")) {
          if (rnd(j2, 1, t2) != 0) {
            s2.push(`${getT2(td(rnd(j2, 1, t2) == 1 ? 0 : rnd(j2, 1, t2)))}${pref2}`);
          }
        } else {
          let st = getT2(td(rnd("0", 1, t2)), 1);
          if (st !== "") {
            s2.push(st);
          }
        };
        tier3ill = tier3ill.sub("1");
      };
      return s2.join("&");
    }
  }
  if (illion.lt("10")) {
    return r[c ? 1 : 0][nm];
  } else if (illion.lt("1e3")) {
    return `${r[1][rnd("0")]}${r[2][rnd("1")]}${r[3][rnd("2")]}`;
  } else {
    const s = [];
    let l = illion.log10().div("3").floor(), tier2ill = l;
    // idfk how this fixes the problem of the prefix being just blank
    if (l.gte("1e9")) return getT2(l);
    for (let i = 0; i < (l.gte("1e9") ? 1 : l.gte("1e3") ? 2 : l.gte("100") ? 6 : l.add("1").toNumber()); i++) {
      let j = tier2ill.mul("3");
      let pref = getT2(tier2ill);
      if (tier2ill.gte("1")) {
        if (rnd(j, 1) != 0) {
          s.push(`${ss(td(rnd(j, 1) == 1 ? 0 : rnd(j, 1)), 1)}${pref}`);
        }
      } else {
        let st = ss(td(rnd("0", 1)), 1);
        if (st !== "") {
          s.push(st);
        }
      };
      tier2ill = tier2ill.sub("1");
    };
    return s.join("-");
  }
}
