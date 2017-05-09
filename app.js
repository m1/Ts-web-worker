const worker  = new Worker('worker.js');
const content = document.getElementById("content");

worker.addEventListener('message', (event) => {
  content.innerHTML = event.data.msg;
}, false);

function search() {
  const val = document.getElementById('number').value;

  if (val !== "") {
    content.innerHTML = "LOADING";
    worker.postMessage({'cmd': 'nextDigit', 'number': val});
  }
}