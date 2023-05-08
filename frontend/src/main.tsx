// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import '@css/index.css'
//
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

window.global ||= window;


type State = {
  name:string,
  count:number
}

let state :State ={
  name:"Doggr~",
  count:0
}

global.changeName=()=>{
  state.name = "Catte";
  console.log("change name")
  render(state);
}

global.changeCount=()=>{
  state.count += 1;
  render(state)
}

function renderApp(state){
  return `<div>
<p onclick="changeName()">HI from ${state.name}</p>
<p onclick="changeCount()" > You have clicked ${state.count} times. </p>
</div>`;

}

function render(state) {
  
  let html = renderApp(state);
  console.log("rendering")
  
  document.body.innerHTML = html;
}
render(state);
