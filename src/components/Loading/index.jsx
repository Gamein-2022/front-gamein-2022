
import "./style.scss";
function Loading() {

  return (
    <div id='loader'>
    <svg class="svg_up">
    <clipPath id="logo_up" clipPathUnits="objectBoundingBox"><path d="
      m0.349,0.875 L0.014,0.169 C-0.018,0.103,0.008,0,0.057,0 h0.886 c0.049,0,0.075,0.103,0.043,0.169 l-0.335,0.706 c-0.079,0.167,-0.222,0.167,-0.302,0
            "></path></clipPath>  
    </svg>

  <svg class="svg_down">
    <clipPath id="logo_down" clipPathUnits="objectBoundingBox"><path d="
      m0.349,0.125 L0.014,0.831 c-0.032,0.067,-0.005,0.169,0.043,0.169 h0.886 c0.049,0,0.075,-0.103,0.043,-0.169 L0.651,0.125 c-0.079,-0.167,-0.222,-0.167,-0.302,0
                  "></path></clipPath>
  </svg>
<div id="gamein_container">        
      <div id="top"></div>
<div id="bottom"></div>

</div>
<div id="line_container">
  <div id="line"></div>

</div>
</div>
  );
}

export default Loading;