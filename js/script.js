import "./byeie"; // loučíme se s IE
import { h, render } from "preact";
/** @jsx h */

let host = 'https://data.irozhlas.cz/anketa-covid';
if (window.location.hostname === 'localhost') {
  host = 'http://localhost/anketa-covid'
}

function printResps(obj) {
  if (obj.odp_1 === null) { obj.odp_1 = '<i>Bez odpovědi.</i>'}
  if (obj.odp_2 === null) { obj.odp_2 = '<i>Bez odpovědi.</i>'}
  if (obj.odp_3 === null) { obj.odp_3 = '<i>Bez odpovědi.</i>'}
  return `<p><b>1.</b> ${obj.odp_1}</p><p><b>2.</b> ${obj.odp_2}</p><p><b>3.</b> ${obj.odp_3}</p>`
}

function onLoad(e) {
  const data = JSON.parse(e.target.response)
  render((
    <div id="anketa">
      {data.map(el => (
        <div className="respondent">
          <img className="portret" src={host + "/foto/" + el.foto} alt={el.jmeno} />
          <div className="bio">
            <div className="jmeno">{`${el.jmeno}`}</div>
            <div className="vek">{el.profese}</div>
          </div>
          <div className="odpoved" dangerouslySetInnerHTML={{ __html: printResps(el) }}></div>
        </div>
      ))}
    </div>
  ), document.getElementById("anketa-wrapper"))
}

const r = new XMLHttpRequest()
r.addEventListener("load", onLoad)
r.open("GET", host + "/data/data.json")
r.send()