import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@css/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)



// //vite way to using global var
// window.global ||= window;
//
// type State = {
//   name:string,
//   count:number
// }
//
// //initial
// let state :State ={
//   name:"Doggr~",
//   count:0
// }
//
//
// // global.changeName=()=>{
// //   state.name = "Catte";
// //   console.log("change name")
// //   render(state);
// // }
// // //impure way
// // global.changeCount=()=>{
// //   state.count += 1;
// //   render(state)
// // }
//
// //New pure way
// let eventHandlers={
//     increaseCount:(oldState)=>{
//         console.log("Increasing count")
//         //create a new obj and not mutating the old obj(oldState)
//         return{...oldState, count:oldState.count+1}//pure way
//     },
//     decreaseCount:(oldState)=>{
//         console.log("Decreasing count")
//         return{...oldState, count:oldState.count-1}//pure way
//     },
//     changeName:(oldState)=>{
//         console.log("change name");
//         return {...oldState,name:"Catte"};
//     }
// }
//
// global.emitEvent=(eventName)=>{
//     let eventHandler = eventHandlers[eventName];
//     if(eventHandler){
//         state = eventHandler(state);
//     }
//     render(state);
// }
//
// function renderApp(state){
//   return `<div>
// <p onclick=emitEven("changeName")> HI from ${state.name}</p>
// <p onclick=emitEvent("changeCount") > You have clicked ${state.count} times. </p>
// </div>`;
//
// }
//
// function render(state) {
//
//   let html = renderApp(state);
//   console.log("rendering")
//
//   document.body.innerHTML = html;
// }
//
//
// render(state);
